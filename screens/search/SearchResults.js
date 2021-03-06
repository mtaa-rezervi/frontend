import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, FlatList, ActivityIndicator, Image } from 'react-native';
import { getRequestHeaders } from '../../utils/api';

import BackButton from '../../components/buttons/BackButton';
import Listing from '../../components/cards/Listing';
import EmptyList from '../../components/cards/EmptyList';

import textStyle from '../../styles/text';
import colors from '../../styles/colors';
import { SERVER_URL } from '../../constants';

export default function SearchResults({ navigation, route }) {
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);

  // Fetch rooms displayed on the screen
  const getRooms = async () => {
    const requestHeaders = await getRequestHeaders();
    try {
      const endpoint = SERVER_URL + '/rooms';
      const response = await fetch(endpoint + route.params.query, {
        method: 'GET',
        headers: requestHeaders
      });

      const rooms = await response.json();
      setData(rooms);
      if (rooms.length === 0) alert('No matching rooms found');
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
      buttonTitle='View'
      buttonAction={() => { 
        navigation.navigate('Room', { _id: item._id, name: item.name })
      }}
      cardAction={() => { 
        navigation.navigate('Room', { _id: item._id, name: item.name })
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton action={() => navigation.goBack()}/>
        <Text style={[textStyle.h1, styles.heading]}>Search results</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderRooms}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listingContainer}
        ListEmptyComponent={ !isLoading && <EmptyList text={'No matching rooms found'}/> } 
      />
      { isLoading && data.length === 0 && 
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' />
      </View> }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    marginBottom: 10
  },
  heading: {
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingContainer: {
    //marginTop: 14,
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    opacity: 0.8
  }
});