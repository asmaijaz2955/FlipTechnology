import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image,Modal } from 'react-native';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
const Quiz=( { navigation })=>{
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState('');
  const [Question, setQuestion] = useState('');
  const [optionA, setoptionA] = useState('');
  const [optionB, setoptionB] = useState('');
  const [optionC, setoptionC] = useState('');
  const [optionD, setoptionD] = useState('');
  const [correctOption, setCorrectOption] = useState('');
  const [items, setItems] = useState([]);
  const [notes, setNotes] = useState([]);
  const addNewQuizQuestion = () => {
    const newQuestion = {
      question: Question,
      options: [optionA, optionB, optionC, optionD, correctOption]
    };
    setNotes([...notes, newQuestion]);
    setQuestion('');
    setoptionA('');
    setoptionB('');
    setoptionC('');
    setoptionD('');
    setModalVisible(false);
};
const MakeQuiz = async () => {
  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "TopicId": 1,
  "SessionId": 7,
  "QuizList": [
    {
      "Question": "Sample question 1",
      "OptA": "Option A",
      "OptB": "Option B",
      "OptC": "Option C",
      "OptD": "Option D",
      "CorrectOpt": "Option A"
    },
    {
      "Question": "Sample question 2",
      "OptA": "Option A",
      "OptB": "Option B",
      "OptC": "Option C",
      "OptD": "Option D",
      "CorrectOpt": "Option C"
    },
    {
      "Question": "Sample question 3",
      "OptA": "Option A",
      "OptB": "Option B",
      "OptC": "Option C",
      "OptD": "Option D",
      "CorrectOpt": "Option B"
    }
  ]
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

const response = await fetch(`${global.apiURL}teacher/MakeQuiz`, requestOptions)

}
  const renderNoteItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
    setModalVisible(false);
  };
  return(
  <View style={styles.container}>
    <View style={styles.weekContainer} >
    <TouchableOpacity style={{height: '100%',fontWeight: "bold",color: "#5D9C59",}}
    onPress={() => setModalVisible(true)}>
            <FontAwesomeIcon style={{fontSize: 35,left:300,top:20,color:'green'}} name="plus" />
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
               <Text style={{color: "#5D9C59",fontSize: 20}}>Quiz</Text>      
        <TextInput placeholder="Question" style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "#C7E8CA",borderWidth: 1,borderColor: "#C7E8CA"}} value={Question}
          onChangeText={text => setQuestion(text)}/>      
        <TextInput placeholder="Option A" style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "#C7E8CA",borderWidth: 1,borderColor: "#C7E8CA", marginTop:-0}} value={optionA}
          onChangeText={text => setoptionA(text)}/>
              <TextInput placeholder="Option B" style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "#C7E8CA",borderWidth: 1,borderColor: "#C7E8CA", marginTop:-0}} value={optionB}
          onChangeText={text => setoptionB(text)}/>
              <TextInput placeholder="Option C" style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "#C7E8CA",borderWidth: 1,borderColor: "#C7E8CA", marginTop:-0}} value={optionC}
          onChangeText={text => setoptionC(text)}/>
            <TextInput placeholder="Option D" style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "#C7E8CA",borderWidth: 1,borderColor: "#C7E8CA", marginTop:-0}} value={optionD}
          onChangeText={text => setoptionD(text)}/>
          <TextInput placeholder="Correct Option" style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "#C7E8CA",borderWidth: 1,borderColor: "#C7E8CA", marginTop:-0}} value={correctOption}
          onChangeText={text => setCorrectOption(text)}/>
              <View style={styles.modalButtonContainer}>
                <Pressable style={styles.modalButton} onPress={() =>addNewQuizQuestion()}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        
        <FlatList
  data={notes}
  renderItem={({ item, index }) => (
    <View style={{ padding: 10 }}>
      <Text>{index + 1}. {item.question}</Text>
      <Text style={{ marginLeft: 10 }}>A. {item.options[0]}</Text>
      <Text style={{ marginLeft: 10 }}>B. {item.options[1]}</Text>
      <Text style={{ marginLeft: 10 }}>C. {item.options[2]}</Text>
      <Text style={{ marginLeft: 10 }}>D. {item.options[3]}</Text>
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
/>
        </View>
       
  </View>
  );
}
const styles = StyleSheet.create({
  container: {
     flex: 1,
     borderWidth: 1,
     backgroundColor: "#DDF7E3"
     // borderColor: "#000000"
  },
  weekContainer: {
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: '#DDF7E3',
    borderRadius: 5,
    padding: 20,
    margin: 5,
    alignItems: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#a0aec0',
    borderRadius: 5,
    height: 100,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  modalButton: {
    backgroundColor: '#C7E8CA',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    bottom:-10
  },
  modalButtonText: {
    color: 'green',
    fontWeight: 'bold',
  }
});
 export default Quiz;