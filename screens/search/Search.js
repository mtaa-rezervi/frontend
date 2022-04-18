import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, SafeAreaView, View, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { loadSecure } from '../../utils/secureStore';
import { getRequestHeaders } from '../../utils/api';

import colors from '../../styles/colors';
import textStyle from '../../styles/text';

import StandardButton from '../../components/buttons/StandardButton';
import Input from '../../components/Input';
import Tag from '../../components/buttons/Tag';
import ProfileIcon from '../../components/buttons/Profile';

export default function SearchScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [profilePicURL, setProfilePicURL] = useState({});
  const [roomName, setRoomName] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [seatsGTE, setSeatsGTE] = useState('');
  const [seatsLTE, setSeatsLTE] = useState('');

  const [amenities, setAmenities] = useState([]);

  // Fetch and set user's profile picture
  const getProfilePic = async () => {
    const userIdParam =  (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();

    const response = await fetch(`https://mtaa-backend.herokuapp.com/users/${userIdParam}`, {
      method: 'GET',
      headers: requestHeaders
    });

    const user = await response.json();
    let picURL = user.profile_pic ? { uri: user.profile_pic } : require('../../assets/images/Avatar.png');
      
    setProfilePicURL({ pic: picURL });
  };

  // Generate search query
  const generateQuery = () => {
    let finalQuery = '?';
    let query = {};
    if (roomName !== '') query.name = roomName;
    if (seatsLTE !== '') query.num_of_seats_lte = seatsLTE;
    if (seatsGTE !== '') query.num_of_seats_gte = seatsGTE;
    if (city !== '') query.city = city;
    if (street !== '') query.street = street;
    if (state !== '') query.state = state;
    if (zip !== '') query.zip = zip;
    query = new URLSearchParams(query);

    let amenitiesParam = amenities.map((amenity) => `amenity[]=${amenity}`);
    const amenitiesQuery = amenitiesParam.join('&');

    finalQuery += query.toString();
    query.toString() !== '' && amenitiesQuery !== '' ? finalQuery += ('&' + amenitiesQuery) : finalQuery += amenitiesQuery;
    //console.log(finalQuery);

    return finalQuery;
  };

  // Add new amenity
  const selectAmenity = (amenity) => {
    amenities.includes(amenity) ? 
      setAmenities(amenities.filter(a => (a !== amenity))) :
      setAmenities([...amenities, amenity])
  };

  // Validate number of seats
  const validateSeats = () => {
    let validated = true;
    const seatsIntGTE = Number(seatsGTE);
    const seatsIntLTE = Number(seatsLTE);
    if (seatsGTE != '' && (isNaN(seatsIntGTE) || seatsIntGTE < 1)) {
      alert('Number of seats has to be atleast 1!');
      validated = false;
    } else if (seatsLTE != '' && (isNaN(seatsIntLTE) || seatsIntLTE < 1)) {
      alert('Number of seats has to be atleast 1!');
      validated = false;
    } 

    return validated;
  };

  useEffect(() => {
    getProfilePic();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={[styles.heading, textStyle.h1]}>Search</Text>
          <Text/>
        </View>
        <ProfileIcon image={profilePicURL.pic} action={() => {navigation.navigate('Profile')}}/> 
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Room name */}
        <Text style={[styles.subheading, textStyle.h2]}>Room name</Text>
        <Input style={{ marginBottom: 10, alignSelf: 'center' }}
          placeholder='Name of the room' 
          value={roomName}
          onChangeText={text => setRoomName(text)}
        />
        {/* Address */}
        <Text style={[styles.subheading, textStyle.h2]}>Address</Text>
        <Input style={{ marginBottom: 10, alignSelf: 'center' }}
          placeholder='City' 
          value={city}
          onChangeText={text => setCity(text)}
        />
        <Input style={{ marginBottom: 10, alignSelf: 'center' }}
          placeholder='Street'
          value={street}
          onChangeText={text => setStreet(text)}
        />
        <View style={styles.inputHorizontal} >
          <Input placeholder='State' 
            value={state}
            onChangeText={text => setState(text)}
            width={208} 
          />
          <Input style={{ marginLeft: 10 }}
            placeholder='Zip code'
            value={zip}
            onChangeText={text => setZip(text)}
            width={111} 
          />
        </View>
        {/* Amenities */}
        <Text style={[styles.subheading, textStyle.h2]}>Amenities</Text>
        <View style={styles.tagContainer}>
          <Tag style={styles.tag} title='projector' 
            action={() => selectAmenity('projector')} 
          />
          <Tag style={styles.tag} title='whiteboard' 
            action={() => selectAmenity('whiteboard')}
          />
          <Tag style={styles.tag} title='ac' 
            action={() => selectAmenity('ac')}
          /> 
        </View>
        <View style={styles.tagContainer}>
          <Tag style={styles.tag} title='ethernet' 
            action={() => selectAmenity('ethernet')}
          />
          <Tag style={styles.tag} title='wifi' 
            action={() => selectAmenity('wifi')}
          />
        </View>
        {/* Number of seats */}
        <Text style={[styles.subheading, textStyle.h2]}>Number of seats</Text>
        <View style={{ alignSelf: 'center', marginBottom: 5 }}>
          <View style={{ width: 330 ,flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, justifyContent: 'space-evenly' }}>
            <Text style={[textStyle.small, { marginRight: 16 }]}>from</Text>
            <Input placeholder='Num' 
              value={seatsGTE}
              onChangeText={text => setSeatsGTE(text)}
              width={100}
            />
            <Text style={[textStyle.small, { marginHorizontal: 16 }]}>to</Text>
            <Input placeholder='Num' 
              value={seatsLTE}
              onChangeText={text => setSeatsLTE(text)}
              width={100}
            />
          </View>
        </View>
        {/* Time and date */}
        <Text style={[styles.subheading, textStyle.h2]}>Time and date</Text>
        <StandardButton style={{ marginBottom: 10, alignSelf: 'center' }}
          title='Date selection' 
          action={() => { console.log('Date') }} 
        />
        <StandardButton style={{ marginBottom: 10, alignSelf: 'center' }}
          title='Time selection' 
          action={() => { console.log('Time') }} 
        />
        {/* Button */}
        <StandardButton style={{alignSelf: 'center', marginTop: 30, marginBottom: 30 }} 
          title='Search' 
          action={() => {
            if (validateSeats()) {
              navigation.navigate('SearchResults', { query: generateQuery() });
          }}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
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
  subheading: {
    marginLeft: 30,
    marginBottom: 10,
    marginTop: 8
  },
  inputHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginHorizontal: 30,
    marginBottom: 8
  },
  tag: {
    marginRight: 7
  },
});