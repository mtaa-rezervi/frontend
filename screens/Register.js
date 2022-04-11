import React, { Component, useState } from "react";
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

import Input from "../components/Input";
import StandardButton from "../components/StandardButton";

function RegisterScreen({ navigation }) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

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
      
      <View style={styles.firstName}>
        <Input
            placeholder="First name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            />
      </View>

      <View style={styles.lastName}>
        <Input
            placeholder="Last name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            />
      </View>

      <View style={styles.username}>
        <Input
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            />
      </View>

      <View style={styles.email}>
        <Input
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            />
      </View>

      <View style={styles.email}>
        <Input
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            />
      </View>

      <View style={styles.hasAccountStack}>
        <Text style={styles.hasAccount}>Already have an account?</Text>
        <Text style={styles.logIn} onPress={() => navigation.navigate('Login')}>Log in</Text>
      </View>
      <View style={styles.button}>
          <StandardButton 
            title='Register'
          />
        </View>
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
