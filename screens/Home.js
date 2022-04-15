import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, FlatList, StyleSheet, SafeAreaView, View, Text} from "react-native";

import { getRequestHeaders } from '../utils/api';

import colors from '../styles/colors';
import textStyle from "../styles/text";

import ProfileIcon from "../components/Profile";
import Listing from "../components/Listing";

// Screen
export default function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)

  const [rooms, setData] = useState([]);

  // Fetch rooms displayed on the screen
  const getRooms = async () => {
    const requestHeaders = await getRequestHeaders();
    try {
      const endpoint = 'https://mtaa-backend.herokuapp.com/rooms';

      const today = new Date()
      const dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate(), 8).toISOString();
      const dateTo = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate(), 20).toISOString();
      const query = endpoint+`?vacant_from=${dateFrom}&vacant_to=${dateTo}`
      //console.log(query)
      const response = await fetch(query, {
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
          <Text style={[styles.heading, textStyle.h1]}>Welcome</Text>
          <Text style={[styles.subHeading, textStyle.h2]}>Available today</Text>
        </View>
        <ProfileIcon image={require('../assets/images/Avatar.png')} action={() => {navigation.navigate('Profile')}}/> 
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
    backgroundColor: colors.white,
  },
  header: {
    height: 65,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 24,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: colors.black
  },
  subHeading: {
    color: colors.grey
  },
  listingContainer: {
    marginTop: 14,
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
