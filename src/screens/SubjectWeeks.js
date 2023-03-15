import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const SubjectWeeks = () => {
   return (
      <View style={styles.container}>
         <View>
            <TouchableOpacity style={styles.button}>
               <Text style={styles.aftabKhan}>Week 1</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button2}>
               <Text style={styles.zahidAhmed}>Week 2</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button3}>
               <Text style={styles.umarFarooq}>Week 3</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button4}>
               <Text style={styles.shahidJamil}>Week 4</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button5}>
               <Text style={styles.drNaseer}>Week 5</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button6}>
               <Text style={styles.week6}>Week 6</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button7}>
               <Text style={styles.week7}>Week 7</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button8}>
               <Text style={styles.week8}>Week 8</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button9}>
               <Text style={styles.week9}>Week 9</Text>
            </TouchableOpacity>
         </View>
         <View>
            <TouchableOpacity style={styles.button10}>
               <Text style={styles.week10}>Week 10</Text>
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
      alignItems:'center',
      backgroundColor: "#E6E6E6",
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
      alignItems:'center',
      backgroundColor: "#E6E6E6",
      marginTop: 13,
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
      alignItems:'center',
      backgroundColor: "#E6E6E6",
      marginTop: 13,
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
      alignItems:'center',
      backgroundColor: "#E6E6E6",
      marginTop: 13,
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
      alignItems:'center',
      backgroundColor: "#E6E6E6",
      marginTop: 13,
      marginLeft: 16
   },
   drNaseer: {
      fontFamily: "roboto-regular",
      color: "#121212",
      marginTop: 12,
      marginLeft: 26
   },
   button6: {
    width: 300,
    height: 44,
    alignItems:'center',
    backgroundColor: "#E6E6E6",
    marginTop: 13,
    marginLeft: 16
 },
 week6: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 14,
    marginLeft: 25
 },
 button7: {
    width: 300,
    height: 44,
    alignItems:'center',
    backgroundColor: "#E6E6E6",
    marginTop: 13,
    marginLeft: 16
 },
 week7: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 14,
    marginLeft: 25
 },
 button8: {
    width: 300,
    height: 44,
    alignItems:'center',
    backgroundColor: "#E6E6E6",
    marginTop: 13,
    marginLeft: 16
 },
 week8: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 14,
    marginLeft: 25
 },
 button9: {
    width: 300,
    height: 44,
    alignItems:'center',
    backgroundColor: "#E6E6E6",
    marginTop: 13,
    marginLeft: 16
 },
 week9: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 14,
    marginLeft: 25
 },
 button10: {
    width: 300,
    height: 44,
    alignItems:'center',
    backgroundColor: "#E6E6E6",
    marginTop: 13,
    marginLeft: 16
 },
 week10: {
    fontFamily: "roboto-regular",
    color: "#121212",
    marginTop: 14,
    marginLeft: 25
 }
});

export default SubjectWeeks;