import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const Weeks = ({ navigation, route }) => {
   const [currency, setCurrency] = useState('US Dollar');
   const [selectedItem, setselectedItem] = useState('1');
   const [topic, settopic] = useState([]);
   let courseId = route.params.courseId
   useEffect(() => {
      getTopics();
   }, [selectedItem])
   const getTopics = async () => {
      // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
      const response = await fetch(`${global.apiURL}student/getTopics?courseId=${courseId}&week=${selectedItem}`, { method: "GET", redirect: 'follow' })
      const data = response.json()
      console.log("DATA", data)
      // console.log("Response Status", response.status)
      console.log("Response", response)
      settopic(data)
      // console.log(courseId)
      // console.log(selectedItem)
   }
   const data = [{
      name: "Week-1",
      topics: ['Map', 'Ins', 'cc']
   },
   {
      name: "Week-2",
      topics: ['Map', 'Ins', 'cc']
   },
   {
      name: "Week-3",
      topics: ['Map', 'Ins', 'cc']
   },
   {
      name: "Week-4",
      topics: ['Map', 'Ins', 'cc']
   },
   {
      name: "Week-5",
      topics: ['Map', 'Ins', 'cc']
   },]

   return (
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
         <FlatList
            data={topic}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
               <View style={styles.weekContainer}>
                  <Text style={styles.weekText}>{item.topic_name}</Text>

               </View>
            )}
         />

      </View>
   );
};
export default Weeks;
const styles = StyleSheet.create({
   //Check project repo for styles
   weekContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'

   },
   weekText: {
      fontSize: 16,
      width: '60%'
   },
   picker: {
      top: 25,
      bottom: 5,
      width: '100%',
      backgroundColor: `#32cd32`

   }
});