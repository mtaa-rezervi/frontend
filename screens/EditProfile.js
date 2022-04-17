import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, View, Alert } from 'react-native';
import { launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';

import { getRequestHeaders } from '../utils/api';
import { loadSecure } from '../utils/secureStore';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import BackButton from '../components/BackButton';
import Input from '../components/Input';
import EditImageIcon from '../components/EditImageIcon';
import StandardButton from '../components/StandardButton';

export default function EditProfileScreen({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePicURL, setProfilePicURL] = useState({})
  const [newProfilePic, setNewProfilePic] = useState(null);

  const getCredentials = async () => {
    
    const userIdParam =  (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();

    const response = await fetch(`https://mtaa-backend.herokuapp.com/users/${userIdParam}`, {
      method: 'GET',
      headers: requestHeaders
    });

    const user = await response.json();
    
    setFirstName(user.name.first_name);
    setLastName(user.name.last_name);
    setUserName(user.credentials.username);
    setEmail(user.credentials.email);
    
    let picURL = user.profile_pic ? { uri: user.profile_pic } : require('../assets/images/Avatar.png');
    setProfilePicURL({ pic: picURL });
  }

  const saveCredentials = async () => {

    if(password != confirmPassword){
      Alert.alert(
        'Error',
        'Passwords do not match.',
        [{
          text: 'OK'
        }]
      )
      return;
    }

    const data = new FormData();
    
    const credentials = {
      first_name: firstName,
      last_name: lastName,
      username: userName,
      email: email
    }
    if(password){
      credentials.password = password;
    }

    const jsonData = JSON.stringify(credentials);
    data.append('json', jsonData);

    if(newProfilePic){
      data.append('image', newProfilePic);
    }

    const userIdParam =  (await loadSecure()).userID;
    const auth = (await loadSecure()).auth;

    try {
      const response = await fetch(`https://mtaa-backend.herokuapp.com/users/${userIdParam}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': auth
        },
        body: data
      });
      const json = await response.json();

      if(response.status == 200){
        getCredentials();
        Alert.alert(
          'Success',
          'Profile updated successfully.',
          [{
            text: 'OK'
          }]
        )
      }
      else{
        var errorMessage = "";        
        for(const err of json.errors){
          errorMessage += `${err.message}\n`;
        }

        Alert.alert(
          'Error',
          errorMessage,
          [{
            text: 'OK'
          }]
        )
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const pickImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const uriParts = uri.split('.');
      const filename = uri.split('/').pop();
      const type = `image/${uriParts[uriParts.length - 1]}`;
      let image = {
        uri: uri,
        name: filename,
        type: type
      };

      setNewProfilePic(image);
      setProfilePicURL({ pic: { uri: uri } });
    }
  }

  useEffect(() => {
    getCredentials();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.header}>
        <View>
          <BackButton action={() => navigation.goBack()}/>
          <Text style={[textStyle.h1, styles.heading]}>Edit profile</Text>
        </View>
        <View style={styles.iconView}>
          <EditImageIcon
            image={profilePicURL.pic}
            action={() => pickImage()}
            />
        </View>
      </View>

      <View style={styles.inputsContainer}>
        <Input
            placeholder="First name"
            value={firstName}
            onChangeText={text => setFirstName(text)}
            />
        <Input
            placeholder="Last name"
            value={lastName}
            onChangeText={text => setLastName(text)}
            />
        <Input
            placeholder="Username"
            value={userName}
            onChangeText={text => setUserName(text)}
            />
        <Input
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        <Input
            placeholder="New password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            />
        <Input
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry={true}
            />
      </View>
      <StandardButton
        style={styles.saveButton}
        title={'Save changes'}
        action={() => {  setLoading(true); saveCredentials() }}
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
  heading: {
    marginLeft: 30
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 330
    //alignItems: 'center'
  },
  inputsContainer:{
    //marginLeft: 30,
    justifyContent: 'space-evenly',
    height: 388,
    flexDirection: 'column',
    alignItems: 'center'
  },
  iconView: {
    marginTop: 50
  },
  saveButton: {
    //marginLeft: 30,
    alignSelf: 'center',
    marginTop: 60
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