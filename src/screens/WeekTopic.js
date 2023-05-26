import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import { FAB, Provider } from 'react-native-paper';
// import { Button } from 'react-native-elements'
const K_OPTIONS = [
   {
      item: 'All',
      id: 'All',
   },
   {
      item: 'Week 1',
      id: '1',
   },
   {
      item: 'Week 2',
      id: '2',
   },
   {
      item: 'Week 3',
      id: '3',
   },
   {
      item: 'Week 4',
      id: '4',
   },
   {
      item: 'Week 5',
      id: '5',
   },
   {
      item: 'Week 6',
      id: '6',
   },
   {
      item: 'Week 7',
      id: '7',
   },
   {
      item: 'Week 8',
      id: '8',
   },
   {
      item: 'Week 9',
      id: '9',
   },
   {
      item: 'Week 10',
      id: '10',
   },
   {
      item: 'Week 11',
      id: '11',
   },
   {
      item: 'Week 12',
      id: '12',
   },
   {
      item: 'Week 13',
      id: '13',
   },
   {
      item: 'Week 14',
      id: '14',
   },
   {
      item: 'Week 15',
      id: '15',
   },
   {
      item: 'Week 16',
      id: '16',
   },
]
const WeekTopic = ({ navigation, route }) => {
   const [selectedItem, setselectedItem] = useState('1');
   const [topic, settopic] = useState([]);
   const [selectedTeams, setSelectedTeams] = useState([]);
   // let user = route.params.user
   // let courseId = route.params.courseId
   const {user, courseId} = route.params
   console.log("courseId", courseId, "user", user)

   // useEffect(() => {
   //    getTopics();
   // }, [selectedItem])
   useEffect(() => {
      getTopics();
   }, [selectedTeams])
   
   function onMultiChange() {
      return (item) => setSelectedTeams(xorBy(selectedTeams, [item], 'id'))
   }

   function onChange() {
      return (val) => setSelectedTeams(val)
   }

   const getTopics = async () => {
      console.log('Selected Item', selectedItem)
      console.log('CourseId', courseId)
      console.log('selected teams', selectedTeams)
      let week = []
      const containsAll = selectedTeams.find(obj => obj.id === "All");
      if(containsAll){
         week = ['1', '2', '3','4','5','6','7','8','9','10','11','12','13','14','15','16']
      }
      else{
         const weekItems = selectedTeams.map(obj => obj.id);
         week = weekItems         
      }
      console.log('asdas', week)

      // let week = [selectedItem]

      // if (selectedItem == 'All') {
      //    week = ["1", "2", "3"]
      // }

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
         "CourseId": courseId,
         "week": week
      });

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };  
      const response = await fetch(`${global.apiURL}student/getTopics`, requestOptions)
      // // const response = await fetch(`${global.apiURL}student/getTopics?courseId=${courseId}&week=${week}`)
      // const response = await fetch(`${global.apiURL}student/getTopics?courseId=${courseId}&week=${selectedItem}`)
      const data = await response.json()
      console.log("JSON DATA", data)
      settopic(data)
   }

   // const getTopics = async () => {
   //    console.log('Selected Item', selectedItem)
   //    console.log('CourseId', courseId)
   //    // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
   //    let week = [selectedItem]

   //    if (selectedItem == 'All') {
   //       week = ["1", "2", "3"]
   //    }

   //    var myHeaders = new Headers();
   //    myHeaders.append("Content-Type", "application/json");

   //    var raw = JSON.stringify({
   //       "CourseId": courseId,
   //       "week": week
   //    });

   //    var requestOptions = {
   //       method: 'POST',
   //       headers: myHeaders,
   //       body: raw,
   //       redirect: 'follow'
   //    };

   //    const response = await fetch(`${global.apiURL}student/getTopics`, requestOptions)

   //    // const response = await fetch(`${global.apiURL}student/getTopics?courseId=${courseId}&week=${week}`)
   //    // const response = await fetch(`${global.apiURL}student/getTopics?courseId=${courseId}&week=${selectedItem}`)
   //    const data = await response.json()
   //    console.log("JSON DATA", data)
   //    settopic(data)
   // }

   return (
      <View style={styles.container}>


         <View style={{ flexDirection: 'row', backgroundColor: 'white', borderWidth: 1, borderColor: '#224B0C', padding: 5, margin: 15 }}>
            <TextInput
               style={{ flex: 1, marginLeft: 40, height: 40 }}
            ></TextInput>
            <TouchableOpacity style={{ padding: 5 }}>
               <FontAwesomeIcon style={{ fontSize: 25, color: '#224B0C' }} name="search"
               />
            </TouchableOpacity >
            <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate("Searching")} >
               <FontAwesomeIcon style={{ fontSize: 25, color: '#224B0C' }} name="filter"
               />
            </TouchableOpacity>
         </View >
         <View style={{ margin: 25,bottom:60 }}>
            <View style={{ height: 40 }} />
            <SelectBox
               label="Select Week"
               options={K_OPTIONS}
               selectedValues={selectedTeams}
               onMultiSelect={onMultiChange()}
               onTapClose={onMultiChange()}
               isMulti
            />
            <FAB
          style={styles.fabSave}
          small
          label='Save'
          onPress={getTopics}
         color='white'
        />
         </View>
         {/* <View > */}
         {/* <Picker
               selectedValue={selectedItem}
               onValueChange={(itemValue, itemIndex) =>
                  setselectedItem(itemValue)}
               style={styles.picker}
            >
               <Picker.Item label="All" value="All" />
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

               </Picker> */}
         <View style={{ marginVertical: -40 }}></View>
         <FlatList
            data={topic}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
               console.log('item', item)
               return (
                  <Pressable onPress={() => navigation.navigate("Videos", { lessonId: item.LessonId, user: user, topicId: item.Topic_id })}>
                     <View style={styles.weekContainer} >
                        <Text style={styles.weekText}>{item.TopicName}</Text>
                     </View>
                  </Pressable>
               )
            }}
         />

         {/* </View> */}
      </View>
   );
};
export default WeekTopic;
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
      backgroundColor: '#C1D5A4',
   },
   fabSave: {
      position: 'absolute',
      margin: 16,
      left:-15,
      bottom: -80,
      backgroundColor: '#224B0C',
      width:'100%',
    },
});