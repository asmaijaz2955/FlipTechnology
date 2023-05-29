import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Slider, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const UploadVideo = ({ route }) => {
  const { teacherId, courseId } = route.params;
  const [url, setUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [topic, setTopic] = useState('');
  const [metaData, setMetaData] = useState([]);

  const addItem = () => {
    const obj = {
      TopicName: topic,
      StartTime: startTime,
      EndTime: endTime
    };
    setMetaData([...metaData, obj]);
  };

  const handleSave = async () => {
     // console.log(url)
    // console.log(teacherId)
    // console.log(courseId)
    // console.log(metaData)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "Url": url,
      "TeacherId": teacherId,
      "CourseId": courseId,
      "MetaData": metaData
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    const response = await fetch(`${global.apiURL}/teacher/saveVideoAndMetaData`, requestOptions)
    const data = await response.json()
    console.log('RES', data)
    setMetaData([])
    setUrl('')
    setEndTime(0)
    setStartTime(0)
    setTopic('')
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.urlRow}>
        <Text style={styles.urlLabel}>URL:</Text>
        <TextInput
          placeholder="Enter URL"
          style={styles.urlInput}
          onChangeText={text => setUrl(text)}
        />
      </View>
      <View style={styles.videoContainer}>
        <WebView source={{ uri: url }} />
      </View>
      <View style={styles.noteInputContainer}>
        <Text style={styles.startTimeLabel}>Start Time: {startTime}</Text>
        <Slider
          style={styles.slider}
          value={startTime}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={styles.primary}
          maximumTrackTintColor={styles.secondary}
          onValueChange={value => setStartTime(value)}
        />
        <Text style={styles.endTimeLabel}>End Time: {endTime}</Text>
        <Slider
          style={styles.slider}
          value={endTime}
          minimumValue={5}
          maximumValue={10}
          minimumTrackTintColor={styles.primary}
          maximumTrackTintColor={styles.secondary}
          onValueChange={value => setEndTime(value)}
        />
      </View>
      <View style={styles.topicInputContainer}>
        <Text style={styles.topicLabel}>Topic:</Text>
        <TextInput
          style={styles.topicInput}
          placeholder="Enter topic"
          value={topic}
          onChangeText={setTopic}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <FontAwesomeIcon style={styles.addIcon} name="plus" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={metaData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.metaDataItem}>
            <Text style={styles.metaDataTopic}>{item.TopicName}</Text>
            <Text style={styles.metaDataTime}>
              Start Time: {item.StartTime}
            </Text>
            <Text style={styles.metaDataTime}>
              End Time: {item.EndTime}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  urlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  urlLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  urlInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#224B0C',
    borderRadius: 5,
    paddingLeft: 10,
  },
  videoContainer: {
    aspectRatio: 27 / 14,
    borderWidth: 1,
    borderColor: '#224B0C',
    marginBottom: 20,
    width:'100%'
  },
  noteInputContainer: {
    marginBottom: 20,
  },
  startTimeLabel: {
    marginTop: 10,
    color: '#224B0C',
  },
  endTimeLabel: {
    marginTop: 20,
    color: '#224B0C',
  },
  slider: {
    width: '100%',
  },
  primary: {
    backgroundColor: '#224B0C',
  },
  secondary: {
    backgroundColor: '#224B0C',
  },
  topicInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  topicLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#224B0C',
  },
  topicInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#224B0C',
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#224B0C',
    padding: 10,
    borderRadius: 15,
  },
  addIcon: {
    color: 'white',
    fontSize: 20,
  },
  metaDataItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#224B0C',
    borderRadius: 5,
    padding: 10,
  },
  metaDataTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#224B0C',
  },
  metaDataTime: {
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#224B0C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
