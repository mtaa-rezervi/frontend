import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import colors from '../styles/colors';

import Input from "../components/Input";
import StandardButton from "../components/StandardButton";
import BackButton from "../components/BackButton";
import userLogin from "../utils/userLogin";

function RegisterScreen({ navigation }) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const sendRegistration = async (firstName, lastName, username, email, password) => {
    try {
      const response = await fetch('https://mtaa-backend.herokuapp.com/users/register', {      
      method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            username: username,
            email: email,
            password: password
          })
      });
      const json = await response.json();
      
      if(response.status == 201){
          console.log("account created");
          Alert.alert(
            'Success',
            'Account created successfully!',
            [{
              text: 'OK',
              onPress: async () => await userLogin(username, password, navigation)
            }]
          )
      }
      else if(response.status == 409){
        Alert.alert(
          'Error',  // title
          json.error.message, // text
          [{
            text: 'OK'  // button
          }]
        )
      }
      else{
        alert(`Error occurred (${response.status})`);
      }

    } catch (error) {
      console.error(error);
    }
  };

  let [fontsLoaded] = useFonts({
    'roboto-bold': require('../assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

    
  return (
    <SafeAreaView style={styles.container}>
      <BackButton action={() => navigation.goBack()}/>
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
            action={() => sendRegistration(firstName, lastName, username, email, password)}
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
  createAnAccount: {
    fontFamily: "roboto-bold",
    color: "#121212",
    fontSize: 33,
    height: 39,
    width: 294,
    //marginTop: 72,
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
    marginLeft: 45
  },
  button: {
    width: 330,
    height: 36,
    borderRadius: 10,
    marginTop: 10,
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
