import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import ProfileButton from '../components/ProfileButton';
import ProfileIcon from '../components/Profile';
import BackButton from '../components/BackButton';

export default function EditProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.header}>
        <View>
          <BackButton action={() => navigation.goBack()}/>
          <Text style={[textStyle.h1, styles.heading]}>Edit profile</Text>
        </View>
        <ProfileIcon image={require('../assets/images/Avatar.png')}/>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	},
  heading: {
    marginLeft: 30
  },
  header: {
    flex: 1,
    flexDirection: 'row'
  }
});