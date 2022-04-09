import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react'

import colors from '../styles/colors';
import textStyle from '../styles/text';

import StandardButton from './standardButton';
import Input from './input';
import ProfileButton from './profileButton';
import Listing from './listing';
import Notification from './noti';
import ProfileIcon from './profile';
import Tag from './tag';

export default function ComponentsExample() {

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
      {/* <Notification type='new_booking' time='1hr' text='You have just reserved a room, Room 2 on Broccoli st. 11!' />
      <Notification type='missed_call' time='1hr' text='Missed call from Alice.' action={() => {console.log('Clicked')}} />
      <Notification type='removed_listing' time='1hr' text='Room named, Room 1 that you had reservation for has just been removed.' /> */}
      <ProfileIcon image={require('../assets/images/Avatar.png')} action={() => {console.log('Clicked')}}/> 
      <Tag title='whiteboard' action={() => {console.log('Clicked')}}/>
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
