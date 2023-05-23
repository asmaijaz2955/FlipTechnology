import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image,Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
const Presentation=({navigation,route})=>{
    const [newItem, setNewItem] = useState('');
    let selectedItems = route.params.selectedItems;
    let courseId = route.params.courseId;
    const [selectedItem, setselectedItem] = useState('1');
    const [topic, setTopic] = useState([]);
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
}
);