import React, { useState, useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, TextInput } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { getValueFor } from "../utils/SecureStore";

import BackButton from '../components/BackButton';
import StandardButton from "../components/StandardButton";

import textStyle from '../styles/text';
import colors from '../styles/colors';

const SmallButton = ({ title, action }) => {
  return (
    <TouchableOpacity style={ styles.smallButton } onPress={action}>
      <Text style={[textStyle.small, { color: colors.white}]}>{ title || 'Button' }</Text>
    </TouchableOpacity>
)};

const ImageCarousel = ({ data }) => {
  const [index, setIndex] = React.useState(0)
  //let data = room.image_urls

  // When there are no images, render lightBlue rectangles
  if (data[0] == '') {
    data = [0, 1, 2]
  }

  const renderItem = ({ item }) => (
    typeof item === typeof 0 ? 
      <View style={[styles.image, {backgroundColor: colors.lightBlue}]}/> :
      <Image style={styles.image} source={{uri: item}}/>  
  );

  return (
    <View style={styles.carousel}>
      <Carousel
        layout={"stack"}
        data={data}
        sliderWidth={330}
        itemWidth={330}
        renderItem={renderItem}
        onSnapToItem={(index) => setIndex(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={index}
        dotStyle={styles.carouselDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
}

// TODO: - Check when is the room available 
//       - Needs to be changed in the backend aswel
/*
const checkVacancy = async (id, token) => {
  //const endpoint = 'https://mtaa-backend.herokuapp.com/rooms';
  const endpoint = 'http://192.168.1.194:3000/rooms';

  let requestHeaders = new Headers();
  requestHeaders.append('Accept', 'application/json');

  let auth = ('Bearer ' + token).replace(/"/g, '');
  requestHeaders.append('Authorization', auth);

  const today = new Date()
  let dateFrom;
  let dateTo;
  if (today.getHours() + 1 >= 20) {
    dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate()+1, 8).toISOString()
    dateTo = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate()+1, 9).toISOString()
  } else {
    dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate(), today.getHours()+1).toISOString()
    //dateTo = new Date(today.getFullYear(), today.getMonth(), today.getUTCDate()).toISOString()
  }
  const query = endpoint+`?vacant_from=${dateFrom}&vacant_to=${dateTo}`
  console.log(query)
};
*/

export default function RoomScreen({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [room, setData] = useState([]);

  const getRoom = async () => {
		try {
			const token = await getValueFor('bearer');
			//console.log(token);

			let requestHeaders = new Headers();
			requestHeaders.append('Accept', 'application/json');

			let auth = ('Bearer ' + token).replace(/"/g, '');
			requestHeaders.append('Authorization', auth);

      const endpoint = `https://mtaa-backend.herokuapp.com/rooms/${route.params._id}`;
      //checkVacancy(route.params._id, token)

			const response = await fetch(endpoint, {
				method: 'GET',
				headers: requestHeaders
			});

			const room = await response.json();
      room.address = `${room.address.street}, ${room.address.city} ${room.address.zip}, ${room.address.state}`
      room.image_urls.splice(0, 0, room.thumbnail_url)
			setData(room);
		} catch (error) {
				console.error(error);
				alert('Something went wrong');
		} finally {
      setLoading(false);
		}
	}

	useEffect(() => {
		getRoom();
	}, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading || room == null ? <ActivityIndicator size='large' style={styles.activityIndicator} /> : (
        <>
          <BackButton action={() => navigation.goBack()}/>
          <Text style={[textStyle.h1, styles.header]}>{route.params.name}</Text>
          <ImageCarousel data={room.image_urls} />
          <View style={styles.info}>
            <View style={styles.textContainer}>
              <Text style={[styles.heading, textStyle.h2]}>General information</Text>
              <Text style={[styles.text, textStyle.small]}>{room.info}</Text>
              <Text style={[styles.text, textStyle.small]}>{room.number_of_seats} seats</Text>
              <Text style={[styles.text, textStyle.small]}>{room.amenities.join(', ')}</Text>
            </View>
            <SmallButton title={'Call owner'} />
          </View>
          <View style={styles.address}>
            <Text style={[styles.heading, textStyle.h2]}>Address</Text>
            <Text style={[styles.text, textStyle.small]}>{room.address}</Text>
          </View>
          <View style={styles.available}>
            <Text style={[styles.heading, textStyle.h2]}>Available time</Text>
            <Text style={[styles.text, textStyle.small]}>Available today from 10:00</Text>
          </View>
          <View style={styles.button}>
            <StandardButton title={'Book this room '} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
  arrow: {
    marginLeft: 30
  },
  header: {
    marginTop: 8,
    marginLeft: 30
  },
  carousel: {
    marginTop: 11,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  carouselDot: {
    width: 7,
    height: 7,
    backgroundColor: colors.blue
  },
  image: {
    borderRadius: 20,
    width: 330,
    height: 206,
    alignSelf: 'center'
  },
  smallButton: {
    width: 129,
    backgroundColor: colors.blue,
    height: 49,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 200
  },
  heading: {
    marginBottom: 3
  },
  text: {
    marginBottom: 3,
    color: colors.grey,
    flexWrap: 'wrap'
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: 30, 
    marginLeft: 30
  },
  address: {
    width: 330,
    marginRight: 30, 
    marginLeft: 30,
    marginTop: 17,
  },
  available: {
    marginRight: 30, 
    marginLeft: 30,
    marginTop: 17,
    marginBottom: 30,
  },
  button: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 60,
    alignSelf: 'center'
  }
});
