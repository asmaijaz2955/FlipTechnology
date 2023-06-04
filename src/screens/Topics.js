import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';
import { FAB, Provider } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
const Topics = ({ navigation }) => {
    const [currency, setCurrency] = useState('US Dollar');
    const [selectedItem, setselectedItem] = useState('1');
    const [selectedItems, setselectedItems] = useState([]);
    const [topic, settopic] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const route = useRoute();
    let courseId = route.params.courseId;
    console.log("courseId", courseId);
    let user = route.params.user;
    let userId = user.userId;
    console.log('user', userId);
    useEffect(() => {
        getAllTopics();
    }, [])
    const getAllTopics = async () => {
        console.log('CourseId', courseId)
        const response = await fetch(`${global.apiURL}Hod/getAllTopics?courseId=${courseId}`)
        const data = await response.json()
        console.log("JSON DATA", data)
        settopic(data)
    };
   return(
    <FlatList
    data={topic}
    keyExtractor={(item, index) => index}
    renderItem={({ item }) => (
       <Pressable onPress={() => navigation.navigate("PlayVideo", { lessonId: item.LessonId, user: user, topicId: item.Topic_id })}>
          <View style={styles.weekContainer}>
             <Text style={styles.weekText}>{item.TopicName}</Text>
          </View>
       </Pressable>
    )}
 />
   )
};
export default Topics;
const styles = StyleSheet.create({
    //Check project repo for styles
    container: {
        flex: 1,
        borderWidth: 1,
        backgroundColor: "white"
        // borderColor: "#000000"
    },
    weekContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
        borderColor: '#224B0C',
        paddingHorizontal: 20,
    },
    weekText: {
        fontSize: 16,
        height: '170%',
        width: '100%',
        backgroundColor: '#C1D5A4',
        borderColor: '#224B0C',
        alignItems: 'center',
        justifyContent: 'center', // Add this line
        textAlign: 'center', // Add this line
        top: 10
      }
});