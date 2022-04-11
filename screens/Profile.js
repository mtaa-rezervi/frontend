import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import ProfileButton from '../components/ProfileButton';
//import Profile from '../components/Profile';
import ProfileIcon from '../components/Profile';

export default function ProfileScreen({ navigation }) {

  // const logout = async () => {

  // }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.profileButtonsContainer}>
        
        <TouchableOpacity
          style={styles.mainProfileButton}
          onPress={() => navigation.navigate('EditProfile')}>

          <ProfileIcon
                image={require('../assets/images/Avatar.png')}        
          />
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.buttonText, textStyle.h1]}>first last</Text>
            <Text style={[styles.buttonText, textStyle.h3]}>username</Text>
          </View>
          <Entypo style={styles.chevron} name="chevron-right" size={24} color={colors.blue} />
        </TouchableOpacity>
        
        

        <ProfileButton
          title={"Logout"}
          action={() => navigation.navigate('Login')}
          color={colors.lightBlue}
        />
        <ProfileButton
          title={"Reservation history"}
          //action={() => navigation.navigate('ReservationHistory')}
        />
        <ProfileButton
          title={"Your listings"}
          //action={() => navigation.navigate('ListedRooms')}
        />

      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
  profileButtonsContainer: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 31
  },
  mainProfileButton: {
    width: 330,
    height: 83,
    backgroundColor: colors.lightGrey,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 9,
    paddingRight: 20
  },
  buttonText: {
    paddingLeft: 20,
    color: colors.black,
  },
  chevron: {
    right: 0
  }
});