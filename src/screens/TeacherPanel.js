import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
const TeacherPanel = ({ navigation }) => {
    return (
    
       <View style={styles.container}>
           <View style={{width:500,height:55,justifyContent:"space-between",}}>
             <Text style={{fontSize:24, fontWeight:"bold",left:25,top:25,color:"black"}}>
               Subjects
              </Text>
              </View>
           <View style={{flexDirection:"column",justifyContent:"space-between",top:20}}>
              <TouchableOpacity style={styles.button}
              onPress={() => navigation.navigate('Weeks')}>
                <Text style={styles.aftabKhan}>Mobile Application Developmentnpm</Text>
                {/* <Text style={styles.aftabKhan}>Tap to View</Text> */}
                <Text style={{fontSize:15,left:25,top:15}}>
                       Tap To View
                 </Text>
              </TouchableOpacity>
           </View>
           <View style={{flexDirection:"column",justifyContent:"space-between",top:50}}>
              <TouchableOpacity style={styles.button}>
                 <Text style={styles.aftabKhan}>Compiler Construction</Text>
                {/* <Text style={styles.aftabKhan}>Tap to View</Text> */}
                 <Text style={{fontSize:15,left:25,top:15}}>
                       Tap To View
                 </Text>
              </TouchableOpacity>
           </View>
           <View style={{flexDirection:"column",justifyContent:"space-between",top:80}}>
              <TouchableOpacity style={styles.button}>
                 <Text style={styles.aftabKhan}>Information Security</Text>
                 {/* <Text style={styles.aftabKhan}>Tap to View</Text> */}
                 <Text style={{fontSize:15,left:25,top:15}}>
                       Tap To View
                 </Text>
            </TouchableOpacity>
           </View>
             <View style={{flexDirection:"column",justifyContent:"space-between",top:110}}>
              <TouchableOpacity style={styles.button}>
                 <Text style={styles.aftabKhan}>Artifical Intelligence</Text>
                 {/* <Text style={styles.aftabKhan}>Tap to View</Text> */}
                <Text style={{fontSize:15,left:25,top:15}}>
                      Tap To View
                </Text>
              </TouchableOpacity>
           </View>
             <View style={{flexDirection:"column",justifyContent:"space-between",top:140}}>
              <TouchableOpacity style={styles.button}>
                 <Text style={styles.aftabKhan}>Numerical Analysis</Text>
                 {/* <Text style={styles.aftabKhan}>Tap to View</Text> */}
                 <Text style={{fontSize:15,left:25,top:15}}>
                       Tap To View
                 </Text>
              </TouchableOpacity>
           </View>
             <View style={{flexDirection:"column",justifyContent:"space-between",top:170}}>
              <TouchableOpacity style={styles.button}>
                 <Text style={styles.aftabKhan}>Pak-Study</Text>
                 {/* <Text style={styles.aftabKhan}>Tap to View</Text> */}
                 <Text style={{fontSize:15,left:25,top:15}}>
                       Tap To View
                 </Text>
              </TouchableOpacity>
           </View>
         </View>


         
    );
 }
 const styles = StyleSheet.create({
    container: {
       
       justifyContent: "space-between"
    },
    button: {
       width: 360,
       height: 70,
       backgroundColor: `#32cd32`,
      
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
       backgroundColor: `#00ced1`,
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
       backgroundColor: `#00ced1`,
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
       backgroundColor: `#00ced1`,
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
       backgroundColor: `#00ced1`,
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
 
 export default TeacherPanel; 