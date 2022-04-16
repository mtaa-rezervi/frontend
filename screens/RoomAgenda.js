import React, { useState, useEffect } from 'react'
import { Alert, SectionList, StyleSheet, Text, SafeAreaView, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';

import BackButton from '../components/BackButton';

import colors from '../styles/colors';
import textStyle from '../styles/text';

const DATA = [
  {
    title: 'April 22',
    data: [{ from: '10:00', until: '11:00' }, { from: '13:00', until: '15:00' }]
  },
  {
    title: 'April 23',
    data: [{ from: '10:00', until: '12:00' }]
  }
];

const Reservation = ({ from, until }) => (
  <View style={{alignSelf: 'center', marginBottom: 14}}>
    <View style={styles.reservation}>
      <Text style={[textStyle.smaller, {marginLeft: 20}]}>From: { from } </Text>
      <Text style={[textStyle.smaller, {marginLeft: 20}]}>Until: { until } </Text>
    </View>
  </View>
);

const DaySection = ({ day }) => (
  <View style={{alignSelf: 'center', marginBottom: 14}}>
    <View style={styles.daySection}>
      <Text style={[textStyle.h2, {marginLeft: 20}]}>{ day }</Text>
    </View>
  </View>
);

export default function RoomAgenda({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    //getRooms();
  };

  const renderReservations = ( { item }) => (
    <Reservation from={item.from} until={item.until} />
  );
  
  const renderSectionHeader = ({ section }) => (
    <DaySection day={section.title} />
  );  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton action={() => navigation.goBack()}/>
        <Text style={[textStyle.h1, styles.heading]}>Room 1 timetable</Text>
      </View>
      {/* <DaySection day='April 22' />
      <Reservation from='10:00' until='11:00' /> */}
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        //onRefresh={onRefresh}
        //refreshing={isRefreshing}
        renderItem={renderReservations}
        renderSectionHeader={renderSectionHeader}
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
    marginBottom: 10
  },
  heading: {
    marginRight: 30,
    marginLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reservation: {
    backgroundColor: colors.lightGrey, 
    borderRadius: 10, 
    height: 50, 
    width: 330, 
    flexDirection: 'column', 
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingVertical: 4
  },
  daySection: {
    backgroundColor: colors.lightBlue, 
    borderRadius: 10, 
    height: 50, 
    width: 330, 
    flexDirection: 'column', 
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingVertical: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,  
    elevation: 3,
  }
});