import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,Button, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import { FontAwesome } from '@expo/vector-icons';

const Videos = ({ route }) => {
  let lessonId = route.params.lessonId
  const [selectedRating, setSelectedRating] = useState(0);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [video, setVideo] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const start = 0
  const end = 0
  const getVideos = async () => {
    const response = await fetch(`${global.apiURL}student/getVideos?lessonId=${lessonId}`)
    const data = await response.json();
    console.log('DATA Video', data[0])
    setVideo(data[0])
    start = data[0].start_time.split(':').reduce((acc,time) => (60 * acc) + +time);
    end = data[0].end_time.split(':').reduce((acc,time) => (60 * acc) + +time);
    console.log(seconds)
  }

  useEffect(() => {
    // AsyncStorage.setItem('note', note);
  }, [note]);
  useEffect(() => {
    getVideos()
  }, []);

  useEffect(() => {
    // AsyncStorage.getItem('note').then(value => {
    //   if (value !== null) {
    //     setNote(value);
    //   }
    // });
  }, []);
  // const toggleModal = () => {
  //   setModalVisible(!modalVisible);
  // };

  const handleStarClick = (rating) => {
    console.log(`Selected rating: ${rating}`);
    setSelectedRating(rating);
  };

  // const handleNoteChange = (text) => {
  //   setNote(text);
  // };
  const handleNoteSave = () => {
    if (note) {
    const newNote = {
    note: note,
  };
  setNotes([...notes, newNote]);
  setNote('');
  setSelectedRating(0);
  }
  };
  const renderNoteItem = ({ item }) => {
    return (
    <View style={styles.noteContainer}>
    <Text style={styles.noteText}>{item.note}</Text>
    </View>
    );
    };
 return (
    <View style={styles.container}>
     <Image
        source={require('./Assets/Icon/search.png')}
        resizeMode="contain"
        style={styles.image}
      />

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
          <Text style={styles.viewCountNumber}>1,234 views</Text>
        </View>
      </View>
      <View>
      {/* <Button title="Open Modal" onPress={toggleModal} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput style={styles.modalText}onChangeText={newText => setNotes(newText)}/>
            <Button title="Save" onPress={toggleModal} />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
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
  <Text style={styles.noteButtonText}>Add a note</Text>
  </TouchableOpacity>
  <TextInput
  style={styles.noteInput}
  placeholder="Take a note"
  placeholderTextColor="#a0aec0"
  value={note}
  onChangeText={(text) => setNote(text)}
  multiline={true}
  />
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
    position
      : 'relative',
    height: Dimensions.get('window').width * 0.5625, // 16:9 aspect ratio
    backgroundColor: '#000'
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  noteInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#a0aec0',
    },
    noteButton: {
    padding: 10,
    backgroundColor: '#f7fafc',
    borderRadius: 5,
    marginRight: 10,
    },
    noteButtonText: {
    color: '#4a5568',
    },
    noteInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
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
    backgroundColor: '#edf2f7',
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
    marginTop: 10,
    marginLeft: 10
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
  // noteContainer: {
  //   margin: 20,
  //   borderWidth: 1,
  //   borderColor: '#ccc',
  //   borderRadius: 5,
  //   padding: 10
  // },
  // noteHeader: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#aaa',
  //   paddingBottom: 5,
  //   marginBottom: 10
  // },
  // noteHeaderText: {
  //   fontSize: 16
  // },
  // noteInputContainer: {
  //   marginBottom: 10
  // },
  // noteInput: {
  //   fontSize: 14
  // },
  // saveButtonContainer: {
  //   display: 'flex',
  //   alignItems: 'flex-end'
  // },
  // saveButton: {
  //   backgroundColor: '#4285f4',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginTop: 10
  // },
  // saveButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   textAlign: 'center'
  // },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 22,
  // },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: 'center',
  // },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
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
      backgroundColor: '#4a5568',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      },
      modalButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      },
});

export default Videos;