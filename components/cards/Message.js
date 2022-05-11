import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';

import colors from '../../styles/colors';
import textStyle from '../../styles/text';

export default function Message({ time, text, color, style }) {
  const timeElapsed = moment(time).fromNow();

  return (
    <View style={style}>
      <View style={styles.container}>
        <Text style={[styles.time, textStyle.smaller]}>{timeElapsed}</Text>
        <View style={[styles.message, { backgroundColor: color }]}>
          <Text style={[styles.text, textStyle.small]}>{text}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  message: {
    justifyContent: 'flex-start',
    width: 330,
    borderRadius: 20,
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
});
