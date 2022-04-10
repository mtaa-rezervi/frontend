import React, { useState, useEffect } from "react";
import { ActivityIndicator, ScrollView, FlatList, StyleSheet, SafeAreaView, View, Text} from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getValueFor } from "../utils/SecureStore";

import colors from '../styles/colors';
import textStyle from "../styles/text";

import ProfileIcon from "../components/Profile";
import Listing from "../components/Listing";

export default function HomeScreen({ navigation }) {
	// const [selectedId, setSelectedId] = useState(null);
	// console.log(selectedId)
	const [isLoading, setLoading] = useState(true);
  const [rooms, setData] = useState([]);

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

	useEffect(() => {
		getRooms();
	}, []);

	const renderItem = ({ item }) => (
		<View style={styles.listing}>
			<Listing 
				roomName={item.name}
				image={{uri: item.thumbnail_url}}
				info={item.info}
				numSeats={item.number_of_seats}
				amenities={item.amenities.join(', ')} 
				buttonTitle='View'
				buttonAction={() => { 
					navigation.navigate('Room', { _id: item._id, name: item.name })
				}} 
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