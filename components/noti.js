import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';

const Notification = ({ type, time, roomName, street, user }) => {
  let component;

  if (type === 'booked_room') {
    component = (
      <View style={ styles.container }>
        <Text style={[styles.time, textStyle.smaller]}>{time} ago</Text>
        <View style={ styles.notification }>
            <Text style={[styles.text, textStyle.smaller]}>Someone has just reserved your room,
            <Text style={{ fontFamily: 'roboto-bold' }}> {roomName}</Text> on 
            <Text style={{ fontFamily: 'roboto-bold' }}> {street}</Text>!
            </Text>
        </View>
      </View>
    );
  } else if (type === 'new_booking') {
    component = (
      <View style={ styles.container }>
        <Text style={[styles.time, textStyle.smaller]}>{time} ago</Text>
        <View style={ styles.notification }>
            <Text style={[styles.text, textStyle.smaller]}>You have just reserved a room, 
            <Text style={{ fontFamily: 'roboto-bold' }}> {roomName}</Text> on 
            <Text style={{ fontFamily: 'roboto-bold' }}> {street}</Text>!
            </Text>
        </View>
      </View>
    );
  } else if (type === 'missed_call') {
    component = (
      <View style={ styles.container }>
        <Text style={[styles.time, textStyle.smaller]}>{time} ago</Text>
        <View style={ styles.notification }>
            <Text style={[styles.text, textStyle.smaller]}>Missed call from,
            <Text style={{ fontFamily: 'roboto-bold' }}> {user}.</Text>
            </Text>
            <Text style={[styles.text, styles.clickableText]} onPress={()=> someAction()}>Call them back?</Text>
        </View>
      </View>
    );
  } else if (type === 'removed_listing') {
    component = (
      <View style={ styles.container }>
        <Text style={[styles.time, textStyle.smaller]}>{time} ago</Text>
        <TouchableOpacity style={ styles.notification }>
            <Text style={[styles.text, textStyle.smaller]}>Room named
            <Text style={{ fontFamily: 'roboto-bold' }}> {roomName} </Text> 
            that you had reservation for has just been removed.</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return component;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  notification: {
    justifyContent: 'flex-start',
    width: 330,
    borderRadius: 20,
    backgroundColor: colors.lightGrey,
    shadowColor: colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,  
    elevation: 3
  },
  time: {
    paddingLeft: 10,
    paddingBottom: 3,
    color: colors.grey
  },
  text: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 15,
    paddingTop: 15,
    color: colors.black,
    flexWrap: 'wrap'
  },
  clickableText: {
    color: colors.blue,
    textDecorationLine: 'underline',
    fontFamily: 'roboto-bold'
  }
});

export default Notification;