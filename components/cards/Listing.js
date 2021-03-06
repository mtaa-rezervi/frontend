import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import colors from '../../styles/colors';
import textStyle from '../../styles/text';

import SmallButton from '../buttons/SmallButton';

export default function Listing({ style, roomName, image, text1, text2, text3, buttonTitle, buttonAction, buttonColor, cardAction }) {
  //image == '' || image.uri == '' ? image = require('../assets/images/room1.jpg') : image = image;

  return (
    <View style={style}>
      <TouchableOpacity style={styles.card} onPress={cardAction} >
        { !image || image == '' || image.uri == '' ? 
          <View style={[styles.image, {backgroundColor: colors.lightBlue}]}/> : (
          <Image style={styles.image} source={image} />
        )}
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={[styles.heading, textStyle.small, { fontFamily: 'roboto-bold' }]}>{roomName || 'Room name'}</Text>
            <Text style={[styles.text, textStyle.smaller]}>{text1}</Text>
            <Text style={[styles.text, textStyle.smaller]}>{text2}</Text>
            <Text style={[styles.text, textStyle.smaller]}>{text3}</Text>
          </View>
          <SmallButton title={buttonTitle} action={buttonAction} color={buttonColor} />
        </View>
      </TouchableOpacity>
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