import { StyleSheet, View, TextInput } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';
import React, { useState } from 'react'

const CustomInput = ({ placeholder }) => {
  const [text, setText] = useState('')

  return ( 
    <View style={ styles.inputContainer }>
      <TextInput style= {[styles.input, textStyle.small]} value={text}
        placeholder={ placeholder }
        onChangeText={(text) => {
        setText(text)
        }}
      />
    </View>
)};

const styles = StyleSheet.create({
  inputContainer: {
    width: 330,
    height: 48,
    backgroundColor: '#EBEBEB',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    paddingLeft: 20,
    color: colors.grey
  }
});

export default CustomInput;