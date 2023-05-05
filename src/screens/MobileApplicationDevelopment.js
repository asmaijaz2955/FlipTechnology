import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
const Weeks = ({ navigation, route }) => {
   const [currency, setCurrency] = useState('US Dollar');
   const [selectedItem, setselectedItem] = useState('1');
   const [topic, settopic] = useState([]);
   let courseId = route.params.courseId
   console.log("courseId", courseId)
   let user = route.params.user
   useEffect(() => {
      getTopics();
   }, [selectedItem])
   const getTopics = async () => {
      console.log('Selected Item', selectedItem)
      console.log('CourseId', courseId)
      // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
      const response = await fetch(`${global.apiURL}student/getTopics?courseId=${courseId}&week=${selectedItem}`)
      const data = await response.json()
      console.log("JSON DATA", data)
      settopic(data)
   }
   return (
      <View style={styles.container}>


         <View style={{ flexDirection: 'row', backgroundColor: 'white',borderWidth:1,borderColor: '#224B0C', padding: 5, margin: 15 }}>
            <TextInput
               style={{ flex: 1, marginLeft: 40, height: 40 }}
            ></TextInput>
            <TouchableOpacity style={{ padding: 5 }}>
               <FontAwesomeIcon style={{ fontSize: 25,color:'#224B0C' }} name="search"
               />
            </TouchableOpacity >
            <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate("Searching")} >
               <FontAwesomeIcon style={{ fontSize: 25,color:'#224B0C' }} name="filter"
               />
            </TouchableOpacity>
         </View >
         <View >
            <Picker
               selectedValue={selectedItem}
               onValueChange={(itemValue, itemIndex) =>
                  setselectedItem(itemValue)}
               style={styles.picker}
            >
               {/* <ScrollView style={{flex: 1, height: '100%', width: "100%"}}> */}
               <Picker.Item label="Week 1" value="1" />
               <Picker.Item label="Week 2" value="2" />
               <Picker.Item label="Week 3" value="3" />
               <Picker.Item label="Week 4" value="4" />
               <Picker.Item label="Week 5" value="5" />
               <Picker.Item label="Week 6" value="6" />
               <Picker.Item label="Week 7" value="7" />
               <Picker.Item label="Week 8" value="8" />
               <Picker.Item label="Week 9" value="9" />
               <Picker.Item label="Week 10" value="10" />
               <Picker.Item label="Week 11" value="11" />
               <Picker.Item label="Week 12" value="12" />
               <Picker.Item label="Week 13" value="13" />
               <Picker.Item label="Week 14" value="14" />
               <Picker.Item label="Week 15" value="15" />
               <Picker.Item label="Week 16" value="16" />

               {/* </ScrollView> */}
            </Picker>
            <View style={{ marginVertical: 20 }}></View>
            <FlatList
               data={topic}
               keyExtractor={(item, index) => index}
               renderItem={({ item }) => {
                  console.log('item', item)
                  return (
                  <Pressable onPress={() => navigation.navigate("Videos", { lessonId: item.ls_id, user: user })}>
                     <View style={styles.weekContainer} >
                        <Text style={styles.weekText}>{item.topic_name}</Text>
                     </View>
                  </Pressable>
               )}}
            />

         </View>
      </View>
   );
};
export default Weeks;
const styles = StyleSheet.create({
   //Check project repo for styles
   container: {
      flex: 1,
      borderWidth: 1,
      backgroundColor: "white"
      // borderColor: "#000000"
   },
   weekContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10,
   },
   image: {
      width: 31,
      height: 27,
      marginLeft: 292
   },
   Search: {
      fontSize: 36,
      marginTop: 5,
      height: '6%',
      width: '70%',
      paddingHorizontal: 115,
      backgroundColor: '#C1D5A4'
   },
   icon3: {
      // alignSelf:"center",
      fontSize: 25,
      marginTop: 5,
      bottom: 15,
      paddingHorizontal: 155,
      marginLeft: 250
   },
   icons: {
      fontSize: 20,
      marginTop: 5,
      //bottom:15,
      paddingHorizontal: 125,
      marginLeft: 450
   },
   weekText: {
      fontSize: 16,
      height: '150%',
      width: '90%',
      backgroundColor: '#C1D5A4'
   },
   picker: {
      top: 25,
      bottom: 5,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#C1D5A4'
   }
});