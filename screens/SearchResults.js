import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import colors from '../styles/colors';

export default function SearchResults({ navigation, route }) {
  console.log(route);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Results</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white
	}
});