import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import textStyle from '../../styles/text';

export default function StandardButton({ title, action, style, color }) {
  return (
    <View style={style}>
      <TouchableOpacity style={[styles.button, { backgroundColor: color ? color : colors.blue }]} onPress={action}>
        <Text style={[styles.buttonText, textStyle.small]}>{title || 'Button'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
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
