import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ActivityIndicator, FlatList } from 'react-native';
import { loadSecure } from '../utils/secureStore';
import { getRequestHeaders } from '../utils/api';

import Notification from '../components/Notification';
import ProfileIcon from '../components/Profile';

import colors from '../styles/colors';
import textStyle from '../styles/text';

// Screen
export default function NotiScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)

  const [notis, setData] = useState([]);

  // Fetch user's notifications
  const getNotis = async () => {
    const userID = (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();
    try {    
      const endpoint = `https://mtaa-backend.herokuapp.com/users/${userID}/notifications`;
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: requestHeaders
      });

      const notis = await response.json();
      setData(notis.notifications);
    } catch (error) {
        console.error(error);
        alert('Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    getNotis();
  };

  useEffect(() => {
    getNotis();
  }, []);

  const renderNotis = ({ item }) => (
    <Notification
      style={styles.noti}
      type={item.type}
      time={item.time}
      text={item.text}
      action={item.type === 'missed_call' ? () => {console.log('calling user')} : null}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.heading, textStyle.h1]}>Notifications</Text>
          <Text/>
        </View>
        <ProfileIcon image={require('../assets/images/Avatar.png')} action={() => {navigation.navigate('Profile')}}/> 
      </View>
      {isLoading || notis == null ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <FlatList
          style={styles.noti}
          data={notis}
          renderItem={renderNotis}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.notiContainer}
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
  notiContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2
  },
  noti: {
    paddingBottom: 11
  },
  activityIndicator: {
    flex: 1
  }
});