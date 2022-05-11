import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'; 
import colors from '../../styles/colors';
import textStyle from '../../styles/text';

export default function SendButton({ title, action, style, color }) {
  return (
    <View style={style}>
      <TouchableOpacity style={[styles.button, { backgroundColor: color ? color : colors.blue }]} onPress={action}>
        <FontAwesome name="paper-plane-o" size={24} color="white" />
      </TouchableOpacity>
    </View> 
  );
}


const styles = StyleSheet.create({
  button: {
    width: 80,
    backgroundColor: colors.blue,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
