import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity} from "react-native";
import BackButton from "../components/BackButton";
import React, { useState } from 'react';

import Moment from "moment";

import DateTimePicker from '@react-native-community/datetimepicker';

import textStyle from "../styles/text";
import colors from "../styles/colors";
import StandardButton from "../components/StandardButton";

export default function SelectTime({ navigation, route }) {
    
    const SmallButton = ({ title, action }) => {
        return (
          <TouchableOpacity style={ styles.smallButton } onPress={action}>
            <Text style={[textStyle.small, { color: colors.white}]}>{ title || 'Button' }</Text>
          </TouchableOpacity>
        )
    };
    
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
    const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date().toISOString());
    const [selectedTimeUntil, setSelectedTimeUntil] = useState(new Date().toISOString());

    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [viewTimeFrom, setViewTimeFrom] = useState(false);
    const [viewTimeUntil, setViewTimeUntil] = useState(false);

    const setDay = (event, date) => {
        var day = Moment(date).format();
        setSelectedDate(day);
        setDayModalVisible(false);
    };

    const setTimeFrom = (event, date) => {
        var timeFrom = Moment(date).format();
        setSelectedTimeFrom(timeFrom);
        setViewTimeFrom(false);
    };

    const setTimeUntil = (event, date) => {
        var timeUntil = Moment(date).format();
        setSelectedTimeUntil(timeUntil);
        setViewTimeUntil(false);
    };

    return(
        <SafeAreaView>
            <BackButton action={() => navigation.goBack()}/>
			<View style={styles.container}>
				<Text style={[textStyle.h1, styles.header]}>Select time</Text>
            </View>

            {React.useMemo(() => {
                return dayModalVisible && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        minimumDate={new Date()}
                        is24Hour={true}
                        onChange={(event, date) => {
                            setDay(event, date)
                        }}
                />)
            }, [dayModalVisible])}            

            {React.useMemo(() => {
                return viewTimeFrom && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        onChange={(event, date) => {
                            setTimeFrom(event, date)
                        }}
                />)
            }, [viewTimeFrom])}
            
            
            {React.useMemo(() => {
                return viewTimeUntil && (
                    <DateTimePicker
                        value={new Date()}
                        mode="time"
                        is24Hour={true}
                        onChange={setTimeUntil}
                />)
            }, [viewTimeUntil])}

            
            <View style={styles.container}>
                <View style={styles.dateRow}>
                    <View>
                        <Text style={textStyle.h2}>Date</Text>
                        <Text style={[textStyle.h3, styles.date]}>{Moment(selectedDate).format('DD.MM.YYYY')}</Text>
                    </View>
                    <SmallButton
                        title={"Change date"}
                        action={() => setDayModalVisible(true)}
                    />
                </View>

                <Text style={[textStyle.h2, styles.timeTitle]}>Time</Text>


                <View style={styles.timeRow}>
                    <View>
                        <Text style={[textStyle.h3, styles.times]}>From</Text>
                        <Text style={[textStyle.h3, styles.date]}>{Moment(selectedTimeFrom).format('HH:mm')}</Text>
                    </View>
                    <SmallButton
                        title={"Change time from"}
                        action={() => setViewTimeFrom(true)}
                    />
                </View>

                <View style={styles.timeRow}>
                    <View>
                        <Text style={[textStyle.h3, styles.times]}>Until</Text>
                        <Text style={[textStyle.h3, styles.date]}>{Moment(selectedTimeUntil).format('HH:mm')}</Text>
                    </View>
                    <SmallButton
                        title={"Change time until"}
                        action={() => setViewTimeUntil(true)}
                    />
                </View>

                <StandardButton
                    title={"Confirm"}
                    action={()=> {
                        console.log(selectedDate + " -- " + selectedTimeFrom + " -- " + selectedTimeUntil);
                        navigation.navigate('RoomBooking', {_id: route.params._id, day: selectedDate, timeFrom: selectedTimeFrom, timeUntil: selectedTimeUntil})}}
                    style={styles.confirmButton}
                />

            </View>

            

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
	container: {
		marginLeft: 30,
		width: 330,
	},
    smallButton: {
        width: 200,
        marginTop: 5,
        backgroundColor: colors.blue,
        height: 49,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    date: {
        color: colors.grey
    },
    times: {
        color: colors.blue
    },
    timeTitle:{
        marginTop: 30
    },
    dateRow: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    timeRow: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    confirmButton: {
        marginTop: 220
    }
});