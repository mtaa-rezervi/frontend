import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import textStyle from '../../styles/text';

export default function StandardButton({ title, action, style }) {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.button} onPress={action}>
        <Text style={[styles.buttonText, textStyle.small]}>{title || 'Button'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.blue,
    width: 330,
    height: 49,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: colors.white,
  }
});
