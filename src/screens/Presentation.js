import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image,Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FAB, Provider } from 'react-native-paper';
const Presentation=({navigation,route})=>{
    const [newItem, setNewItem] = useState('');
    let selectedItems = route.params.selectedItems;
    let courseId = route.params.courseId;
    let user=route.params.user;
    const [selectedItem, setselectedItem] = useState('1');
    const [topic, setTopic] = useState([]);
    const [date, setDate] = useState([]);
    useEffect(() => {
      getTopics();
   }, [selectedItem])
   const [selectedValue, setSelectedValue] = useState('');
    const handleValueChange = (itemValue) => {
        setSelectedValue(itemValue);
    };
   const getTopics = async () => {
      console.log('Selected Item', selectedItem)
      console.log('CourseId', courseId)
      // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
      const response = await fetch(`${global.apiURL}teacher/getAllTopics?courseId=${courseId}&week=${selectedItem}`)
      const data = await response.json()
      console.log("JSON DATA", data)
      setTopic(data)
   };
const savePresentation = async()=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "studentId": [
    "2018-ARID-001",
    "2018-ARID-0345"
  ],
  "topicId": 1,
  "date": "2023-05-21",
  "t_id": 101,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
const response = await fetch(`${global.apiURL}teacher/AssignPresentation`, requestOptions)
    const data = await response.json()
    console.log('data', data)
   }
return(
    <View style={styles.container}>
    <Picker
                style={styles.inputv}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => handleValueChange(itemValue)}>
                {topic.map((item) => (
                    <Picker.Item
                        key={item.topicName}
                        label={item.topicName}
                        value={item.topicName}
                    />
                ))}
    </Picker>
    <TextInput placeholder="Date" style={{
      fontFamily: "roboto-regular", color: "#121212", height: 50, width: 300,
      backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: 30,left:40,position:'absolute'
      }} value={date}
      onChangeText={text => setDate(text)} />
      <FAB
          style={styles.fabSave}
          small
          label='Save'
          onPress={savePresentation}
        />
</View>
);
};
export default Presentation;
const styles = StyleSheet.create({
   //Check project repo for styles
   container: {
      flex: 1,
      borderWidth: 1,
      backgroundColor: "white"
      // borderColor: "#000000"
   },
   inputv: {
    alignSelf: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    width: 270,
    marginTop: 10,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: "#076F65",
    borderColor: '#076F65',
    marginLeft: 7,
},
fabSave: {
  position: 'absolute',
  margin: 16,
  left: 0,
  bottom: 0,
  backgroundColor: '#224B0C',
}
}
);