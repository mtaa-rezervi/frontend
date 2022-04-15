import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';

const SmallButton = ({ title, action }) => {
  return (
    <TouchableOpacity style={ styles.smallButton } onPress={action}>
      <Text style={[textStyle.small, { color: colors.white}]}>{ title || 'Button' }</Text>
    </TouchableOpacity>
)};

export default function Listing({ style, roomName, image, info, numSeats, amenities, buttonTitle, buttonAction }) {
  //image == '' || image.uri == '' ? image = require('../assets/images/room1.jpg') : image = image;

  return (
    <View style={style}>
      <View style={styles.card}>
        { !image || image == '' || image.uri == '' ? 
          <View style={[styles.image, {backgroundColor: colors.lightBlue}]}/> : (
          <Image style={styles.image} source={image} />
        )}
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={[styles.heading, textStyle.small, { fontFamily: 'roboto-bold' }]}>{roomName || 'Room name'}</Text>
            <Text style={[styles.text, textStyle.smaller]}>{info}</Text>
            <Text style={[styles.text, textStyle.smaller]}>{numSeats} seats</Text>
            <Text style={[styles.text, textStyle.smaller]}>{amenities}</Text>
          </View>
          <SmallButton title={buttonTitle} action={buttonAction} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  card: {
    width: 330,
    //height: 261,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    shadowColor: colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,  
    elevation: 3,
    paddingBottom: 7
  },
  heading: {
    paddingBottom: 5,
    color: colors.black,
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: 150
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