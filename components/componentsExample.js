import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react'

import colors from '../styles/colors';
import textStyle from '../styles/text';

import StandardButton from './standardButton';
import Input from './input';
import ProfileButton from './profileButton';
import Listing from './listing';
import Notification from './noti';

export default function ComponentsExample() {

  let [fontsLoaded] = useFonts({
    'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={ styles.container } >
      <StandardButton style={styles.button} title='' action={() => {console.log('Clicked')}} />
      <ProfileButton title='' color={ colors.lightGrey } action={() => {console.log('Clicked')}} /> 
      <Input placeholder='Password' action={() => {console.log('Clicked')}} />
      <Listing 
        roomName='' 
        image={require('../assets/images/room1.jpg')}
        info='Very nice room' 
        numSeats='12' 
        amenities='whiteboard, ethernet' 
        buttonTitle='Book again'
        buttonAction={() => {console.log('Clicked')}} 
      /> 
      <Notification type='booked_room' time='1hr' text='Someone has just reserved your room, Room 1 on Carrot st. 123!' />
      <Notification type='new_booking' time='1hr' text='You have just reserved a room, Room 2 on Broccoli st. 11!' />
      <Notification type='missed_call' time='1hr' text='Missed call from Alice.' action={() => {console.log('Clicked')}} />
      <Notification type='removed_listing' time='1hr' text='Room named, Room 1 that you had reservation for has just been removed.' /> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    height: 10
  }
});
