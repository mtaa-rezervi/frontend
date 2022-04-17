import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, ActivityIndicator, FlatList } from 'react-native';
import { loadSecure } from '../utils/secureStore';
import { getRequestHeaders } from '../utils/api';
import { useIsFocused } from '@react-navigation/native';

import Notification from '../components/Notification';
import ProfileIcon from '../components/Profile';
import EmptyList from '../components/EmptyList';

import colors from '../styles/colors';
import textStyle from '../styles/text';

// Screen
export default function NotiScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false)

  const [notis, setData] = useState([]);
  const [profilePicURL, setProfilePicURL] = useState({});

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

  const getProfilePic = async () => {
		const userIdParam =  (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();

		const response = await fetch(`https://mtaa-backend.herokuapp.com/users/${userIdParam}`, {
		method: 'GET',
		headers: requestHeaders
		});

		const user = await response.json();
		let picURL = user.profile_pic ? { uri: user.profile_pic } : require('../assets/images/Avatar.png');
  		
		setProfilePicURL({ pic: picURL });
	}

  const onRefresh = () => {
    setRefreshing(true);
    getNotis();
  };

  useEffect(() => {
    getNotis();
  }, []);

  useEffect(() => {
    getProfilePic();
  }, [isFocused]);

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
        <ProfileIcon image={profilePicURL.pic} action={() => {navigation.navigate('Profile')}}/> 
      </View>
      <FlatList
        style={styles.noti}
        data={notis}
        renderItem={renderNotis}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        keyExtractor={(item, index) => index}
        contentContainerStyle={styles.notiContainer}
        ListEmptyComponent={ !isLoading && <EmptyList/>}
      />
      { isLoading && 
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