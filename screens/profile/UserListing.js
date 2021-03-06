import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ActivityIndicator, FlatList, Alert } from 'react-native';

import { loadSecure } from '../../utils/secureStore';
import { getRequestHeaders } from '../../utils/api';

import colors from '../../styles/colors';
import textStyle from '../../styles/text';
import { SERVER_URL } from '../../constants';

import Listing from "../../components/cards/Listing";
import EmptyList from '../../components/cards/EmptyList';
import BackButton from '../../components/buttons/BackButton';
import ProfileButton from '../../components/buttons/ProfileButton';

export default function UserListing({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)

  const [rooms, setData] = useState([]);

  const deleteRoomDialog = (room) => {
    return (
      Alert.alert('Remove room', `Are you sure you want to remove ${room.name}?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => deleteRoom(room._id) },
      ])
    )
  };  

  // Delete specified room 
  const deleteRoom = async (roomID) => {
    const requestHeaders = await getRequestHeaders();
    try {
      const endpoint = `${SERVER_URL}/rooms/${roomID}`;
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
      onRefresh()
      // setLoading(false);
      // setRefreshing(false);
    }
  };

  // Fetch rooms displayed on the screen
  const getRooms = async () => {
    const userIdParam = (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();
    try {
      const endpoint = `${SERVER_URL}/users/${userIdParam}/active-listings`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: requestHeaders
      });

      const responseJson = await response.json();
      if (responseJson.active_listings.length === 0) alert('You have no listed rooms');
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
      text1={item.info}
      text2={`${item.number_of_seats} seats`}
      text3={item.amenities.join(', ')} 
      buttonTitle='Remove'
      buttonAction={() => deleteRoomDialog(item)} 
      buttonColor={colors.red}
      cardAction={() => { 
        navigation.navigate('Room', { _id: item._id, name: item.name })
      }}
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
      {isLoading || rooms.length === null ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <FlatList
          data={rooms}
          renderItem={renderRooms}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={item => item._id}
          ListEmptyComponent={ !isLoading && <EmptyList text={'You have no listed rooms'}/> } 
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
    //marginTop: 10
    //marginBottom: 10,
  },
  activityIndicator: {
    flex: 1
  }
});