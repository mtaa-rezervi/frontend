import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ActivityIndicator, FlatList } from 'react-native';

import { getValueFor } from "../utils/secureStore";

import colors from '../styles/colors';
import textStyle from '../styles/text';

import Listing from "../components/Listing";
import BackButton from '../components/BackButton';

export default function ReservationHistory({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)

  const [rooms, setData] = useState([]);

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
      
      const endpoint = `https://mtaa-backend.herokuapp.com/users/${userIdParam}/history`;

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: requestHeaders
      });

      const rooms = await response.json();
      setData(rooms);
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
    <View style={styles.listing}>
      <Listing 
        roomName={item.name}
        image={{uri: item.thumbnail_url}}
        info={item.info}
        numSeats={item.number_of_seats}
        amenities={item.amenities.join(', ')} 
        buttonTitle='View'
        buttonAction={() => { 
          navigation.navigate('Room', { _id: item._id, name: item.name })
        }} 
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <BackButton action={() => navigation.goBack()}/>
          <Text style={[textStyle.h1, styles.heading]}>Your reservation history</Text>
        </View>
      </View>
      {isLoading || rooms == null ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <FlatList
          data={rooms}
          renderItem={renderRooms}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.listingContainer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
  heading: {
    width: 330,
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  header: {
    //marginTop: 8,
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
  activityIndicator: {
    flex: 1
  }
});