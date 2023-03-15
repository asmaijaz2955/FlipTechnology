import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text,Image } from "react-native";
const StudentPresenation = ({ navigation}) => {
    return(
        <View style={styles.container}>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Syed Usman  Hassan</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Hifza Nisar</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Muhammad Usman</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Zeeshan Ahmed</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Muhammad Noman</Text>
            </View>
        </View>
            
    );}
    const styles = StyleSheet.create({
        container: {
           top: 40,
           
        }
});
    export default StudentPresenation;