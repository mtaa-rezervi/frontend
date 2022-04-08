import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import React, { useState } from 'react'

import colors from './styles/colors';
import textStyle from './styles/text';

import StandardButton from './components/standardButton';
import CustomInput from './components/customInput';
import ProfileButton from './components/profileButton';
import Listing from './components/listing';
import Notification from './components/noti';

export default function App() {

  let [fontsLoaded] = useFonts({
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={ styles.container } >
      {/* <Text style={[textStyle.small, { color: colors.blue }]}>Ahojky!</Text> */}
      {/* <StandardButton title='' /> */}
      {/* <ProfileButton title='' color={ colors.lightGrey } /> */}
      {/* <CustomInput placeholder='Password' /> */}
      <Listing roomName='' /> 
      <Notification type='booked_room' time='1hr' roomName='Room 1' street='Carrot st. 123' />
      <Notification type='new_booking' time='1hr' roomName='Room 1' street='Carrot st. 123' />
      <Notification type='missed_call' time='1hr' roomName='Room 1' user='Alice' street='Carrot st. 123' />
      <Notification type='removed_listing' time='1hr' roomName='Room 1' user='Alice' street='Carrot st. 123' />
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
}
});
