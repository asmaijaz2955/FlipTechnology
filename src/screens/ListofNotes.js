import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text,Image } from "react-native";
const ListofNotes = ({ navigation}) => {
    return(
        <View style={styles.container}>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Derivatives,Exercise 1.1</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Derivatives,Exercise 1.1</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Derivatives,Exercise 1.1</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Derivatives,Exercise 1.1</Text>
            </View>
            <View>
            <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
                Derivatives,Exercise 1.1</Text>
            </View>
        </View>
    );}
    const styles = StyleSheet.create({
        container: {
           top: 40,
           
        },
    });
    export default ListofNotes;