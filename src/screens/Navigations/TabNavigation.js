// import React from 'react';
// import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
// import UploadVideo from '../UploadVideo';
// import Evaluation from '../Evaluation';
// import Presentation from '../Presentation';
// import HomeStackScreen from './HomeStackScreen';
// import SettingStackScreen from './SettingStackScreen';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// const Tab = createBottomTabNavigator();
// const TabNavigation = ({navigation}) => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarShowLabel: false,
//         headerShown: false,
//       "tabBarStyle": [
//         {
//           display: "flex",
//           position: 'absolute',
//            bottom: 12,
//            left: 15,
//            right: 15,
//            elevation: 0,
//          backgroundColor: '#ffffff',
//           borderRadius: 10,
//            height: 70,
//            ...styles.shadow
//         },
//       ]
//       }}
      
//       >
//       <Tab.Screen
//         name="UploadVideo"
//         component={HomeStackScreen}
//         options={{
//           tabBarIcon: ({focused}) => (
//             <View style={{alignItems: "center",justifyContent:"center"}}>
//               <Image
//                 source={require('../Assets/Icon/upload.png')}
                
//                 resizeMode="contain"
//                 style={{
//                   width: 20,
//                   height: 22,
//                   tintColor: focused ? '#e32f45' : `#000000`,
//                 }}
//               />
              
//               <Text
//                 style={{color: focused ? '#e32f45' : `#000000`, fontSize: 12,fontWeight:'bold'}}>
//                 Upload
//               </Text>
//             </View>
//           ),
//         }}
//       />
      
//       <Tab.Screen
//         name="Evaluation"
//         component={SettingStackScreen}
//         options={{

//           tabBarIcon: ({focused}) => (
//             <View style={{alignItems: "center",justifyContent:"center"}}>
//               <Image
//                 source={require('../Assets/Icon/evaluate.png')}
                
//                 resizeMode="contain"
//                 style={{
//                   width: 20,
//                   height: 19,
//                   tintColor: focused ? '#e32f45' : `#000000`,
//                 }}
//               />
              
//               <Text
//                 style={{color: focused ? '#e32f45' : `#000000`, fontSize: 12,fontWeight:'bold'}}>
//             Evaluate
//               </Text>
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen name="Presentation" component={Presentation} 
//        options={{
//         tabBarIcon: ({focused}) => (
//           <View style={{alignItems: "center",justifyContent:"center"}}>
//             <Image
//               source={require('../Assets/Icon/presentation.png')}
              
//               resizeMode="contain"
//               style={{
//                 width: 18,
//                 height: 19,
//                 tintColor: focused ? '#e32f45' : `#000000`}}
//             />
//             <Text
//               style={{color: focused ? '#e32f45' : `#000000`, fontSize: 12,fontWeight:'bold'}}>
//              Presentation
//             </Text>
//           </View>
//         ),
//       }}
//       />
//       {/* <Tab.Screen name="demo" component={demo} 
//        options={{
//         tabBarIcon: ({focused}) => (
//           <View style={{alignItems: "center",justifyContent:"center"}}>
//             <Image
//               source={require('../Assets/Icons/login.png')}
              
//               resizeMode="contain"
//               style={{
//                 width: 18,
//                 height: 19,
//                 tintColor: focused ? '#e32f45' : `#000000`}}
//             />
//             <Text
//               style={{color: focused ? '#e32f45' : `#000000`, fontSize: 12,fontWeight:'bold'}}>
//              Demo
//             </Text>
//           </View>
//         ),
//       }}
//       />
//       <Tab.Screen name="Details" component={Details}
//        options={{
//         tabBarIcon: ({focused}) => (
//           <View style={{alignItems: "center",justifyContent:"center"}}>
//             <Image
//               source={require('../Assets/Icons/Details.png')}
              
//               resizeMode="contain"
//               style={{
//                 width: 18,
//                 height: 19,
//                 tintColor: focused ? '#e32f45' : `#000000`,
//               }}
//             />
//             <Text
//               style={{color: focused ? '#e32f45' : `#000000`, fontSize: 12,fontWeight:'bold'}}>
//               DETAIL
//             </Text>
//           </View>
//         ),
//       }}
//       /> */}
//     </Tab.Navigator>
//   );
// };
// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#7F5DF0',
//     shadowOffset: {
//       width: 0,
//       height: 17,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.5,
//     elevation: 5,
//   },
// });
// export default TabNavigation;