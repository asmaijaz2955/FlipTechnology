import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ant from 'react-native-vector-icons/AntDesign';
// import { Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
const Videos = ({ navigation, route }) => {
  // let lessonId = route.params.lessonId
  // let lessonId = route.params
  // console.log('params', lessonId)
  // let user = route.params.user
  const source = { uri: `http://192.168.165.251/FlipTech_Fyp/File/Assig3-Hifza-2984-BCS(8C).pdf`, cache: true };
  const { lessonId, user, topicId } = route.params;
  let userId = user.userId;
  console.log("User", userId);
  console.log('user', topicId)
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [selectedRating, setSelectedRating] = useState(0);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);
  const [video, setVideo] = useState({});
  const [studentId, setStudentId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videoDataId, setvideoDataId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [cumulativeRating, setCumulativeRating] = useState(0);
  const [views, setViews] = useState(40);
  const now = new Date();
  const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const formattedTime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  const getVideos = async () => {
    // console.log('lesson id', lessonId)
    const response = await fetch(`${global.apiURL}student/getVideos?lessonId=${lessonId}`)
    response.json().then(async data => {
      // console.log('DATA Video', data)
      const topicVideo = data.find(d => d.topic_id === topicId)
      console.log('asdasdasds', topicVideo)
      // setvideoDataId(data[0].v_data_id)
      setvideoDataId(topicVideo.v_data_id)
      setStudentId()
      // setVideo(data[0])
      setVideo(topicVideo)
      const startt = data[0].start_time.split(':').reduce((acc, time) => (60 * acc) + +time)
      const enddd = data[0].end_time.split(':').reduce((acc, time) => (60 * acc) + +time)
      // console.log('start seconds', startt)
      // console.log('end seconds', enddd)
      setStart(startt);
      setEnd(enddd);
      console.log("magic")
      const response1 = await fetch(`${global.apiURL}student/getNotes?studentId=${user.userId}&videoDataId=${data[0].v_data_id}`);
      const data1 = await response1.json();
      setNotes(data1)
      console.log("test Data", data1)
    });
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      // Call your function here
      setShowQuizModal(true);
      console.log('ran')
    }, 10000); // 20 seconds in milliseconds
    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);
  // useEffect(() => {
  //   // AsyncStorage.setItem('note', note);

  useEffect(() => {
    getVideos();
    getCumulativeRating();
    getViews();
  }, []);
  useEffect(() => {
    if (videoDataId) {
      getCumulativeRating();
    }
  }, [videoDataId]);
  // }, [note]);
  const handleStarClick = async (rating) => {
    console.log(`Selected rating: ${rating}`);
    var requestOptions = {
      method: 'POST',
      redirect: 'follow'
    };
    const response = await fetch(`${global.apiURL}student/rate_video?videoId=${video.v_id}&videoDataId=${videoDataId}&rate=${rating}&studentId=${userId}`, requestOptions)
    const data = await response.json()
    console.log("JSON DATA", data)
    setSelectedRating(rating);
  };
  const getCumulativeRating = async () => {
    try {
      console.log("getComulativeRating")
      const response = await fetch(`${global.apiURL}student/getComulativeRating?videoDataId=${videoDataId}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log("getComulativeRating", data)
        if (data.length > 0) {
          const sum = data.reduce((total, item) => total + item.rating, 0);
          setCumulativeRating(sum);
          setSelectedRating(sum)
        }
      }
    } catch (error) {
      console.log(error.toString(), "here");
    }
  };
  const getViews = async () => {
    try {
      const response = await fetch(`${global.apiURL}student/getViews?videoId=${videoId}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log("Views",data)
        setViews(data[0].views);
      }
    } catch (error) {
      console.log(error.toString());
    }
  };
  const saveHistory = async () => {
    try {
      const response = await fetch(`${global.apiURL}/student/saveHistory`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: userId,
          videoId: videoId,
          date: formattedDate,
          time: formattedTime,
        }),
      });

      if (response.status === 200) {
        console.log('History saved successfully');
      }
    } catch (error) {
      console.log(error.toString());
    }
  };
  const handleNoteSave = async () => {
    console.log(note, video.v_data_id, video.v_id)
    if (note) {
      const response = await fetch(`${global.apiURL}student/saveNotes?studentId=${user.userId}&notes=${note}&videoId=${video.v_id}&videoDataId=${video.v_data_id}`, { method: "POST" });
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
  const handleQuizAttempt = () => {
    // handle the logic for when the quiz is attempted
    // navigate to the next screen
    navigation.navigate('AttemptQuiz', { topicId: topicId, user: user });
  }
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
            onPress={() => handleStarClick(rating)}
          >
            <Text style={[
              styles.ratingStar,
              {
                color: rating <= selectedRating ? '#ffc107' : '#ccc'
              }
            ]}>&#9733;</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.viewCount}>
        <View style={styles.eyeIcon}>
          <Text style={styles.eyeIconText}>👀</Text>
        </View>
        <View style={styles.viewCountText}>
          <Text style={styles.viewCountNumber}>Views: {views}</Text>
        </View>
      </View>
      <View>
        {/* Quiz Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showQuizModal}
          onRequestClose={() => {
            setShowQuizModal(!showQuizModal)
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.modalButton} onPress={handleQuizAttempt}>
                <Text style={styles.modalButtonText}>Attempt Quiz</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* Quiz Modal */}
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
                placeholderTextColor='#224B0C'
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
      <View style={styles.pdfcontainer}>
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf} />
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

  pdfcontainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: 'white'

  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  },
  headerText: {
    fontSize: 20
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  ratingStar: {
    fontSize: 30,
    marginRight: 5
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
    marginLeft: 250,
    color: '#224B0C'
  },
  noteInputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#a0aec0',
    backgroundColor: 'white'
  },
  noteButton: {
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  noteButtonText: {
    borderRadius: 15,
    color: '#4a5568',
    backgroundColor: `white`
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
    color: '#224B0C'
  },
  noteContainer: {
    backgroundColor: '#C1D5A4',
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
    color: '#224B0C'
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
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Videos;