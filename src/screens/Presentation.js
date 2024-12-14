import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FAB, Provider, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const Presentation = ({ navigation, route }) => {
  const [newItem, setNewItem] = useState('');
  let selectedItems = route.params.selectedItems;
  console.log("selecteditem", selectedItems);

  let courseId = route.params.courseId;
  // console.log("topicid",topicId);
  let user = route.params.user;
  let userId = user.userId;
  console.log("User", user);
  const [selectedItem, setselectedItem] = useState('1');
  // const [topic, setTopic] = useState([]);
  const [date, setDate] = useState(new Date(1672464000000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  useEffect(() => {
    getTopics();
  }, [selectedItem])
  const [selectedValue, setSelectedValue] = useState('');
  const [topic, setTopic] = useState([]);
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
  const savePresentation = async () => {
    console.log("selecteditems", selectedItems, selectedValue, userId);
    const std_ids = selectedItems.map(obj => obj.std_id)
    const dateParts = date.toLocaleDateString().split("/");
    const year = dateParts[2];
    const month = String(dateParts[0]).padStart(2, '0');
    const day = String(dateParts[1]).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log('data', std_ids, formattedDate, userId, selectedValue)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "studentId": std_ids,
      "topicId": selectedValue,
      "date": formattedDate,
      "t_id": userId,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    const response = await fetch(`${global.apiURL}teacher/AssignPresentation`, requestOptions)
    const data = await response.json()
    console.log('response from JSON', data)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  return (
    <View style={styles.container}>
      <Picker
        style={styles.inputv}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => handleValueChange(itemValue)}>
        {topic.map((item) => (
          <Picker.Item
            key={item.topic_id}
            label={item.topicName}
            value={item.topic_id}
          />
        ))}
      </Picker>
      <Text style={{ color: '#224B0C', fontSize: 20, left: 40, marginTop: 20 }}>Date</Text>
      {/* <TextInput placeholder="Date" style={{
        fontFamily: "roboto-regular", color: "#121212", height: 50, width: 300,
        backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: 150, left: 35, position: 'absolute'
      }} value={date}
        onChangeText={text => setDate(text)} /> */}
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Text style={styles.darkText}>{date.toLocaleDateString()}</Text>
        <IconButton
          icon="clipboard-text-clock-outline"
          mode="contained"
          iconColor={'black'}
          size={30}
          onPress={() => setShow(!show)}
        />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          onChange={onChange}
          display={'inline'}
        />
      )}

      <FAB
        style={styles.fabSave}
        small
        label='Save'
        onPress={savePresentation}
        color='white'
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
    width: 300,
    marginTop: 30,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: "#C1D5A4",
    borderColor: '#224B0C',
    marginLeft: 12,
  },
  fabSave: {
    position: 'absolute',
    margin: 16,
    left: 100,
    bottom: 0,
    backgroundColor: '#224B0C',
    width: 150
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  darkText: {
    color: 'black',
  },
}
);