import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';

import colors from '../styles/colors';

export default function ProfileIcon({ image, action, style }) {
  return (
    <View style={style}>
      <TouchableOpacity style={styles.button} onPress={action}>
        <Image style={styles.image} source={image} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    // width: 58,
    // height: 58,
    // shadowColor: colors.black,
    // shadowOffset: { width: 4, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,  
    // elevation: 3,
  },
  image: {
    width: 58,
    height: 58,
    resizeMode: 'cover',
    borderRadius: 40,
  }
});