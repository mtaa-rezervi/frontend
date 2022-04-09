import { StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function ProfileIcon({ image, action }) {
  return (
    <TouchableOpacity style={styles.button} onPress={action}>
      <Image style={styles.image} source={image} />
    </TouchableOpacity>
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