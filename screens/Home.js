import React from "react";
import { StyleSheet, SafeAreaView, View, Text} from "react-native";

import { getValueFor } from "../SecureStore";

import colors from '../styles/colors';

function HomeScreen({ navigation }) {
    const getRooms = async () => {
        
        try {
            
            const token = await getValueFor('bearer');
            console.log(token);

            let requestHeaders = new Headers();
            requestHeaders.append('Accept', 'application/json');

            let auth = ('Bearer ' + token).replace(/"/g, '');
            requestHeaders.append('Authorization', auth);

            console.log(auth);

            const response = await fetch('https://mtaa-backend.herokuapp.com/rooms', {
                method: 'GET',
                headers: requestHeaders
            });
            const json = await response.json();
            alert(response.status);
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Text>
                Homescreen
            </Text>
            <Text onPress={() => navigation.navigate('Login')}>
                Logout
            </Text>
            <Text>
                ----------------------------------------
            </Text>
            <Text onPress={() => getRooms()}>
                get rooms
            </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white
    }
});

export default HomeScreen;