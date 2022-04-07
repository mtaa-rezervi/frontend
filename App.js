import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import colors from './assets/colors/colors';

export default function App() {
  
  let [fontsLoaded] = useFonts({
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text_h1}>lalala</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text_h1: {
    fontFamily: 'roboto-bold',
    fontSize: 33,
  },
  text_h2: {
    fontFamily: 'roboto-bold',
    fontSize: 22,
  },
  text_h3: {
    fontFamily: 'roboto-bold',
    fontSize: 20,
  },
  text_small: {
    fontFamily: 'roboto-regular',
    fontSize: 18,
  },
  text_smaller: {
    fontFamily: 'roboto-regular',
    fontSize: 14,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
