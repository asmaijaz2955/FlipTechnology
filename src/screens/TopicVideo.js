import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text,Image } from "react-native";
const UploadVideo = ({ navigation}) => {
    return(
        <View>
            <Image
              source={require('./Assets/Images/video.png')}
              
              resizeMode="contain"
              style={{
                width:390,
                height:300,
       padding:10,
      right:5,
      left:5,

             
              }}
            />
        <View style={{justifyContent:'center',alignItems:"center",right:70}}>
    <TouchableOpacity style={styles.button}
    onPress={() => navigation.navigate('Presentation')}>
        <Text style={styles.Save}>Save</Text>
      </TouchableOpacity>
        </View>
        </View>

    );
}
const styles = StyleSheet.create({

button: {
    width: 120,
    height: 55,
    backgroundColor: "#E6E6E6",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 26,
    marginTop: 10,
    marginLeft: 120,
   
  },
  Save: {
 fontSize:22,
   fontWeight:"bold",
    color: "#121212",
    marginTop: 15,
    marginLeft: 35,
  }
});
export default UploadVideo;