import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';

const SmallButton = ({ title, action }) => {
  return (
    <TouchableOpacity style={ styles.smallButton } onPress={action}>
      <Text style={[textStyle.small, { color: colors.white}]}>{ title || 'Button' }</Text>
    </TouchableOpacity>
)};

export default function Listing({ roomName, image, info, numSeats, amenities, buttonTitle, buttonAction }) {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.box}>
        <View style={styles.textContainer}>
          <Text style={[styles.heading, textStyle.small, { fontFamily: 'roboto-bold' }]}>{roomName || 'Room name'}</Text>
          <Text style={[styles.text, textStyle.smaller]}>{info}</Text>
          <Text style={[styles.text, textStyle.smaller]}>{numSeats} seats</Text>
          <Text style={[styles.text, textStyle.smaller]}>{amenities}</Text>
        </View>
        <SmallButton title={buttonTitle} action={buttonAction} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  box: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20, // 15 is another option here
    paddingLeft: 20,
  },
  smallButton: {
    width: 129,
    backgroundColor: colors.blue,
    height: 49,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    width: 330,
    height: 261,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    shadowColor: colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,  
    elevation: 3
  },
  heading: {
    paddingBottom: 5,
    color: colors.black,
  },
  text: {
    paddingBottom: 3,
    color: colors.grey,
    flexWrap: 'wrap'
  },
  image: {
    width: 310,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
    margin: 10
  }
});