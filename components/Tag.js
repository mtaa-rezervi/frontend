import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';
import React, { useState } from 'react'

export default function Tag({ title, action, style }) {
  const [active, setActive] = useState(false);

  return (
    <View style={style}>
      <Pressable
        style={active ? styles.buttonActive : styles.button}
        onPressIn={action}
        onPress={() => {
          setActive(!active);
        }}
      >
        <Text style={[active ? styles.textActive : styles.text, textStyle.small]}>{title || 'Tag'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    height: 35,
    borderRadius: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.blue
    // paddingLeft: 20,
    // paddingRight: 20
  },
  buttonActive: {
    backgroundColor: colors.lightBlue,
    height: 35,
    borderRadius: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    // paddingLeft: 20,
    // paddingRight: 20,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: colors.blue,
  },
  text: {
    color: colors.white,
    marginHorizontal: 20
  },
  textActive: {
    color: colors.blue,
    marginHorizontal: 20
  }
});
