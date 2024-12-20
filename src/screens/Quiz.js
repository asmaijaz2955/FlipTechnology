import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { FAB, Provider } from 'react-native-paper';

const Quiz = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);
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
      Question: Question,
      OptA: optionA,
      OptB: optionB,
      OptC: optionC,
      OptD: optionD,
      CorrectOpt: correctOption
      // options: [optionA, optionB, optionC, optionD, correctOption]
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
      "QuizList": notes
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const response = await fetch(`${global.apiURL}teacher/MakeQuiz`, requestOptions)
    const data = await response.json()
    console.log('data', data)
  }
  const renderNoteItem = () => {
    setItems([...items, newItem]);
    setNewItem('');
    setModalVisible(false);
  };
  return (
    <Provider>

      <View style={styles.container}>
        <View style={styles.weekContainer} >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={{ color: '#224B0C', fontSize: 20 }}>Quiz</Text>
                <TextInput placeholder="Question" style={{
                  fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                  backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C'
                }} value={Question}
                  onChangeText={text => setQuestion(text)} />
                <TextInput placeholder="Option A" style={{
                  fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                  backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: -0
                }} value={optionA}
                  onChangeText={text => setoptionA(text)} />
                <TextInput placeholder="Option B" style={{
                  fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                  backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: -0
                }} value={optionB}
                  onChangeText={text => setoptionB(text)} />
                <TextInput placeholder="Option C" style={{
                  fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                  backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: -0
                }} value={optionC}
                  onChangeText={text => setoptionC(text)} />
                <TextInput placeholder="Option D" style={{
                  fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                  backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: -0
                }} value={optionD}
                  onChangeText={text => setoptionD(text)} />
                <TextInput placeholder="Correct Option" style={{
                  fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                  backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: -0
                }} value={correctOption}
                  onChangeText={text => setCorrectOption(text)} />
                <View style={styles.modalButtonContainer}>
                  <Pressable style={styles.modalButton} onPress={() => addNewQuizQuestion()}>
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
                <Text>{index + 1}. {item.Question}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.OptA}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.OptB}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.OptC}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.OptD}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.CorrectOpt}</Text>
                {/* <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.options[0]}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.options[1]}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.options[2]}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.options[3]}</Text>
                <Text style={{ marginLeft: 10, backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', }}> {item.options[4]}</Text> */}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/* <TouchableOpacity style={{ borderWidth: 1, fontWeight: "bold", backgroundColor: '#224B0C', borderRadius: 20, position: 'absolute' }}
          onPress={() => {
            console.log("presssed")
            setModalVisible(true)
          }}>
          <FontAwesomeIcon style={{ fontSize: 35, color: 'white' }} name="plus" />
        </TouchableOpacity> */}
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setModalVisible(true)}
        />
        <FAB
          style={styles.fabSave}
          small
          label='Save'
          onPress={MakeQuiz}
        />
        {/* <TouchableOpacity style={styles.saveButton} onPress={MakeQuiz}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity> */}

      </View>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: "white",
    // marginBottom: 100
    // borderColor: "#000000"
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#224B0C',
    color:'white'
  },
  fabSave: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: '#224B0C',
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
    backgroundColor: 'white',
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
    backgroundColor: '#224B0C',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    bottom: -10
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#224B0C',
    padding: 10,
    width: '30%',
    left: 170,
    borderRadius: 5,
    alignItems: 'center',
    top: 660
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
export default Quiz;