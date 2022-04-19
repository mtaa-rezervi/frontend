import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, Platform, Button, ScrollView } from "react-native";
import BackButton from "../components/buttons/BackButton";
import React, { useState } from 'react';

import Moment from "moment";

import DateTimePicker from '@react-native-community/datetimepicker';

import textStyle from "../styles/text";
import colors from "../styles/colors";
import StandardButton from "../components/buttons/StandardButton";

const SmallButton = ({ title, action }) => (
    <TouchableOpacity style={ styles.smallButton } onPress={action}>
        <Text style={[textStyle.small, { color: colors.white}]}>{ title || 'Button' }</Text>
    </TouchableOpacity>
);

export default function SelectTime({ navigation, route }) {    
    const isIOS = Platform.OS === 'ios' ? true : false;

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
    const [selectedTimeFrom, setSelectedTimeFrom] = useState(new Date().toISOString());
    const [selectedTimeUntil, setSelectedTimeUntil] = useState(new Date().toISOString());

    const [dayModalVisible, setDayModalVisible] = useState(false);
    const [viewTimeFrom, setViewTimeFrom] = useState(false);
    const [viewTimeUntil, setViewTimeUntil] = useState(false);

    const setDay = (event, date) => {
        var day = Moment(date).format();
        setSelectedDate(day);
        if (!isIOS) setDayModalVisible(false);
    };

    const setTimeFrom = (event, date) => {
        var timeFrom = Moment(date).format();
        setSelectedTimeFrom(timeFrom);
        if (!isIOS) setViewTimeFrom(false);
    };

    const setTimeUntil = (event, date) => {
        var timeUntil = Moment(date).format();
        setSelectedTimeUntil(timeUntil);
        if (!isIOS) setViewTimeUntil(false);
    };

    return(
        <SafeAreaView>
            <View style={styles.header}>
                <BackButton action={() => navigation.goBack()}/>
                <Text style={[textStyle.h1, styles.heading]}>Select time</Text>
            </View>
            <ScrollView>
                { isIOS && dayModalVisible && (
                    <Button color={colors.green} title='Confirm date' onPress={() => setDayModalVisible(false)} /> 
                )}
                {React.useMemo(() => {
                    return dayModalVisible && (
                        <DateTimePicker
                            value={new Date(selectedDate)}
                            mode="date"
                            minimumDate={new Date()}
                            is24Hour={true}
                            display={isIOS ? 'inline' : 'default'}
                            style={{width: 330, alignSelf:'center'}}
                            onChange={(event, date) => {
                                setDay(event, date)
                            }}
                    />)
                }, [dayModalVisible])}

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

                    {React.useMemo(() => {
                        return viewTimeFrom && (
                            <DateTimePicker
                                value={new Date(selectedTimeFrom)}
                                mode="time"
                                is24Hour={true}
                                locale="en-UK"
                                display={isIOS ? 'spinner' : 'default'}
                                onChange={(event, date) => {
                                    setTimeFrom(event, date)
                                }}
                            />)
                        }, [viewTimeFrom])}
                    
                    { isIOS && viewTimeFrom && (
                        <Button color={colors.green} title='Confirm time' onPress={() => setViewTimeFrom(false)} /> 
                    )}

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

                    {React.useMemo(() => {
                    return viewTimeUntil && (
                        <DateTimePicker
                            value={new Date(selectedTimeUntil)}
                            mode="time"
                            is24Hour={true}
                            locale="en-UK"
                            display={isIOS ? 'spinner' : 'default'}
                            onChange={setTimeUntil}
                        />)
                    }, [viewTimeUntil])}

                    { isIOS && viewTimeUntil && (
                        <Button color={colors.green} title='Confirm time' onPress={() => setViewTimeUntil(false)} /> 
                    )}

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

                    <StandardButton style={{alignSelf:'center', marginTop: 50, marginBottom: 100}} title={'Check current reservations'}
                        action={() => navigation.navigate('RoomAgenda', { _id: route.params._id, name: route.params.name })} 
                    />
                </View>
            </ScrollView>
            <StandardButton
                title={"Confirm"}
                action={()=> {
                    console.log(selectedDate + " -- " + selectedTimeFrom + " -- " + selectedTimeUntil);
                    navigation.navigate('RoomBooking', {_id: route.params._id, day: selectedDate, timeFrom: selectedTimeFrom, timeUntil: selectedTimeUntil})}}
                style={styles.confirmButton}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        //marginLeft: 30,
        width: 330,
        alignSelf: 'center'
    },
    header: {
        marginBottom: 30
    },
    heading: {
        marginRight: 30,
        marginLeft: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        //marginTop: 40,
        justifyContent: 'space-between'
    },
    timeRow: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    confirmButton: {
        marginTop: 20,
        alignSelf: 'center'
    }
});