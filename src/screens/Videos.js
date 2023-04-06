import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
const Videos = ({ route }) => {
  let lessonId = route.params.lessonId
  let user = route.params.user
  console.log('user')
  const [selectedRating, setSelectedRating] = useState(0);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [video, setVideo] = useState({});
  const [studentId, setStudentId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoDataId, setvideoDataId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const getVideos = async () => {
    const response = await fetch(`${global.apiURL}student/getVideos?lessonId=${lessonId}`)
    response.json().then(async data =>{
      console.log('DATA Video', data[0])
    setVideo(data[0])
    setStart(data[0].start_time.split(':').reduce((acc, time) => (60 * acc) + +time));
    setEnd(data[0].end_time.split(':').reduce((acc, time) => (60 * acc) + +time));
    console.log("magic")
    const response1= await fetch(`${global.apiURL}student/getNotes?studentId=${user.userId}&videoDataId=${data[0].v_data_id}`);
    const data1 = await response1.json();
    setNotes(data1)
    console.log("test Data",data1)
    });
  }
  // useEffect(() => {
  //   // AsyncStorage.setItem('note', note);
  // }, [note]);
  useEffect(() => {
    getVideos()
  }, []);

  const handleStarClick = (rating) => {
    console.log(`Selected rating: ${rating}`);
    setSelectedRating(rating);
  };


  const handleNoteSave = async () => {
    console.log(note, video.v_data_id, video.v_id)
    if (note) {
      const response = await fetch(`${global.apiURL}student/saveNotes?studentId=${user.userId}&notes=${note}&videoId=${video.v_id}&videoDataId=${video.v_data_id}`, {method: "POST"});
      const data = await response.json();
      console.log("DATA", data)
      setNote('');
      setSelectedRating(0);
      setModalVisible(!modalVisible);
    }
  };
  const renderNoteItem = ({ item }) => {
    return (
      <View style={styles.noteContainer}>
        <Text style={styles.noteText}>{item.notes}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <WebView
          // source={{ uri: 'https://www.youtube.com/embed/wOhLyP-SAn0?start=120' }}
          source={{ uri: `${video.url}?start=${start}&end=${end}` }}
        // source={{ uri: `${video.url}?start=` }}
        // source={{ uri: video.url }}
        // style={styles.video}
        />
      </View>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <TouchableOpacity
            key={rating}
            style={[
              styles.ratingStar,
              {
                color: rating <= selectedRating ? '#FFD700' : '#ccc'
              }
            ]}
            onPress={() => handleStarClick(rating)}
            onMouseEnter={(event) => {
              event.target.style.color = '#FFD700';
            }}
            onMouseLeave={(event) => {
              event.target.style.color = rating <= selectedRating ? '#FFD700' : '#ccc';
            }}
          >
            <Text>&#9733;</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.viewCount}>
        <View style={styles.eyeIcon}>
          <Text style={styles.eyeIconText}>👀</Text>
        </View>
        <View style={styles.viewCountText}>
          <Text style={styles.viewCountNumber}>234 views</Text>
        </View>
      </View>
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.modalInput}
                placeholder="Add a note"
                placeholderTextColor="#a0aec0"
                value={note}
                onChangeText={(text) => setNote(text)}
                multiline={true}
              />

              <View style={styles.modalButtonContainer}>
                <Pressable style={styles.modalButton} onPress={() => handleNoteSave()}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
                <Pressable style={styles.modalButton} onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.noteInputContainer}>
        <TouchableOpacity style={styles.noteButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.noteButtonText}><FontAwesomeIcon name="plus"
            style={styles.icons}
          ></FontAwesomeIcon></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notesContainer}>
        <Text style={styles.notesTitle}>Notes</Text>
        <FlatList
          data={notes}
          renderItem={renderNoteItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DDF7E3'

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
    // position
    //   : 'relative',
    // height: Dimensions.get('window').width * 0.5595, // 16:9 aspect ratio
    // backgroundColor: '#000'
    position: 'relative',
    height: 160, // fixed pixel value
    width: '100%', // take full width of the container
    backgroundColor: '#000'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  icons: {
    alignSelf: "center",
    fontSize: 25,
    marginTop: 5,
    bottom: 15,
    borderRadius: 5,
    paddingHorizontal: 55,
    marginLeft: 250
  },
  noteInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#a0aec0',
    backgroundColor: '#DDF7E3'
  },
  noteButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  noteButtonText: {
    borderRadius: 15,
    color: '#4a5568',
    backgroundColor: `#C7E8CA`
  },
  noteInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    backgroundColor: '#DDF7E3'
  },
  notesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  notesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noteContainer: {
    backgroundColor: '#C7E8CA',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 16,
  },
  ratingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  ratingStar: {
    fontSize: 30,
    marginRight: 10,
    color: '#000'
  },
  viewCount: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    bottom: 19
  },
  eyeIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF000000',
    borderRadius: 50,
    height: 20,
    width: 20,
    marginRight: 5,
    color: '#000'
  },
  image: {
    width: 31,
    height: 27,
    marginLeft: 292
  },
  eyeIconText: {
    fontSize: 12
  },
  viewCountText: {
    display: 'flex',
    justifyContent: 'center'
  },
  viewCountNumber: {
    fontSize: 12,
    color: '#aaa'
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
  },
  modalButtonText: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default Videos;