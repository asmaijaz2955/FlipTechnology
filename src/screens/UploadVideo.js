import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { FAB } from 'react-native-paper';
import { PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import Slider from '@react-native-community/slider';
const UploadVideo = ({ route }) => {
  let selectedItem=route.params.selectedItem;
  console.log("slitem",selectedItem)
  // const [filename, setFileName] = useState();
  // useEffect(() => {
  //   if (fileQuiz) {
  //     setFileName(fileQuiz[0].name);
  //   }
  // }, []);
  // async function sendFileQuiz() {

  //   if (Platform.OS === 'android') {
  //     // Calling the permission function
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //       {
  //         title: 'Example App Camera Permission',
  //         message: 'Example App needs access to your camera',
  //       },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       // Permission Granted
  //       selectFileQuiz();
  //     } else {
  //       // Permission Denied
  //       alert('CAMERA Permission Denied');
  //     }
  //   } else {
  //     selectFileQuiz();
  //   }


  // }
  // const selectFileQuiz = async () => {

  //   try {
  //     const excelFile = await DocumentPicker.pick({

  //     });

  //     console.log(excelFile)


  //     setFileQuiz(excelFile);
  //     console.log('fieQuiz', fileQuiz);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileQuiz, setFileQuiz] = useState(null);
  const { teacherId, courseId } = route.params;
  const [url, setUrl] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [topic, setTopic] = useState('');
  const [metaData, setMetaData] = useState([]);
  const [page, setPage] = useState('');
  console.log("PageNo",page)
  const addItem = () => {
    const obj = {
      TopicName: topic,
      StartTime: startTime,
      EndTime: endTime,
      PageNo:page
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
     "WeekNo": selectedItem,
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
   setPage()
   setTopic('')
   // .then(response => response.text())
   // .then(result => console.log(result))
   // .catch(error => console.log('error', error));
 };

  // const handleSave = async () => {
  //   // console.log(url)
  //   // console.log(teacherId)
  //   // console.log(courseId)
  //   // console.log(metaData)

    // console.log('selected file ---------------------', fileQuiz[0])

    // const fileData = new FormData();
    // fileData.append('file', {
    //   uri: fileQuiz[0].uri,
    //   type: fileQuiz[0].type,
    //   name: fileQuiz[0].name,
    // });

  //   // Append additional data to the FormData
  //   fileData.append('Url', url);
  //   fileData.append('TeacherId', teacherId);
  //   fileData.append('CourseId', courseId);
  //   fileData.append('WeekNo', selectedItem);
  //   fileData.append('MetaData[0].TopicName', topic);
  //   fileData.append('MetaData[0].PageNo', page);
  //   fileData.append('MetaData[0].StartTime', startTime);
  //   fileData.append('MetaData[0].EndTime', endTime);
  //   // fileData.append('TeacherId', '');

  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "multipart/form-data");

  //   var raw = JSON.stringify({
  //     "Url": url,
  //     "TeacherId": teacherId,
  //     "CourseId": courseId,
  //     "MetaData": metaData
  //   });

  //   var requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: fileData,
  //     redirect: 'follow'
  //   };

  //   const response = await fetch(`${global.apiURL}/teacher/saveVideoAndMetaData`, requestOptions)
  //   const data = await response.json()
  //   console.log('RES', data)
  //   setMetaData([])
  //   setUrl('')
  //   setEndTime(0)
  //   setStartTime(0)
  //   setTopic('')
  // };

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
      <View style={styles.iconContainer}>
        {/* <TouchableOpacity
          style={styles.iconButton}
          onPress={sendFileQuiz}
        > */}
          {/* <Icon name="file-pdf-o" size={30} color="#224B0C" />
        </TouchableOpacity> */}
        {/* <Text style={styles.iconText}>{filename ? filename : ''}</Text> */}
        <TextInput
          style={styles.textInput}
          placeholder="Enter text"
          value={page}
          onChangeText={setPage}
        />
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
  fabSave: {
    position: 'absolute',
    margin: 16,
    left: 10,
    bottom: 350,
    // backgroundColor: '#224B0C',
    // width: 50
  },
  videoContainer: {
    aspectRatio: 27 / 14,
    borderWidth: 1,
    borderColor: '#224B0C',
    marginBottom: 20,
    width: '100%'
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    marginTop: 5,
    color: '#224B0C',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft:10
  },
  textInput: {
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    borderColor: '#224B0C',
    borderRadius: 5,
    paddingLeft: 10,
  },
  noteInputContainer: {
    marginBottom: 20,
    marginTop: 30,
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
