import React, { useState } from "react";
import { ScrollView, FlatList, StyleSheet, SafeAreaView, View, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import { getValueFor } from "../SecureStore";

import colors from '../styles/colors';
import textStyle from "../styles/text";

import ProfileIcon from "../components/Profile";
import Listing from "../components/Listing";

// const getRooms = async () => {
//   try {
//   	const token = await getValueFor('bearer');
//     console.log(token);

//     let requestHeaders = new Headers();
//     requestHeaders.append('Accept', 'application/json');

//     let auth = ('Bearer ' + token).replace(/"/g, '');
//     requestHeaders.append('Authorization', auth);

//     console.log(auth);

//     const response = await fetch('https://mtaa-backend.herokuapp.com/rooms', {
//         method: 'GET',
//         headers: requestHeaders
//     });
//     const json = await response.json();
//     alert(response.status);
//     console.log(json);
// 	} catch (error) {
// 			console.error(error);
// 	}
// 	//return 
// }

const data = [
	{
		_id: 'aaaaaa',
		roomName: 'Room 1',
		info: 'Very nice room',
		numSeats: 12,
		amenities: ['whiteboard', 'etherner'],
		image: require('../assets/images/room1.jpg')
	},
	{
		_id: 'bbbbbb',
		roomName: 'Room 2',
		info: 'Also a very nice room',
		numSeats: 6,
		amenities: ['whiteboard'],
		image: require('../assets/images/room2.jpg')
	},
	{
		_id: 'cccccc',
		roomName: 'Room 3',
		info: 'Also a very nice room',
		numSeats: 15,
		amenities: ['whiteboard', 'projector'],
		image: require('../assets/images/room3.jpg')
	}
]

export default function HomeScreen({ navigation }) {
	const [selectedId, setSelectedId] = useState(null);
	console.log(selectedId)

	const renderItem = ({ item }) => (
		<View style={styles.listing}>
			<Listing 
				roomName={item.roomName}
				image={item.image}
				info={item.info}
				numSeats={item.numSeats}
				amenities={item.amenities.join(', ')} 
				buttonTitle='View'
				buttonAction={() => { navigation.navigate('Room', { _id: item._id, name: item.roomName })}} 
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
					<ProfileIcon image={require('../assets/images/Avatar.png')} action={() => {navigation.navigate('Profile')}}/> 
				</View>
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={item => item._id}
					style={styles.listingContainer}
				/>
			</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
	header: {
		width: 330,
		height: 65,
		marginRight: 30,
		marginLeft: 30,
		marginTop: 24,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	heading: {
		color: colors.black
	},
	subHeading: {
		color: colors.grey
	},
	listingContainer: {
		marginTop: 24,
		marginLeft: 30,
	},
	listing: {
		marginBottom: 20,
	}
});