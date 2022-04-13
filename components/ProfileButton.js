import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';
import { Entypo } from '@expo/vector-icons'; 

export default function ProfileButton({ title, color, action }) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color || colors.lightGrey }]}
      onPress={action}
    >
      <Text style={[styles.buttonText, textStyle.h2]}>{title || 'Button'}</Text>
      <Entypo style={styles.chevron} name="chevron-right" size={36} color={colors.blue} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 330,
    height: 60,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttonText: {
    paddingLeft: 20,
    color: colors.black,
  },
  chevron: {
    paddingRight: 20,
  }
});
