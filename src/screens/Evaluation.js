import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet,FlatList } from 'react-native';
import { FAB, Provider } from 'react-native-paper';

const Evaluation = ({navigation,route}) => {
  const [stdEvaluation, setStdEvaluation] = useState([]);
  const [marksList, setMarksList] = useState([]);
  let user = route.params.user;
  let id=user.userId;
   console.log('user', user);
  useEffect(() => {
   getStudents(); 
 },[] );
 const getStudents = async () => {
    const response = await fetch(`${global.apiURL}teacher/GetStudentForEvaluation?t_id=${id}`)
    const data = await response.json()
    console.log("JSON DATA", data)
    setStdEvaluation(data)
 };
 const SaveMarks = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "marks": marksList,
      "t_id":  id,
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
const response = await fetch(`${global.apiURL}teacher/SaveMarksOfPresentation`, requestOptions)
const data = await response.json()
console.log('data', data)
 };
 const handleMarkChange = (index, value) => {
  const updatedMarksList = [...marksList];
  updatedMarksList[index] = value;
  setMarksList(updatedMarksList);
};
  return (
    <View style={styles.container}>
        <FlatList
            data={stdEvaluation}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => {
                return (
                  <View>
            <Text style={styles.weekText}>{item.s_id}</Text>
            {/* <TextInput
              placeholder="Evaluate"
              style={styles.textInput}
              value={marksList[index]}
              onChangeText={(text) => handleMarkChange(index, text)}
            /> */}
            </View>
    )
    }}
/>
    <FAB
       style={styles.fab}
       small
       label='Save'
       onPress={SaveMarks}
       color='white'/> 
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
    flex: 1
    },
   setdata: {
   fontFamily: "roboto-700",
   color: '#224B0C',
    fontSize: 30,
    marginLeft: 30
    },
    fab: {
    backgroundColor: '#224B0C',
    color: 'white'
    },
});
export default Evaluation;
