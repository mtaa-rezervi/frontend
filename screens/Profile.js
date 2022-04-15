import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { loadSecure } from '../utils/secureStore';
import { getRequestHeaders } from '../utils/api';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import ProfileButton from '../components/ProfileButton';
import ProfileIcon from '../components/Profile';
import Listing from '../components/Listing';

// Screen
export default function ProfileScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)
  
  const [userName, setUserName] = useState({});
  const [rooms, setRooms] = useState([])

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
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      //setLoading(false);
    }
  };

  // Fetch rooms displayed under Your active reservations 
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

      const responseJson = await response.json();
      setRooms(responseJson);
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
      const activeReservations = responseJson.active_reservations;
      if (activeReservations) getRooms(activeReservations, requestHeaders);
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      //setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getActiveReservations();
  };

  useEffect(() => {
		getCredentials();
    getActiveReservations();
	}, []);

  const renderReservations = ({ item }) => (
    <View style={styles.activeReservation}>
      <Listing 
        roomName={item.name}
        image={{uri: item.thumbnail_url}}
        info={item.info}
        numSeats={item.number_of_seats}
        amenities={item.amenities.join(', ')} 
        buttonTitle='Cancel'
        buttonAction={() => { 
          navigation.navigate('Room', { _id: item._id, name: item.name })
        }} 
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {isLoading || userName === {} && rooms.size() == 0 ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <>
          <View style={styles.profileButtonsContainer}>
            <TouchableOpacity
              style={styles.mainProfileButton}
              onPress={() => navigation.navigate('EditProfile')}>
              <ProfileIcon
                image={require('../assets/images/Avatar.png')}        
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
              action={() => navigation.navigate('ReservationHistory')}
            />
            <ProfileButton
              title={"Your listings"}
              action={() => navigation.navigate('UserListing')}
            />
          </View>
          <Text style={[styles.activeReservationsHeading, textStyle.h2]}>Your active reservations:</Text>
          <FlatList
            data={rooms}
            renderItem={renderReservations}
            onRefresh={onRefresh}
            refreshing={isRefreshing}
            keyExtractor={(item, index) => index}
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
    marginTop: 10,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeReservationsHeading: {
    marginLeft: 30,
    marginTop: 24,
  },
  activeReservation: {
    marginBottom: 20,
  },
   activityIndicator: {
    flex: 1
  }
});