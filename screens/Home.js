import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, FlatList, StyleSheet, SafeAreaView, View, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getValueFor } from "../utils/SecureStore";

import colors from '../styles/colors';
import textStyle from "../styles/text";

import ProfileIcon from "../components/Profile";
import Listing from "../components/Listing";

// const data = [
// 	{
// 		_id: 'aaaaaa',
// 		roomName: 'Room 1',
// 		info: 'Very nice room',
// 		numSeats: 12,
// 		amenities: ['whiteboard', 'etherner'],
// 		thumbnail: require('../assets/images/room1.jpg')
// 	},
// 	{
// 		_id: 'bbbbbb',
// 		roomName: 'Room 2',
// 		info: 'Also a very nice room',
// 		numSeats: 6,
// 		amenities: ['whiteboard'],
// 		thumbnail: require('../assets/images/room2.jpg')
// 	},
// 	{
// 		_id: 'cccccc',
// 		roomName: 'Room 3',
// 		info: 'Also a very nice room',
// 		numSeats: 15,
// 		amenities: ['whiteboard', 'projector'],
// 		thumbnail: require('../assets/images/room3.jpg')
// 	}
// ]

let i = 0;

export default function HomeScreen({ navigation }) {
	// const [selectedId, setSelectedId] = useState(null);
	// console.log(selectedId)
	const [isLoading, setLoading] = useState(true);
  	const [rooms, setData] = useState([]);
  	const [profilePicURL, setProfilePicURL] = useState({});

	const getRooms = async () => {
		try {
			const token = await getValueFor('bearer');
			//console.log(token);

			let requestHeaders = new Headers();
			requestHeaders.append('Accept', 'application/json');

			let auth = ('Bearer ' + token).replace(/"/g, '');
			requestHeaders.append('Authorization', auth);
	
			const response = await fetch('https://mtaa-backend.herokuapp.com/rooms', {
				method: 'GET',
				headers: requestHeaders
			});

			const rooms = await response.json();
			setData(rooms);
		} catch (error) {
				console.error(error);
				alert('Something went wrong');
		} finally {
      setLoading(false);
		}
	}

	const getProfilePic = async () => {
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
		let picURL = user.profile_pic ? { uri: user.profile_pic } : require('../assets/images/Avatar.png');
  		
		setProfilePicURL({ pic: picURL });
	}

	useEffect(() => {
		getRooms();
		getProfilePic();
	}, []);

	//console.log(rooms)

	const renderItem = ({ item }) => (
		<View style={styles.listing}>
			<Listing 
				roomName={item.name}
				image={{uri: item.thumbnail_url}}
				info={item.info}
				numSeats={item.number_of_seats}
				amenities={item.amenities.join(', ')} 
				buttonTitle='View'
				buttonAction={() => { navigation.navigate('Room', { _id: item._id, name: item.name })}} 
			/>
		</View>
  );

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={styles.headerText}>
					<Text style={[styles.heading, textStyle.h1]}>Welcome</Text>
					<Text style={[styles.subHeading, textStyle.h2]}>Available today</Text>
				</View>
				<ProfileIcon image={profilePicURL.pic} action={() => {navigation.navigate('Profile')}}/> 
			</View>
			{isLoading || rooms == null ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
				<FlatList
					data={rooms}
					renderItem={renderItem}
					keyExtractor={item => item._id}
					contentContainerStyle={styles.listingContainer}
				/>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	header: {
		height: 65,
		marginRight: 30,
		marginLeft: 30,
		marginTop: 24,
		paddingBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	heading: {
		color: colors.black
	},
	subHeading: {
		color: colors.grey
	},
	listingContainer: {
		marginTop: 14,
		marginLeft: 30,
		marginRight: 30,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	listing: {
		marginBottom: 20,
	},
	activityIndicator: {
		flex: 1
	}
});