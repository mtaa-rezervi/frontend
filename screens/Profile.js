import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import colors from '../styles/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
});