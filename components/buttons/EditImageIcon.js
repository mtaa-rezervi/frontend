import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../../styles/colors';

export default function EditImageIcon({ image, action }) {
  return (
    <TouchableOpacity style={styles.editStack} onPress={action}>
        <Image style={styles.image} source={image}/>
        <View style={styles.editIcon}>
            <MaterialIcons name="edit" size={24} color={colors.blue} />
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  editIcon: {
    top: 83,
    left: 76,
    width: 24,
    height: 24,
    position: "absolute",
  },
  editStack: {
    width: 100,
    height: 107
  }
});