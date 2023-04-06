import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, Dimensions, Image, Pressable, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Slider from '@react-native-community/slider';
const UploadVideo = ({ route }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const[ play, setPlay]=useState('');
  const[ url, setUrl]=useState('');
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const handleVideo=()=>{
    setUrl(play)
  }
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem('');
    }
  }; 
  return (
    <View style={styles.container}>
      <View style={styles.urlRow}>
<Text style={styles.url}>url:</Text>
<TouchableOpacity style={styles.button} onPress={handleVideo}>
<Text style={styles.play}>Play</Text>
</TouchableOpacity>
</View>
<View style={styles.urlRowFiller}>
<TextInput placeholder="url" style={styles.textInput}
onChangeText={newplay => setPlay(newplay)}></TextInput>
</View>
      <View style={styles.videoContainer}>
        <WebView
          // source={{ uri: 'https://www.youtube.com/embed/wOhLyP-SAn0?start=120' }}
          source={{ uri: url }}
        // source={{ uri: `${video.url}?start=` }}
        // source={{ uri: video.url }}
        // style={styles.video}
        />
      </View>
      <View style={styles.noteInputContainer}>
        <View>
        <Text>Start Time:</Text>
      <Slider style={styles.slider}
              value={sliderValue}
              onValueChange={value => setSliderValue(value)}
              // style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor={styles.primary}
              maximumTrackTintColor={styles.secondary}
            />
               <Text>End Time:</Text>
     <Slider style={styles.slider1}
              value={sliderValue}
              onValueChange={value => setSliderValue(value)}
              // style={{width: 200, height: 40}}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor={styles.primary}
              maximumTrackTintColor={styles.secondary}
            />
            </View>
            </View>
            <View style={{flexDirection:'row',backgroundColor:'#C7E8CA', alignItems:'center', padding:5, margin:15,top:35}}>
        <TextInput
          style={{flex:1, marginLeft:40, height:40}}
          value={newItem}
          onChangeText={text => setNewItem(text)}
          placeholder="Enter new item"
        />
       <TouchableOpacity style={{padding:5}} onPress={addItem}>
             <FontAwesomeIcon style={{fontSize: 25}} name="plus"
    />
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
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
    marginTop: -375,
    backgroundColor: '#000',
    top:25
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  slider:{
    flexDirection:'row',
    width:300,
  },
  slider1:{
    flexDirection:'column',
    width:300,
  },
  primary: {
    backgroundColor: '#C7E8CA',
  },
  secondary: {
    backgroundColor: '#C7E8CA',
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
    backgroundColor: '#DDF7E3',
    top:40
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
    marginTop:12,
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
  marginTop:-130
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

export default UploadVideo;