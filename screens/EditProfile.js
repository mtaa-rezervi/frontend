import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import ProfileButton from '../components/ProfileButton';
import Profile from '../components/Profile';
import BackButton from '../components/BackButton';

export default function EditProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        <BackButton action={() => navigation.goBack()}/>
        <Text style={textStyle.h1}>Edit profile</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
});