import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';

const Listing = ({ roomName }) => {
  return (
    <TouchableOpacity style={ styles.button }>
      <View style={ styles.container }>
        <Image style={ styles.image } source={require('../assets/images/room1.jpg')}/>
        <Text style={[styles.heading, textStyle.small, { fontFamily: 'roboto-bold' }]}>{ roomName || 'Room name' }</Text>
        <Text style={[styles.text, textStyle.smaller]}>alalallalala</Text>
        <Text style={[styles.text, textStyle.smaller]}>alalallalala</Text>
        <Text style={[styles.text, textStyle.smaller]}>aladadadalallalala</Text>
      </View>
    </TouchableOpacity>
)};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  button: {
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
    paddingLeft: 20,
    paddingBottom: 5,
    color: colors.black,
  },
  text: {
    paddingLeft: 20,
    paddingBottom: 3,
    color: colors.grey
  },
  image: {
    width: 310,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 20,
    margin: 10
  }
});

export default Listing;