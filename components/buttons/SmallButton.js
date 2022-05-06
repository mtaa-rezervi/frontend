import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import textStyle from '../../styles/text';

export default function SmallButton({ title, action, style, color }) {
  return (
    <View style={style}>
      <TouchableOpacity style={[styles.button, { backgroundColor: color ? color : colors.blue }]} onPress={action}>
        <Text style={[textStyle.small, { color: colors.white}]}>{ title || 'Button' }</Text>
      </TouchableOpacity>
    </View> 
  );
}


const styles = StyleSheet.create({
  button: {
    width: 129,
    backgroundColor: colors.blue,
    height: 49,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
