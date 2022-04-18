import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, SafeAreaView, View, Text, Image } from "react-native";

import Input from "../../components/Input";
import StandardButton from "../../components/buttons/StandardButton";

import colors from '../../styles/colors';
import userLogin from "../../utils/userLogin";

export default function LoginScreen({ navigation }) {
    const [isLoading, setLoading] = useState(false);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
    <SafeAreaView style={styles.container}>      
      <Text style={styles.title}>Welcome to Rezervi</Text>
      <Text style={styles.subtitle}>workspace reservation app</Text>
      <Image
        source={require("../../assets/images/Meeting.png")}
        resizeMode="contain"
        style={styles.image}
      />
      <Input
        style={styles.username}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
        /> 
      <Input
        style={styles.password}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
        />
        <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Don&#39;t have an account yet?</Text>
            <Text style={styles.register} onPress={() => navigation.navigate('Register')}>Register</Text>
        </View>
        <StandardButton 
          style={styles.loginButton}
          title='Login' 
          action={ async () => {
            setLoading(true);
            try {
              await userLogin(username, password, navigation);
            } catch (error) {
              alert('Something went wrong');
            } finally {
              setLoading(false);
            }
          }}
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
