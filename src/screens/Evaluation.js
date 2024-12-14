import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList } from 'react-native';
import { FAB } from 'react-native-paper';
const Evaluation = ({ navigation, route }) => {
  const [stdEvaluation, setStdEvaluation] = useState([]);
  const [marksList, setMarksList] = useState([]);
  let user = route.params.user;
  let id = user.userId;
  let topicId=route.params.topicId;
  console.log("topicId",topicId);
  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = async () => {
    const response = await fetch(`${global.apiURL}teacher/GetStudentForEvaluation?topicID=${topicId}`);
    const data = await response.json();
    setStdEvaluation(data);
    setMarksList(Array(data.length).fill('')); // Initialize marksList with empty strings
  };

  const SaveMarks = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      marks: marksList,
      t_id: id,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const response = await fetch(`${global.apiURL}teacher/SaveMarksOfPresentation`, requestOptions);
    const data = await response.json();
    console.log('data', data);
  };

  const handleMarkChange = (index, value) => {
    const updatedMarksList = [...marksList];
    updatedMarksList[index] = value;
    setMarksList(updatedMarksList);
  };

  const renderEvaluationItem = ({ item, index }) => {
    return (
      <View>
        <Text style={styles.weekText}>{item.s_id}</Text>
        <TextInput
          placeholder="Evaluate"
          style={styles.textInput}
          value={marksList[index]}
          onChangeText={(text) => handleMarkChange(index, text)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={stdEvaluation}
        keyExtractor={(item, index) => index.toString()} // Convert index to string for keyExtractor
        renderItem={renderEvaluationItem} // Use the custom rendering function
      />

      <FAB style={styles.fab} small label="Save" onPress={SaveMarks} color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  weekText: {
    fontFamily: 'roboto-700',
    color: '#224B0C',
    fontSize: 20,
    marginLeft: 30,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  fab: {
    backgroundColor: '#224B0C',
    color: 'white',
    width: 150,
    marginLeft: 100,
    marginTop: 20,
  },
});

export default Evaluation;
