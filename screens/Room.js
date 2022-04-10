import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import BackButton from '../components/BackButton';

import textStyle from '../styles/text';
import colors from '../styles/colors';

export default function RoomScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <BackButton action={() => navigation.goBack()}/>
      <Text style={[textStyle.h1, styles.header]}>{route.params.name}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
  arrow: {
    marginLeft: 30
  },
  header: {
    marginTop: 8,
    marginLeft: 30
  }
});