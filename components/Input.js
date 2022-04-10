import { StyleSheet, View, TextInput } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';
import React, { useState } from 'react'

export default function Input({ placeholder, secureTextEntry, value, onChangeText }) {

  return (
    <View>
      <TextInput 
        style={[styles.input, textStyle.small]} 
        value={value} 
        secureTextEntry={secureTextEntry || false}
        placeholder={placeholder || 'Placeholder'}
        onChangeText={onChangeText} 
        autoCapitalize='none'/>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    width: 330,
    height: 48,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    color: colors.grey
  }
});
