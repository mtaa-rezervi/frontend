import React, { useState } from 'react';
import { TouchableOpacity, Alert, ActivityIndicator, ScrollView, FlatList, StyleSheet, SafeAreaView, View, Text, Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { loadSecure } from '../utils/secureStore';
import { getRequestHeaders } from '../utils/api';
import { Feather } from '@expo/vector-icons'; 

import colors from '../styles/colors';
import textStyle from '../styles/text';

import BackButton from '../components/BackButton';
import StandardButton from '../components/StandardButton';
import Input from '../components/Input';
import Tag from '../components/Tag';

// Ask for camera permissions
const cameraPermissions = async () => {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
  }
};

export default function RoomCreation({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [roomName, setRoomName] = useState('');
  const [numberOfSeats, setNumberOfSeats] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [floor, setFloor] = useState('');
  const [description, setDescription] = useState('');

  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [amenities, setAmenities] = useState([]);

  const [images, setImage] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const createRoomDialog = () => {
    return (
      Alert.alert('New listing', `Do you want to create this listing?`, [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => { setLoading(true); createRoom() }},
      ])
    )
  };  

  // Create a new room in the database
  const createRoom = async () => {
    const userID = (await loadSecure()).userID;
    const requestHeaders = await getRequestHeaders();

    let formData = new FormData();
    formData.append('thumbnail', thumbnail);
    for (let i = 0; i < images.length; i++) {
      formData.append('images',  images[i]);
    }
    formData.append('json',
      JSON.stringify({
        name: roomName,
        floor: Number(floor),
        room_number: Number(roomNumber),
        info: description,
        street: street,
        city: city,
        state: state, 
        zip: zip,
        owner_id: userID,
        number_of_seats: numberOfSeats,
        amenities: amenities,
      })
    );

    try {
      const response = await fetch('https://mtaa-backend.herokuapp.com/rooms', {
        method: 'POST',
        headers: requestHeaders,
        body: formData
      });
      const responseJson = await response.json();
      //console.log(responseJson);
      if (response.status === 201) Alert.alert('Successfully created new room!');
      else if (response.status === 422) Alert.alert(responseJson.errors[0].message);
    } catch (error) {
      console.error(error);
      Alert.alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Add new amenity
  const selectAmenity = (amenity) => {
    amenities.includes(amenity) ? 
      setAmenities(amenities.filter(a => (a !== amenity))) :
      setAmenities([...amenities, amenity])
  };

  // Select image from camera roll
  const selectImage = async () => {
    await cameraPermissions();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: true,
      quality: 1,
    });

    let image = null;

    if (!result.cancelled) {
      const uri = result.uri;
      const uriParts = uri.split('.');
      const filename = uri.split('/').pop();
      const type = `image/${uriParts[uriParts.length - 1]}`;
      image = {
        uri: uri,
        name: filename,
        type: type
      };
    }

    return image;
  };

  // Add selected image as thumbnail
  const pickThumbnail = async () => {
    let image = await selectImage();
    if (image === null) return;
    setThumbnail(image);
  };
  
  // Add selected image to other images
  const pickImage = async () => {
    let image = await selectImage();
    if (image === null) return;
    setImage([...images, image]);
  };

  // Render item (image) for FlatList
  const renderImage = ({ item }) => (
    <View>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <View style={{position: 'absolute', opacity: 0.8, alignSelf: 'flex-end', paddingRight: 30, paddingTop: 10}}>
      {/* setAmenities(amenities.filter(a => (a !== amenity))) */}
        <TouchableOpacity style={styles.removeButton} 
          onPress={ () => setImage(images.filter(i => (i !== item))) }
        >
          <Feather name='x' size={20} color={colors.black}  />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton action={() => navigation.goBack()}/>
        <Text style={[textStyle.h1, styles.heading]}>Create listing</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* General information */}
        <Text style={[styles.subheading, textStyle.h2]}>General information</Text>
        <View style={styles.inputHorizontal} >
          <Input placeholder='Room name'
            value={roomName} 
            onChangeText={text => setRoomName(text)}
            width={160} 
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10, width: 160 }}>
            <Input placeholder='Num' 
              value={numberOfSeats}
              onChangeText={text => setNumberOfSeats(text)}
              width={108}
            />
            <Text style={[textStyle.small, { marginLeft: 10}]}>seats</Text>
          </View>
        </View>
        <View style={styles.inputHorizontal} >
          <Input placeholder='Room number' 
            value={roomNumber}
            onChangeText={text => setRoomNumber(text)}
            width={160} 
          />
          <Input style={{ marginLeft: 10 }}
            placeholder='Floor' 
            value={floor}
            onChangeText={text => setFloor(text)}
            width={160} 
          />
        </View>
        <Input style={{marginBottom: 10, alignSelf: 'center'}}
          placeholder='Some description of the room'
          value={description} 
          onChangeText={text => setDescription(text)}
        />
        {/* Address */}
        <Text style={[styles.subheading, textStyle.h2]}>General information</Text>
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
        {/* Thumbnail */}
        <Text style={[styles.subheading, textStyle.h2]}>Thumbnail</Text>
        { thumbnail === null ? 
          <>
            <View style={styles.singleImage}/>
            <Button style={styles.button} title="Pick an image from camera roll" onPress={pickThumbnail} />   
          </> :
          <>
            <Image source={{ uri: thumbnail.uri }} style={styles.singleImage} />
            <Button style={styles.button} title="Pick another image from camera roll" onPress={pickThumbnail} /> 
          </>
        }
        {/* Other images */}
        <Text style={[styles.subheading, textStyle.h2]}>Other room images</Text>
        <FlatList
          data={images}
          horizontal
          renderItem={renderImage}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={
            <View style={[styles.image, { backgroundColor: colors.lightBlue}]}/>
          }
          contentContainerStyle={styles.imageContainer}
        />
        { images.length === 0 ? 
          <Button style={styles.button} title="Pick an image from camera roll" onPress={pickImage} />   :
          <Button style={styles.button} title="Pick another image from camera roll" onPress={pickImage} /> 
        }
        {/* Button */}
        <StandardButton style={{alignSelf: 'center', marginTop: 30 }} 
          title='List this room' 
          action={() => { createRoomDialog() }} 
        />
      </ScrollView>
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
		backgroundColor: colors.white,
	},
  header: {
    marginBottom: 10
  },
  heading: {
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  button: {
    alignSelf: 'center'
  },
  imageContainer: {
    paddingLeft: 50,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singleImage: {
    width: 310, 
    height: 150,
    borderRadius: 20,
    marginBottom: 8,
    alignSelf: 'center',
    backgroundColor: colors.lightBlue
  },
  image: {
    marginRight: 20,
    width: 310, 
    height: 150,
    borderRadius: 20
  },
  removeButton: {
    backgroundColor: colors.white, 
    borderRadius: 40, 
    width: 30, 
    height: 30, 
    alignItems: 'center', 
    justifyContent: 'center'
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