import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import { getValueFor } from '../utils/SecureStore';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import BackButton from '../components/BackButton';
import Input from '../components/Input';
import EditImageIcon from '../components/EditImageIcon';
import StandardButton from '../components/StandardButton';

export default function EditProfileScreen({ navigation }) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [profilePicURL, setProfilePicURL] = useState('')
  
  const getCredentials = async () => {
    const token = await getValueFor('bearer');
    const userID = await getValueFor('_id');

    let auth = ('Bearer ' + token).replace(/"/g, '');
    let userIdParam = userID.replace(/"/g, '');

    const response = await fetch(`https://mtaa-backend.herokuapp.com/users/${userIdParam}`, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
          'Authorization': auth
      }
    });

    const user = await response.json();

    
    setFirstName(user.name.first_name);
    setLastName(user.name.last_name);
    setUserName(user.credentials.username);
    setEmail(user.credentials.email);
    
    if(user.profile_pic){
      setProfilePicURL({uri: user.profile_pic});
    }
    else{
      let defaultPic = require('../assets/images/Avatar.png');
      setProfilePicURL(defaultPic);
    }
  }

  const saveCredentials = async () => {
    const token = await getValueFor('bearer');
    const userID = await getValueFor('_id');

    console.log(userID);

  }

  useEffect(() => {
		getCredentials();
	}, []);

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.header}>
        <View>
          <BackButton action={() => navigation.goBack()}/>
          <Text style={[textStyle.h1, styles.heading]}>Edit profile</Text>
        </View>
        <View style={styles.iconView}>
          <EditImageIcon
            image={profilePicURL}
            action={()=>{}}
            />
        </View>
      </View>

      <View style={styles.inputsContainer}>
        <View>
          <Input
              placeholder="First name"
              value={firstName}
              onChangeText={text => setFirstName(text)}
              />
        </View>

        <View>
          <Input
              placeholder="Last name"
              value={lastName}
              onChangeText={text => setLastName(text)}
              />
        </View>

        <View>
          <Input
              placeholder="Username"
              value={userName}
              onChangeText={text => setUserName(text)}
              />
        </View>

        <View>
          <Input
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              />
        </View>

        <View>
          <Input
              placeholder="New password"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              />
        </View>

        <View>
          <Input
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={true}
              />
        </View>
      </View>

      <View style={styles.saveButton}>
        <StandardButton
          title={'Save changes'}
          action={() => saveCredentials()}
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
    marginLeft: 30,
    justifyContent: 'space-evenly',
    height: 370,
  },
  iconView: {
    marginTop: 50
  },
  saveButton: {
    marginLeft: 30,
    marginTop: 60
  }
});