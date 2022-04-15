import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

import colors from '../styles/colors';
import textStyle from '../styles/text';

export default function Notification({ type, time, text, action, style }) {
  let component;
  const timeElapsed = moment(time).fromNow();

  if (type === 'missed_call') {
    component = (
      <View style={style}>
        <View style={styles.container}>
          <Text style={[styles.time, textStyle.smaller]}>{timeElapsed}</Text>
          <View style={styles.notification}>
            <Text style={[styles.text, textStyle.small]}>{text}</Text>
            <Text style={[styles.text, textStyle.small, styles.clickableText]} onPress={action}>Call them back?</Text>
          </View>
        </View>
      </View>
    );
  } else {
    component = (
      <View style={style}>
        <View style={styles.container}>
          <Text style={[styles.time, textStyle.smaller]}>{timeElapsed}</Text>
          <View style={styles.notification}>
            <Text style={[styles.text, textStyle.small]}>{text}</Text>
          </View>
        </View>
      </View>
    );
  }

  return component;
}

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
