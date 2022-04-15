import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import colors from './styles/colors';
import textStyle from './styles/text';
import ComponentsExample from './screens/ComponentsExample';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import NotiScreen from './screens/Notifications';
import ProfileScreen from './screens/Profile';
import RoomScreen from './screens/Room';
import EditProfileScreen from './screens/EditProfile';
import UserListing from './screens/UserListing';
import ReservationHistory from './screens/ReservationHistory';
import RoomCreation from './screens/RoomCreation';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.lightBlue
      }}>
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
          tabBarIcon: ({color}) => <Entypo style={styles.tabBarIcon} name='home' size={30} color={color} />,
        }}/>
      <Tab.Screen name="Search" component={SearchScreen} 
        options={{
          tabBarIcon: ({color}) => <Entypo style={styles.tabBarIcon} name='magnifying-glass' size={30} color={color} />,
        }}/>
      <Tab.Screen name="Notifications" component={NotiScreen} 
        options={{
          tabBarIcon: ({color}) => <MaterialCommunityIcons style={styles.tabBarIcon} name='bell' size={30} color={color} />,
        }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} 
        options={{
          tabBarIcon: ({color}) => <Ionicons style={styles.tabBarIcon} name='person-circle-sharp' size={34} color={color} />,
        }}/>
    </Tab.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) return (<AppLoading />);

  return (
    //<View style={styles.container}><ComponentsExample/></View>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        {/* <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} /> */}
        <Stack.Screen name='TabNavigator' component={TabNavigator} />
        <Stack.Screen name='Room' component={RoomScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='EditProfile' component={EditProfileScreen}/>
        <Stack.Screen name='ReservationHistory' component={ReservationHistory}/>
        <Stack.Screen name='UserListing' component={UserListing}/>
        <Stack.Screen name='RoomCreation' component={RoomCreation}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  tabBar: {
    backgroundColor: colors.blue,
    height: 90,
  },
});