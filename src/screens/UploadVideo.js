import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Slider from '@react-native-community/slider';
const UploadVideo = ({ route }) => {
  const { teacherId, courseId } = route.params
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
    }
    setMetaData([...metaData, obj])
  }
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

  }
  return (
    <View style={styles.container}>
      <View style={styles.urlRow}>
        <Text style={styles.url}>url:</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.play}>Play</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.urlRowFiller}>
        <TextInput placeholder="url" style={styles.textInput}
          onChangeText={text => setUrl(text)}></TextInput>
      </View>
      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: url }}
        />
      </View>
      <View style={styles.noteInputContainer}>
        <View>
          <Text style={{marginTop:25}} >Start Time:{startTime}</Text>
          <Slider style={styles.slider}
            value={startTime}
            onValueChange={value => setStartTime(value)}
            // style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor={styles.primary}
            maximumTrackTintColor={styles.secondary}
          />
          <Text style={{marginTop:15}} >End Time:{endTime}</Text>
          <Slider style={styles.slider1}
            value={endTime}
            onValueChange={value => setEndTime(value)}
            // style={{width: 200, height: 40}}
            minimumValue={5}
            maximumValue={10}
            minimumTrackTintColor={styles.primary}
            maximumTrackTintColor={styles.secondary}
          />
        </View>
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
              Start Time: {item.StartTime} - End Time: {item.EndTime}
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
    backgroundColor: '#DDF7E3',
    borderWidth: 1,
  },
  item: {
    backgroundColor: '#C7E8CA',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 16,
    top: 15
  },
  itemTopic: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemTime: {
    fontSize: 16,
  },

  header: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  headerText: {
    fontSize: 20
  },
  videoContainer: {
    position: 'relative',
    height: 160, // fixed pixel value
    width: '100%', // take full width of the container
    marginTop: -325,
    backgroundColor: '#000',
    top: 25
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  noteInputContainer: {
    marginBottom: -8,
    },
  slider: {
    flexDirection: 'row',
    width: 350,
    bottom:-10
  },
  slider1: {
    flexDirection: 'column',
    width: 360,
    bottom:-10
  },
  primary: {
    backgroundColor: '#C7E8CA',
  },
  secondary: {
    backgroundColor: '#C7E8CA',
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
    marginTop:30
    },
    topicInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    paddingLeft: 10,
    marginRight: 10,
    marginTop:30
    },
    addButton: {
    backgroundColor: '#5D9C59',
    padding: 10,
    borderRadius: 15,
    marginTop:30
    },
    addIcon: {
    color: '#FFF',
    fontSize: 20,
    },
  url: {
    color: "#5D9C59",
    marginTop: -75,
    fontSize: 35
  },
  button: {
    width: 64,
    height: 59,
    marginTop: -75,
    backgroundColor: "#C7E8CA",
    borderColor: "#C7E8CA",
    borderRadius: 26,
    marginLeft: 218
  },
  play: {
    fontFamily: "roboto-700",
    color: "#5D9C59",
    fontSize: 20,
    marginTop: 12,
    marginLeft: 13
  },
  urlRow: {
    height: 59,
    flexDirection: "row",
    marginLeft: 9,
    marginTop: 87
  },
  textInput: {
    fontFamily: "roboto-regular",
    color: "#121212",
    height: 50,
    width: 200,
    backgroundColor: "#C7E8CA",
    borderWidth: 1,
    borderColor: "#C7E8CA",
    marginTop: -130
  },
  urlRowFiller: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  metaDataItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    },
    metaDataTopic: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    },
    metaDataTime: {
    fontSize: 14,
    },
  saveButton: {
    backgroundColor: '#5D9C59',
    padding: 10,
    width:'30%',
    left:240,
    borderRadius: 5,
    alignItems: 'center',
    },
    saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    },
});
