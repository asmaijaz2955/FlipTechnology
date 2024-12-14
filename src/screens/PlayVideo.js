import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
const PlayVideo = ({ navigation,route }) => {
  const {lessonId, user, topicId} = route.params;
  console.log('user', topicId)
  const [selectedRating, setSelectedRating] = useState(0);
  const [video, setVideo] = useState({});
  const [videoDataId, setvideoDataId] = useState('');
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const getVideos = async () => {
    // console.log('lesson id', lessonId)
    const response = await fetch(`${global.apiURL}Hod/getVideoForTopic?lessonId=${lessonId}&topicId=${topicId}`)
    response.json().then(async data => {
      // console.log('DATA Video', data)
      const topicVideo = data.find(d => d.topic_id === topicId)
      console.log('asdasdasds', topicVideo)
      // setvideoDataId(data[0].v_data_id)
      setvideoDataId(topicVideo.v_data_id)
      // setVideo(data[0])
      setVideo(topicVideo)
      const startt = data[0].start_time.split(':').reduce((acc, time) => (60 * acc) + +time)
      const enddd = data[0].end_time.split(':').reduce((acc, time) => (60 * acc) + +time)
      // console.log('start seconds', startt)
      // console.log('end seconds', enddd)
      setStart(startt);
      setEnd(enddd);
    });
  }
  useEffect(() => {
    getVideos()
  }, []);
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default PlayVideo;