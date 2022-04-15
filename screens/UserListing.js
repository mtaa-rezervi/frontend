import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ActivityIndicator, FlatList, Alert } from 'react-native';

import { getValueFor } from "../utils/secureStore";

import colors from '../styles/colors';
import textStyle from '../styles/text';

import Listing from "../components/Listing";
import BackButton from '../components/BackButton';
import ProfileButton from '../components/ProfileButton';

export default function UserListing({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)

  const [rooms, setData] = useState([]);

  const deleteRoom = async (roomID) => {
    console.log(roomID);
    try {
      const token = await getValueFor('bearer');
      const auth = ('Bearer ' + token).replace(/"/g, '');

      let requestHeaders = new Headers();
      requestHeaders.append('Accept', 'application/json');
      requestHeaders.append('Authorization', auth);
      
      const endpoint = `https://mtaa-backend.herokuapp.com/rooms/${roomID}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: requestHeaders
      });

      if (response.status === 204) {
        Alert.alert('Successfully removed your listing!');
        onRefresh();
      } 
      //setData(responseJson.active_listings);
    } catch (error) {
        console.error(error);
        Alert.alert('Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Fetch rooms displayed on the screen
  const getRooms = async () => {
    try {
      const token = await getValueFor('bearer');
      const userID = await getValueFor('_id');
      const auth = ('Bearer ' + token).replace(/"/g, '');
      const userIdParam = userID.replace(/"/g, '');

      let requestHeaders = new Headers();
      requestHeaders.append('Accept', 'application/json');
      requestHeaders.append('Authorization', auth);
      
      const endpoint = `https://mtaa-backend.herokuapp.com/users/${userIdParam}/active-listings`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: requestHeaders
      });

      const responseJson = await response.json();
      setData(responseJson.active_listings);
    } catch (error) {
        console.error(error);
        alert('Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getRooms();
  };

  useEffect(() => {
    getRooms();
  }, []);

  const renderRooms = ({ item }) => (
    <Listing 
      style={styles.listing}
      roomName={item.name}
      image={{uri: item.thumbnail_url}}
      info={item.info}
      numSeats={item.number_of_seats}
      amenities={item.amenities.join(', ')} 
      buttonTitle='Remove'
      buttonAction={ () => deleteRoom(item._id) } 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <BackButton action={() => navigation.goBack()}/>
          <Text style={[textStyle.h1, styles.heading]}>Your listed rooms</Text>
        </View>
      </View>
      {isLoading || rooms.length === 0 ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <FlatList
          data={rooms}
          renderItem={renderRooms}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listingContainer}
        />
      )}
      <ProfileButton style={styles.listingButton} title='List a new room' action={() => navigation.navigate('RoomCreation')}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
  heading: {
    marginRight: 30,
    marginLeft: 30,
    //marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginBottom: 10
  },
  listingContainer: {
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listing: {
    marginBottom: 20,
  },
  listingButton: {
    alignSelf: 'center',
    //marginBottom: 10,
  },
  activityIndicator: {
    flex: 1
  }
});