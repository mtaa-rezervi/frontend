import { StyleSheet, View, TextInput } from 'react-native';
import colors from '../../styles/colors';
import textStyle from '../../styles/text';
import React from 'react'

export default function Input({ placeholder, secureTextEntry, value, onChangeText, width, style }) {
  const inputWidth = ( width == null ? 330 : width );
  return (
    <View style={style}>
      <TextInput 
        style={[styles.input, textStyle.small, { width: inputWidth}]} 
        value={ value } 
        secureTextEntry={ secureTextEntry || false }
        placeholder={ placeholder || 'Placeholder' }
        onChangeText={ onChangeText } 
        autoCapitalize='none'/>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
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
