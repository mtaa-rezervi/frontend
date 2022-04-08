import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import textStyle from '../styles/text';

const Notification = ({ type, time, text, action }) => {
  let component;

  if (type === 'missed_call') {
    component = (
      <View style={ styles.container }>
        <Text style={[styles.time, textStyle.smaller]}>{time} ago</Text>
        <View style={ styles.notification }>
            <Text style={[styles.text, textStyle.smaller]}>{text}</Text>
            <Text style={[styles.text, styles.clickableText]} onPress={action}>Call them back?</Text>
        </View>
      </View>
    );
  } else {
    component = (
      <View style={ styles.container }>
        <Text style={[styles.time, textStyle.smaller]}>{time} ago</Text>
        <View style={ styles.notification }>
            <Text style={[styles.text, textStyle.smaller]}>{text}</Text>
        </View>
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
    fontFamily: 'roboto-bold',
  }
});

export default Notification;