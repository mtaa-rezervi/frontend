import { Image, View, Text } from 'react-native';

import textStyle from '../../styles/text';
import colors from '../../styles/colors';

// Placeholder for empty list
export default function EmptyList({ style, text }) {
  return (
    <View style={style}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 300, height: 300, marginTop: 50 }} source={require('../../assets/images/empty.png')} />
        <Text style={[textStyle.h3, { color: colors.grey, marginTop: 10 }]}>{text}</Text>
      </View>
    </View>
  );
}