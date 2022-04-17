import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { loadSecure } from '../utils/secureStore';
import { getRequestHeaders } from '../utils/api';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import ProfileButton from '../components/ProfileButton';
import ProfileIcon from '../components/Profile';
import { useIsFocused } from '@react-navigation/native';

import Listing from '../components/Listing';

// Screen
export default function ProfileScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)
  
  const [userName, setUserName] = useState({});
  const [activeReservations, setActiveReservations] = useState([])
  const [reservationHistory, setReservationHistory] = useState([])

  const isFocused = useIsFocused();

  const [profilePicURL, setProfilePicURL] = useState({})
  
  const cancelReservationDialog = (reservation) => {
    return (
      Alert.alert('Cancel reservation', `Are you sure you want to cancel your reservation for ${reservation.room_name}?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => cancelReservation(reservation._id) },
      ])
    )
  };

  // Fetch user credentials
  const getCredentials = async () => {
    const userIdParam = (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();
    try {
      const response = await fetch(`https://mtaa-backend.herokuapp.com/users/${userIdParam}`, {
        method: 'GET',
        headers:requestHeaders
      });

      const user = await response.json();
      setUserName({
        username: user.credentials.username, 
        first: user.name.first_name,
        last: user.name.last_name
      });
      
      let picURL = user.profile_pic ? { uri: user.profile_pic } : require('../assets/images/Avatar.png');
      setProfilePicURL({ pic: picURL });
      
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      //setLoading(false);
    }
  };

  // Fetch rooms displayed under "Your active reservations"
  const getRooms = async (reservations) => {
    const requestHeaders = await getRequestHeaders();
    try {
      //setLoading(true)
      let roomsIDs = reservations.map((res) => res.room_id);
      roomsIDs = roomsIDs.map((id) => `id[]=${id}`);
      const query = roomsIDs.join('&');

      const response = await fetch(`https://mtaa-backend.herokuapp.com/rooms?${query}`, {
        method: 'GET',
        headers: requestHeaders
      });
      
      let tmpRes = reservations.map(res => { 
        const tmp = {};
        const reserved_from = new Date(res.reserved_from);
        const reserved_to = new Date(res.reserved_to);
        tmp._id = res._id;
        tmp.room_id = res.room_id;
        tmp.date = reserved_from.toLocaleDateString();
        tmp.from = reserved_from.toLocaleTimeString([], { timeStyle: 'short' });
        tmp.until = reserved_to.toLocaleTimeString([], { timeStyle: 'short' });
        return tmp;
      });

      const rooms = await response.json();
      rooms.forEach(room => {
        tmpRes.forEach(res => {
          if (res.room_id === room._id) {
            res.room_name = room.name;
            res.thumbnail_url = room.thumbnail_url;
          }
        })
      });
      setActiveReservations(tmpRes);
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch user's active reservations
  const getActiveReservations = async () => {
    const userIdParam = (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();
    try {
      //setLoading(true)
      const response = await fetch(`https://mtaa-backend.herokuapp.com/users/${userIdParam}/active-reservations`, {
        method: 'GET',
        headers: requestHeaders
      });

      const responseJson = await response.json();
      const reservations = responseJson.active_reservations;
      
      let active = [];
      let history = [];
      reservations.forEach((reservation) => (new Date(reservation.reserved_to) > new Date() ? active : history).push(reservation));
      setReservationHistory(history);
      if (reservations) getRooms(active, requestHeaders);

    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      //setLoading(false);
      setRefreshing(false);
    }
  };

  // Delete specified reservation
  const cancelReservation = async (reservationID) => {
    const requestHeaders = await getRequestHeaders();
    try {
      const response = await fetch(`https://mtaa-backend.herokuapp.com/reservations/${reservationID}`, {
        method: 'DELETE',
        headers: requestHeaders
      });
      //const responseJson = await response.json();
      if (response.status === 204) alert('Successfully deleted your reservation!');
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      onRefresh();
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getActiveReservations();
  };

  useEffect(() => {
		getCredentials();
    getActiveReservations();
	}, [isFocused]);

  const renderReservations = ({ item }) => (
    <Listing 
      style={styles.activeReservation}
      roomName={item.room_name}
      image={{uri: item.thumbnail_url}}
      text1={`Date: ${item.date}`}
      text2={`From: ${item.from}`}
      text3={`Until: ${item.until}`} 
      buttonTitle='Cancel'
      buttonAction={() => cancelReservationDialog(item)}
      cardAction={() => { 
        navigation.navigate('Room', { _id: item.room_id, name: item.name })
      }} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      { isLoading || userName === {} && activeReservations.size() == 0 ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <>
          <View style={styles.profileButtonsContainer}>
            <TouchableOpacity
              style={styles.mainProfileButton}
              onPress={() => navigation.navigate('EditProfile')}>
              <ProfileIcon
                image={profilePicURL.pic}
                action={() => navigation.navigate('EditProfile')}       
              />
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.buttonText, textStyle.h2]}>{userName.first} {userName.last}</Text>
                <Text style={[styles.subtitle, textStyle.h3]}>{userName.username}</Text>
              </View>
              <Entypo style={styles.chevron} name="chevron-right" size={36} color={colors.blue} />
            </TouchableOpacity>
            <ProfileButton
              title={"Logout"}
              action={() => navigation.navigate('Login')}
              color={colors.lightBlue}
            />
            <ProfileButton
              title={"Reservation history"}
              action={() => navigation.navigate('ReservationHistory', { history: reservationHistory })}
            />
            <ProfileButton
              title={"Your listings"}
              action={() => navigation.navigate('UserListing')}
            />
          </View>
          <Text style={[styles.activeReservationsHeading, textStyle.h2]}>Your active reservations:</Text>
          <FlatList
            data={activeReservations}
            renderItem={renderReservations}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.activeReservationsContainer}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
  profileButtonsContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 26
  },
  mainProfileButton: {
    width: 330,
    height: 83,
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 9,
    paddingRight: 20
  },
  buttonText: {
    paddingLeft: 20,
    color: colors.black,
  },
  chevron: {
    right: 0
  },
  subtitle: {
    paddingLeft: 20,
    color: colors.grey,
  },
  activeReservationsContainer: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeReservationsHeading: {
    marginLeft: 30,
    marginTop: 24,
    marginBottom: 10
  },
  activeReservation: {
    marginBottom: 20,
  },
   activityIndicator: {
    flex: 1
  }
});