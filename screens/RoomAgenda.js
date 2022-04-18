import React, { useState, useEffect } from 'react'
import { SectionList, StyleSheet, Text, SafeAreaView, View, ActivityIndicator } from 'react-native';
import { getRequestHeaders } from '../utils/api';

import BackButton from '../components/buttons/BackButton';
import EmptyList from '../components/cards/EmptyList';

import colors from '../styles/colors';
import textStyle from '../styles/text';

// Reservation item
const Reservation = ({ from, until }) => (
  <View style={{ alignSelf: 'center', marginBottom: 14 }}>
    <View style={styles.reservation}>
      <Text style={[textStyle.smaller, { marginLeft: 20 }]}>From: { from } </Text>
      <Text style={[textStyle.smaller, { marginLeft: 20 }]}>Until: { until } </Text>
    </View>
  </View>
);

// Section item
const DaySection = ({ day }) => (
  <View style={{ alignSelf: 'center', marginBottom: 14 }}>
    <View style={styles.daySection}>
      <Text style={[textStyle.h2, { marginLeft: 20 }]}>{ day }</Text>
    </View>
  </View>
);

export default function RoomAgenda({ navigation, route }) {
  const [isLoading, setLoading] = useState(true);
  const [isRefreshing, setRefreshing] = useState(false);

  const [activeReservations, setActiveReservations] = useState([]);

  // Fetch reservations and filter out the active ones
  const getReservations =  async () => {
    const requestHeaders = await getRequestHeaders();
    try {
      const response = await fetch(`https://mtaa-backend.herokuapp.com/reservations?room_id=${route.params._id}`, {
        method: 'GET',
        headers: requestHeaders
      });
      const reservations = await response.json();
      const active = reservations.filter((reservation) => new Date(reservation.reserved_to) > new Date);
      if (active.length === 0) {
        alert('There are no current reservations for this room');
        return;
      }
      
      let items = [];
      let section = { title: null, data: [] };

      active.forEach(reservation => {
        let currentSection = new Date(reservation.reserved_to).toLocaleDateString(['en'], { month: 'long', day: 'numeric' });
        let timeslot = {
          from: new Date(reservation.reserved_from).toLocaleTimeString([], { timeStyle: 'short' }),
          until: new Date(reservation.reserved_to).toLocaleTimeString([], { timeStyle: 'short' })
        };
        if (currentSection !== section.title) {
          if (section.title !== null) items.push(section);
          section = { title: currentSection, data: [] };
        }
        section.data.push(timeslot);
      });
      items.push(section)

      if (items.length === 0) alert('There are no current reservations for this room');
      setActiveReservations(items);
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getReservations();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getReservations();
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
        <Text style={[textStyle.h1, styles.heading]}>{route.params.name}</Text>
        <Text style={[textStyle.h2, styles.heading, {color: colors.grey}]}>Reservations</Text>
      </View>
      <SectionList
        sections={activeReservations}
        keyExtractor={(item, index) => item + index}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        renderItem={renderReservations}
        renderSectionHeader={renderSectionHeader}
        ListEmptyComponent={ !isLoading && <EmptyList/> } 
      />
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
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    paddingBottom: 5,
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
    elevation: 3
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