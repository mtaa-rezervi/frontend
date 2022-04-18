import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons'; 

import colors from '../../styles/colors';

export default function BackButton({ action, style }) {
  return (
    <View style={style}>
      <TouchableOpacity onPress={action} style={styles.arrow}>
        <Feather name="arrow-left" size={30} color={colors.blue} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  arrow: {
    marginLeft: 30,
    marginTop: 24,
  }
});