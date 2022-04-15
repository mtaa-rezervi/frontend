import { StyleSheet, Text, SafeAreaView, View, ScrollView, Alert } from 'react-native';
import { useState } from 'react';


import Input from '../components/Input';
import StandardButton from '../components/StandardButton';
import BackButton from '../components/BackButton';

import textStyle from '../styles/text';
import colors from '../styles/colors';

export default function RoomBooking({ navigation, route }) {

    const [displayDate, setDisplayDate] = useState('');
    const [displayTime, setDisplayTime] = useState('');
    const [meetingName, setMeetingName] = useState('');
		const [selectedDate, setSelectedDate] = useState('3.2.2022');
		const [selectedTime, setSelectedTime] = useState('13:30 - 14:30');

    const submitBooking = () => {
        console.log('submit booking pressed');
    }

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
									<Text style={[textStyle.h3, styles.currentDate]}>{selectedDate}</Text>
									<Text style={[textStyle.h3, styles.currentDate]}>{selectedTime}</Text>
							</View>
							<StandardButton
									title={'Change time'}
									action={() => {console.log('change time pressed')}}
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
		marginLeft: 30,
		width: 330,
		//justifyContent: 'center',
		//alignSelf: 'center'
	},
	changeTimeButton: {
		//marginLeft: 30,
		//marginRight: 30,
		marginTop: 19,
		alignSelf: 'center'
	},
	submitButton: {
		marginTop: 20
	},
	header: {
		//marginLeft: 30
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
		//marginLeft: 30,
		marginTop: 27,
		flexDirection: 'row',
	},
	dateTimeValuesRow: {
		//marginLeft: 30,
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