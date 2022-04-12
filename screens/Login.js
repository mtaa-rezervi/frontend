import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image } from "react-native";
import { saveKeyValue } from "../utils/SecureStore";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import Input from "../components/Input";
import StandardButton from "../components/StandardButton";

import colors from '../styles/colors';
import userLogin from "../utils/userLogin";

export default function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    
    let [fontsLoaded] = useFonts({
        'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
    });

    if (!fontsLoaded) return <AppLoading />;

    return (
    <SafeAreaView style={styles.container}>      
      <Text style={styles.title}>Welcome to Rezervi</Text>
      <Text style={styles.subtitle}>workspace reservation app</Text>
      <Image
        source={require("../assets/images/Meeting.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <View style={styles.username}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          />
      </View>
      <View style={styles.password}>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Don&#39;t have an account yet?</Text>
            <Text style={styles.register} onPress={() => navigation.navigate('Register')}>Register</Text>
        </View>
        <View style={styles.loginButton}>
          <StandardButton 
            title='Login' 
            action={() => userLogin(username, password, navigation)}
          />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  loginButton: {
    marginTop: 5,
    alignSelf: "center",
  },
  title: {
    fontFamily: "roboto-bold",
    color: colors.blue,
    fontSize: 33,
    marginTop: 30,
    marginLeft: 30
  },
  subtitle: {
    fontFamily: "roboto-bold",
    color: "rgba(151,151,151,1)",
    fontSize: 20,
    marginTop: 2,
    marginLeft: 30
  },
  image: {
    width: 189,
    height: 163,
    marginTop: 54,
    marginLeft: 93
  },
  username: {
    marginTop: 53,
    alignSelf: "center",
  },
  password: {
    marginTop: 20,
    alignSelf: "center",
  },
  bottomText: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 17,
    width: 172
  },
  register: {
    fontFamily: "roboto-regular",
    color: "rgba(54,110,255,1)",
    textDecorationLine: "underline"
  },
  bottomTextContainer: {
    flexDirection: "row",
    marginTop: 70,
    marginLeft: 40
  }
});
