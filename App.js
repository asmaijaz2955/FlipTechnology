import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import DrawerNavigation from './src/screens/Navigation/DrawerNavigation';
import TabNavigation from './src/screens/Navigations/TabNavigation';
import HomeStackScreen from './src/screens/Navigations/HomeStackScreen';
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator();
global.apiURL = 'http://192.168.0.2/FlipTech_Fyp/api/'
const Stack = createNativeStackNavigator();
const App = ({ navigation }) => {
  return (
    // <CheckboxNew/>
    <NavigationContainer>
      {/* <StackNavigation/> */}
      <HomeStackScreen />
    </NavigationContainer>

  );
};
export default App;