import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';

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
  },
  image: {
    width: 58,
    height: 58,
    resizeMode: 'cover',
    borderRadius: 40,
  }
});