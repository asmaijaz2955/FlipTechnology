import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const ListofTeachers = ( { navigation }) => {
   return (
      <View style={styles.container}>
         <View>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('AdminApproval')}>

            
               <Text style={styles.aftabKhan}>Aftab Khan</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button2}
            //   onPress={() => navigation.navigate('AdminApproval')}
            >
            
               <Text style={styles.zahidAhmed}>Zahid Ahmed</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button3}
                onPress={() => navigation.navigate('AdminApproval')}>
               <Text style={styles.umarFarooq}>Umar Farooq</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button4}>
               <Text style={styles.shahidJamil}>Shahid Jamil</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button5}>
               <Text style={styles.drNaseer}>Dr Naseer</Text>
            </TouchableOpacity>
         </View>

      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      top: 100,
      justifyContent: "space-between"
   },
   button: {
      width: 300,
      height: 42,
      backgroundColor: `#32cd32`,
      marginTop: 10,
      marginLeft: 16
   },
   aftabKhan: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 13,
      marginLeft: 25
   },
   button2: {
      width: 300,
      height: 44,
      backgroundColor: `#32cd32`,
      top: 40,
      marginLeft: 16
   },
   zahidAhmed: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 14,
      marginLeft: 25
   },
   button3: {
      width: 300,
      height: 43,
      backgroundColor: `#32cd32`,
      marginTop: 80,
      marginLeft: 20
   },
   umarFarooq: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 18,
      marginLeft: 22
   },
   button4: {
      width: 300,
      height: 41,
      backgroundColor: `#32cd32`,
      marginTop: 40,
      marginLeft: 20
   },
   shahidJamil: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 12,
      marginLeft: 21
   },
   button5: {
      width: 300,
      height: 42,
      backgroundColor: `#32cd32`,
      marginTop: 30,
      marginLeft: 16
   },
   drNaseer: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 12,
      marginLeft: 26
   }
});

export default ListofTeachers;