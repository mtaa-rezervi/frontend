import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import { Feather } from '@expo/vector-icons'; 

import colors from '../styles/colors';
import textStyle from '../styles/text';

export default function RoomScreen({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={textStyle.h1}>{route.params.name}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
});