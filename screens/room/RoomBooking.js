import { StyleSheet, Text, SafeAreaView, View, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import Moment from 'moment';

import Input from '../../components/Input';
import StandardButton from '../../components/buttons/StandardButton';
import BackButton from '../../components/buttons/BackButton';

import textStyle from '../../styles/text';
import colors from '../../styles/colors';

import { loadSecure } from '../../utils/secureStore';


export default function RoomBooking({ navigation, route }) {

  const isFocused = useIsFocused();
  const [meetingName, setMeetingName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeFrom, setSelectedTimeFrom] = useState('');
  const [selectedTimeUntil, setSelectedTimeUntil] = useState('');

  // shows confirmation alert after pressing the confirm button
    const showSubmitAlert = () => {
      Alert.alert(
        'Confirmation',
        'Do you really want to submit this booking?',
        [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            onPress: () => submitBooking()
          }
        ]
      )
    }

  // submits the booking and creates the reservation
  const submitBooking = async () => {
    const userID = (await loadSecure()).userID;
    const auth = (await loadSecure()).auth;

    let day = Moment(selectedDate).format('YYYY-MM-DD');
    let timeFrom = Moment(selectedTimeFrom).format('HH:mm');
    let timeUntil = Moment(selectedTimeUntil).format('HH:mm');
    
    let timeFromISO = day + "T" + timeFrom + ":00+02:00";
    let timeUntilISO = day + "T" + timeUntil + ":00+02:00";

    try {
      const response = await fetch(`https://mtaa-backend.herokuapp.com/reservations`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': auth
        },
        body: JSON.stringify({
          room_id: route.params._id,
          user_id: userID,
          reserved_from: timeFromISO,
          reserved_to: timeUntilISO
        })
      });

      const json = await response.json();

      if(response.status == 201){
        Alert.alert(
          'Success',
          'Reservation was created.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Profile')
            }
          ]
        )
      }
      else if(response.status == 409){
        Alert.alert(
          'Error',
          json.error.message,
          [{
            text: 'OK'
          }]
        )
      }
      else if( response.status == 422){
        var errorMessage = "";        
        for(const err of json.errors){
          errorMessage += `${err.message}\n`;
        }

        Alert.alert(
        'Error',
        errorMessage,
        [{
          text: 'OK'
        }]
        )
      }
      else{
        alert(`Error occurred (${response.status})`);
      }
    }catch(error){
      console.error(error);
    }
    }

  const setDateTime = () => {
    //console.log("room: " + route.params._id);
    
    var today  = Moment().format();
    setSelectedDate(today);
    setSelectedTimeFrom(today);
    setSelectedTimeUntil(today);

    if(route.params.day){
      setSelectedDate(route.params.day);
    }
    if(route.params.timeFrom){
      setSelectedTimeFrom(route.params.timeFrom);
    }
    if(route.params.timeUntil){
      setSelectedTimeUntil(route.params.timeUntil);
    }
  };

  useEffect(() => {
    setDateTime();
  }, [isFocused]);

    return(
      <SafeAreaView>
        <BackButton action={() => navigation.goBack()}/>
          <View style={styles.container}>
            <Text style={[textStyle.h1, styles.header]}>Room booking</Text>

            <View style={styles.dateTimeTitlesRow}>
                <Text style={[styles.dateTimeItem, textStyle.h2]}>Date</Text>
                <Text style={[styles.dateTimeItem, textStyle.h2]}>Time</Text>
            </View>           
            <View style={styles.dateTimeValuesRow}>
                <Text style={[textStyle.h3, styles.currentDate]}>{Moment(selectedDate).format('DD.MM.YYYY')}</Text>
                <Text style={[textStyle.h3, styles.currentDate]}>{`${Moment(selectedTimeFrom).format('HH:mm')} - ${Moment(selectedTimeUntil).format('HH:mm')}`}</Text>
            </View>
            <StandardButton
                title={'Change time'}
                action={() => navigation.navigate('SelectTime', {_id: route.params._id, name: route.params.name, parent: 'RoomBooking'})}
                style={styles.changeTimeButton}
            />

            <Text style={[textStyle.h2, styles.meeting]}>Name of the meeting</Text>
            <Input
                placeholder={'Team meeting'}
                value={meetingName}
                onChangeText={text => setMeetingName(text)}
                style={styles.input}
            />
        
            <Text style={textStyle.h2}>E-mail notification</Text>
            <View style={styles.emailsContainer}>
              <ScrollView></ScrollView>
            </View>
            
            
            <StandardButton
                title={'Confirm'}
                action={() => showSubmitAlert()}
                style={styles.submitButton}
            />
          </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    //marginLeft: 30,
    alignSelf: 'center',
    width: 330,
  },
  changeTimeButton: {
    marginTop: 19,
    alignSelf: 'center'
  },
  submitButton: {
    marginTop: 20
  },
  input: {
    paddingBottom: 20,
    marginTop: 5
  },
  emailsContainer: {
    backgroundColor: colors.lightBlue,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 330,
    height: 150
  },
  dateTimeTitlesRow: {
    marginTop: 27,
    flexDirection: 'row',
  },
  dateTimeValuesRow: {
    marginTop: 7,
    flexDirection: 'row',
  },
  dateTimeItem: {
    width: 133
  },
  currentDate: {
    color: colors.grey,
    width: 133,
  },
  meeting: {
    marginTop: 38
  }
});