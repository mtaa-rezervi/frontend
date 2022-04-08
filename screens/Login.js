import React, { useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Image, TextInput, Button, TouchableOpacity} from "react-native";

import { saveKeyValue } from "../SecureStore";

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import colors from '../styles/colors';


function LoginScreen({ navigation }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async (user, pass) => {
        try {
          const response = await fetch('https://mtaa-backend.herokuapp.com/users/login', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: user,
                  password: pass
              })
          });
          const json = await response.json();
          
          if(response.status == 200){
              

              console.log(json.token, typeof json.token);

              var storeKey = 'bearer';
              var storeValue = JSON.stringify(json.token);
              // store users jwt token
              if(json.token){
                saveKeyValue(storeKey, storeValue).catch(error => {
                    console.log(error);
                });
              }

              navigation.navigate('Home');
          }
          else if(response.status == 404){
              alert(json.error.message);
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
      
      <Text style={styles.title}>Welcome to Rezervi</Text>
      <Text style={styles.subtitle}>workspace reservation app</Text>
      <Image
        source={require("../assets/images/Meeting.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
      
      <TextInput
        placeholder="Username"
        style={styles.username}
        value={username}
        onChangeText={text => setUsername(text)}
        />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.password}
        value={password}
        onChangeText={text => setPassword(text)}
        />
      
        <View style={styles.loremIpsumRow}>
            <Text style={styles.loremIpsum}>Don&#39;t have an account yet?</Text>
            <Text style={styles.register} onPress={() => navigation.navigate('Register')}>Register</Text>
        </View>
        <TouchableOpacity
            style={styles.loginButton}
            onPress={ () => login(username, password) }>
            <Text style={styles.loginText}>
                Login
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loginButton: {
    width: 330,
    height: 36,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: "center",
    backgroundColor: colors.blue,
    justifyContent: "center"
  },
  loginText: {
    color: "#fff",
    fontSize: 14,
    height: 17,
    width: 55,
    textAlign: "center",
    alignSelf: "center"
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
    height: 48,
    width: 330,
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 10,
    marginTop: 53,
    alignSelf: "center",
    paddingLeft: 10
  },
  password: {
    height: 48,
    width: 330,
    backgroundColor: "rgba(235,235,235,1)",
    borderRadius: 10,
    marginTop: 24,
    alignSelf: "center",
    paddingLeft: 10
  },
  loremIpsum: {
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
  loremIpsumRow: {
    flexDirection: "row",
    marginTop: 70,
    marginLeft: 40
  }
});

export default LoginScreen;
