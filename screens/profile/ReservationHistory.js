import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ActivityIndicator, FlatList } from 'react-native';

import { getRequestHeaders } from '../../utils/api';

import colors from '../../styles/colors';
import textStyle from '../../styles/text';
import { SERVER_URL } from '../../constants';

import Listing from "../../components/cards/Listing";
import EmptyList from '../../components/cards/EmptyList';
import BackButton from '../../components/buttons/BackButton';

export default function ReservationHistory({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);

  const [reservationHistory, setReservationHistory] = useState([]);

  // Fetch rooms for coresponding reservations 
  // and create reservation object displayed on the screen
  const getRooms = async () => {
    const requestHeaders = await getRequestHeaders();
    const reservations = route.params.history;
    try {
      //setLoading(true)
      let roomsIDs = reservations.map((res) => res.room_id);
      roomsIDs = roomsIDs.map((id) => `id[]=${id}`);
      const query = roomsIDs.join('&');

      const response = await fetch(`${SERVER_URL}/rooms?${query}`, {
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
        tmp.from = reserved_from.toLocaleTimeString([], {timeStyle: 'short'});
        tmp.until = reserved_to.toLocaleTimeString([], {timeStyle: 'short'});
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

      if (tmpRes.length === 0) alert('You have no previous reservations');
      setReservationHistory(tmpRes);
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

  const renderReservations = ({ item }) => (
    <Listing 
      style={styles.reservation}
      roomName={item.room_name}
      image={{uri: item.thumbnail_url}}
      text1={`Date: ${item.date}`}
      text2={`From: ${item.from}`}
      text3={`Until: ${item.until}`} 
      buttonTitle='Book again'
      //buttonAction={() => console.log('Book again!')}
      buttonAction={() => navigation.navigate('RoomBooking', { _id: item.room_id, name: item.name })}
      cardAction={() => navigation.navigate('Room', { _id: item.room_id, name: item.name })} 
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton action={() => navigation.goBack()}/>
        <Text style={[textStyle.h1, styles.heading]}>Your reservation history</Text>
      </View>
      {isLoading || reservationHistory == null ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <FlatList
          data={reservationHistory}
          renderItem={renderReservations}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={item => item._id}
          ListEmptyComponent={ !isLoading && <EmptyList/> } 
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
    //marginTop: 14,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  reservation: {
    marginBottom: 20,
  },
  activityIndicator: {
    flex: 1
  }
});