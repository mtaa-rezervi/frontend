import React, { useState, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, SafeAreaView, View, Text, TouchableOpacity} from "react-native";

import { getRequestHeaders, getProfilePic } from '../../utils/api';
import { getValueFor } from '../../utils/secureStore';

import colors from '../../styles/colors';
import textStyle from "../../styles/text";
import { SERVER_URL } from '../../constants';

import ProfileIcon from "../../components/buttons/Profile";
import Listing from "../../components/cards/Listing";
import { useIsFocused } from "@react-navigation/native";


export default function ContactScreen({ navigation }) {

    const isFocused = useIsFocused();
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isRefreshing, setRefreshing] = useState(false);


    useEffect(() => {
        getUsers();
      }, [isFocused]);

    const onRefresh = () => {
        setRefreshing(true);
        getUsers();
    };

    const getUsers = async () => {
        const requestHeaders = await getRequestHeaders();
        const userIDvalue = await getValueFor('_id');
        const userID = userIDvalue.replace(/['"]+/g, '');

        try {
            const endpoint = SERVER_URL + '/users/all';

            const response = await fetch(endpoint, {
                method: 'GET',
                headers: requestHeaders
            });

            const users = await response.json();
            //console.log(users);

            const otherUsers = []
            for( const user of users){
                if(String(user._id) != userID){
                    otherUsers.push(user);
                }
            }

            setUsers(otherUsers);
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };
   

    const renderUsers = ({ item }) => (
        <View>
        <TouchableOpacity
            style={styles.mainProfileButton}
            onPress={() => navigation.navigate('ChatScreenTest', { _id: item._id, username: item.credentials.username })}>
            
            <View style={styles.pfpWrapper}>
                <ProfileIcon
                    image={(item.profile_pic ? {uri: item.profile_pic} : require('../../assets/images/Avatar.png'))}
                />
            </View>
            <View style={{flexDirection: 'column'}}>
            <Text style={[styles.buttonText, textStyle.h2]}>{item.name.first_name} {item.name.last_name}</Text>
            <Text style={[styles.subtitle, textStyle.h3]}>{item.credentials.username}</Text>
            </View>
        </TouchableOpacity>
        </View>
    );


    return(
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={textStyle.h1}>Users</Text>
            </View>
            <FlatList
                data={users}
                renderItem={renderUsers}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.userContainer}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    pfpWrapper:{
        marginLeft: 20,
        marginRight: 30

    },
    mainProfileButton: {
        width: 330,
        height: 83,
        backgroundColor: colors.lightBlue,
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      },
      buttonText: {
        color: colors.black,
      },
      subtitle: {
        color: colors.grey,
      },
    header: {
        height: 65,
        marginRight: 30,
        marginLeft: 30,
        marginTop: 24,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
      },
    user: {
        alignContent:"center",
        backgroundColor: colors.lightBlue,
    },
    userContainer: {
        marginTop: 14,
        marginLeft: 30,
        marginRight: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: "space-between"
    }
});