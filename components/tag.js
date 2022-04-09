import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';
import React, { useState } from 'react'

export default function Tag({ title, action }) {
  const [active, setActive] = useState(false);

  return (
    <Pressable
      style={active ? styles.buttonActive : styles.button}
      onPressIn={action}
      onPress={() => {
        setActive(!active);
      }}
    >
      <Text style={[active ? styles.textActive : styles.text, textStyle.small]}>{title || 'Tag'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonActive: {
    backgroundColor: colors.lightBlue,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.blue,
  },
  text: {
    color: colors.white,
  },
  textActive: {
    color: colors.blue
  }
});
