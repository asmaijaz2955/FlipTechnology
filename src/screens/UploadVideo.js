import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const UploadVideo = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [note, setNote] = useState('');
  const startTime=120;

  useEffect(() => {
    // AsyncStorage.setItem('note', note);
  }, [note]);

  useEffect(() => {
    // AsyncStorage.getItem('note').then(value => {
    //   if (value !== null) {
    //     setNote(value);
    //   }
    // });
  }, []);

  const handleStarClick = (rating) => {
    console.log(`Selected rating: ${rating}`);
    setSelectedRating(rating);
  };

  const handleNoteChange = (text) => {
    setNote(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Lecture Video</Text>
      </View>

      <View style={styles.videoContainer}>
        <WebView
          source={{ uri: 'https://www.youtube.com/embed/wOhLyP-SAn0?start=120' }}
          style={styles.video}
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
          <Text style={styles.viewCountNumber}>1,234,567 views</Text>
        </View>
      </View>

      <View style={styles.noteContainer}>
        <View style={styles.noteHeader}>
          <Text style={styles.noteHeaderText}>Notepad</Text>
        </View>

        <View style={styles.noteInputContainer}>
          <TextInput
            style={styles.noteInput}
            multiline={true}
            numberOfLines={10}
            value={note}
            onChangeText={handleNoteChange}
          />
        </View>

        <View style={styles.saveButtonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => alert(note)}
          >
            <Text style={styles.saveButtonText}>Save Note</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0'

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
    noteContainer: {
    margin: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10
    },
    noteHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa',
    paddingBottom: 5,
    marginBottom: 10
    },
    noteHeaderText: {
    fontSize: 16
    },
    noteInputContainer: {
    marginBottom: 10
    },
    noteInput: {
    fontSize: 14
    },
    saveButtonContainer: {
    display: 'flex',
    alignItems: 'flex-end'
    },
    saveButton: {
    backgroundColor: '#4285f4',
    borderRadius: 5,
    padding: 10,
    marginTop: 10
    },
    saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
    }
    });
    
    export default UploadVideo;