import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from "react-native";

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import colors from '../styles/colors';
import textStyle from "../styles/text";

import Input from "../components/Input";
import StandardButton from "../components/StandardButton";
import BackButton from "../components/BackButton";
import userLogin from "../utils/userLogin";

function RegisterScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);

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
      
      if(response.status == 201) {
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
    } finally {
      setLoading(false);
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
      <View style={styles.header}>
        <BackButton action={() => navigation.goBack()}/>
        <Text style={[textStyle.h1, styles.heading]}>Create an account</Text>
      </View>
      <View style={styles.inputs}>
        <Input
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={text => setFirstName(text)}
        />
        <Input
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={text => setLastName(text)}
        />
        <Input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <Input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <Input
          style={styles.input}
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
      <StandardButton 
        style={styles.button}
        title='Register' 
        action={() => { setLoading(true); sendRegistration(firstName, lastName, username, email, password) }}
      />
      { isLoading && 
      <View style={styles.activityIndicator}>
        <ActivityIndicator size='large' />
      </View> }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    marginBottom: 10
  },
  heading: {
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputs: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70
  },
  input: {
    paddingBottom: 20
  },
  hasAccount: {
    top: 0,
    left: 0,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: colors.black,
    height: 17,
    width: 172
  },
  logIn: {
    top: 0,
    left: 165,
    position: "absolute",
    fontFamily: "roboto-regular",
    color: colors.blue,
    textDecorationLine: "underline"
  },
  hasAccountStack: {
    width: 202,
    height: 17,
    marginTop: 38,
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
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.white,
    opacity: 0.8
  }
});

export default RegisterScreen;
