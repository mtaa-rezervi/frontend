import { Image, View } from 'react-native';

// Placeholder for empty list
export default function EmptyList(style) {
  return (
    <View style={style}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ width: 300, height: 300, marginTop: 100 }} source={require('../../assets/images/empty.png')} />
      </View>
    </View>
  );
}