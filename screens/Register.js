import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView
} from "react-native";

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import colors from '../styles/colors';

function RegisterScreen({ navigation }) {

    let [fontsLoaded] = useFonts({
        'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
    });

    if (!fontsLoaded) {
    return <AppLoading />;
    }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.createAnAccount}>Create an account</Text>

      <TextInput placeholder="First name" style={styles.firstName}></TextInput>
      <TextInput placeholder="Last name" style={styles.lastName}></TextInput>
      <TextInput placeholder="Username" style={styles.username}></TextInput>
      <TextInput placeholder="Email" style={styles.email}></TextInput>
      <TextInput placeholder="Password" style={styles.password}></TextInput>
      <View style={styles.hasAccountStack}>
        <Text style={styles.hasAccount}>Already have an account?</Text>
        <Text style={styles.logIn} onPress={() => navigation.navigate('Login')}>Log in</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.register}>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  createAnAccount: {
    fontFamily: "roboto-bold",
    color: "#121212",
    fontSize: 33,
    height: 39,
    width: 294,
    marginTop: 72,
    marginLeft: 30
  },
  firstName: {
    fontFamily: "roboto-regular",
    color: "rgba(151,151,151,1)",
    height: 48,
    width: 330,
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 10,
    marginTop: 80,
    marginLeft: 23,
    paddingLeft: 10
  },
  lastName: {
    fontFamily: "roboto-regular",
    color: "rgba(151,151,151,1)",
    height: 48,
    width: 330,
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 23,
    paddingLeft: 10
  },
  username: {
    fontFamily: "roboto-regular",
    color: "rgba(151,151,151,1)",
    height: 48,
    width: 330,
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 23,
    paddingLeft: 10
  },
  email: {
    fontFamily: "roboto-regular",
    color: "rgba(151,151,151,1)",
    height: 48,
    width: 330,
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 23,
    paddingLeft: 10
  },
  password: {
    fontFamily: "roboto-regular",
    color: "rgba(151,151,151,1)",
    height: 48,
    width: 330,
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 10,
    marginTop: 15,
    marginLeft: 23,
    paddingLeft: 10
  },
  hasAccount: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 17,
    width: 172
  },
  logIn: {
    top: 0,
    left: 165,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: "rgba(54,110,255,1)",
    textDecorationLine: "underline"
  },
  hasAccountStack: {
    width: 202,
    height: 17,
    marginTop: 80,
    marginLeft: 40
  },
  button: {
    width: 330,
    height: 36,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "center",
    backgroundColor: colors.blue,
    justifyContent: "center"
  },
  register: {
    color: "#fff",
    fontSize: 14,
    height: 17,
    width: 55,
    textAlign: "center",
    alignSelf: "center"
  }
});

export default RegisterScreen;
