import React, { useState } from 'react'
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';

import { getValueFor } from '../utils/SecureStore';

import colors from '../styles/colors';
import textStyle from '../styles/text';

import BackButton from '../components/BackButton';
import Input from '../components/Input';
import EditImageIcon from '../components/EditImageIcon';
import StandardButton from '../components/StandardButton';

export default function EditProfileScreen({ navigation }) {

  const [firstName, setFirstName] = useState('first')
  const [lastName, setLastName] = useState('last')
  const [userName, setUserName] = useState('username')
  const [email, setEmail] = useState('email')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  
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

    setUserName(user.credentials.username);
    setFirstName(user.name.first_name);
    setLastName(user.name.last_name);
  }

  const saveCredentials = async () => {
    const token = await getValueFor('bearer');
    const userID = await getValueFor('_id');

    console.log(userID);

  }

  return (
    <SafeAreaView style={styles.container}>


      <View style={styles.header}>
        <View>
          <BackButton action={() => navigation.goBack()}/>
          <Text style={[textStyle.h1, styles.heading]}>Edit profile</Text>
        </View>
        <View style={styles.iconView}>
          <EditImageIcon
            image={require('../assets/images/Avatar.png')}
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
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              />
        </View>

        <View>
          <Input
              placeholder="Confirm password"
              onChangeText={text => setNewPassword(text)}
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