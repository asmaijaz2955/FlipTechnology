import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image,Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';
const TeacherPanel = ({ navigation }) => {
   const [currency, setCurrency] = useState('US Dollar');
   const [selectedItem, setselectedItem] = useState('1');
   const [topic, settopic] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [newItem, setNewItem] = useState('');
   const route = useRoute();
   let courseId = route.params.courseId
   console.log("courseId", courseId)
   let user = route.params.user
   console.log('user', user)
   useEffect(() => {
      getTopics();
   }, [selectedItem])
   const getTopics = async () => {
      console.log('Selected Item', selectedItem)
      console.log('CourseId', courseId)
      // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
      const response = await fetch(`${global.apiURL}teacher/getTopicsOfWeek?courseId=${courseId}&week=${selectedItem}`)
      const data = await response.json()
      console.log("JSON DATA", data)
      settopic(data)
   }
   const navigateToUploadVideo = () =>{
      const teacherId = user.userId
      // const courseId = courseId
      // console.log("Teacher ID/Course ID", teacherId, courseId)
      // const 
      navigation.navigate("UploadVideo", {teacherId, courseId})
   }
   return (
      <View style={styles.container}>
         <View >
            <Picker
               selectedValue={selectedItem}
               onValueChange={(itemValue, itemIndex) =>
                  setselectedItem(itemValue)}
               style={styles.picker}
            >
               {/* <ScrollView style={{flex: 1, height: '100%', width: "100%"}}> */}
               <Picker.Item label="Week 1" value="week1" />
               <Picker.Item label="Week 2" value="week2" />
               <Picker.Item label="Week 3" value="week3" />
               <Picker.Item label="Week 4" value="week4" />
               <Picker.Item label="Week 5" value="week5" />
               <Picker.Item label="Week 6" value="week6" />
               <Picker.Item label="Week 7" value="week7" />
               <Picker.Item label="Week 8" value="week8" />
               <Picker.Item label="Week 9" value="week9" />
               <Picker.Item label="Week 10" value="week10" />
               <Picker.Item label="Week 11" value="week11" />
               <Picker.Item label="Week 12" value="week12" />
               <Picker.Item label="Week 13" value="week13" />
               <Picker.Item label="Week 14" value="week14" />
               <Picker.Item label="Week 15" value="week15" />
               <Picker.Item label="Week 16" value="week16" />

               {/* </ScrollView> */}
            </Picker>
            <View style={{ marginVertical: 20 }}></View>
            <FlatList
               data={topic}
               keyExtractor={(item, index) => index}
               renderItem={({ item }) => (
             <View style={styles.weekContainer} >
            <Text style={styles.weekText}>{item.topic_name}</Text>
           <TouchableOpacity style={{backgroundColor: '#C1D5A4',height: '150%',fontWeight: "bold",color: "#5D9C59",}}
           onPress={() => setModalVisible(true)}>
           <Text style={{color:'#224B0C'}}> Add Quiz</Text>
          </TouchableOpacity>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
               <Text style={{color: '#224B0C',fontSize: 20}}>Quiz Title</Text>      
        <TextInput style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "white",borderWidth: 1,borderColor: '#224B0C'}} value={newItem}
          onChangeText={text => setNewItem(text)}/>
           <Text style={{color: '#224B0C',fontSize: 20}}>Total Marks</Text>      
        <TextInput style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
         backgroundColor: "white",borderWidth: 1,borderColor: '#224B0C', marginTop:-0}} value={newItem}
          onChangeText={text => setNewItem(text)}/>
              <View style={styles.modalButtonContainer}>
                <Pressable style={styles.modalButton} onPress={() => navigation.navigate("Quiz")}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
                     </View>
               )}
            />
            <View style={{ flexDirection: 'row',  alignItems: 'center', padding: 5, margin: 15 }}>
               <TouchableOpacity style={{ padding: 5,left:280,   backgroundColor: 'white' }} onPress={navigateToUploadVideo} >
                  <FontAwesomeIcon style={{ fontSize: 25,color: '#224B0C'}} name="plus"
                  />
               </TouchableOpacity>
            </View >
         </View>
         <TouchableOpacity style={styles.saveButton} onPress={()=>navigation.navigate("StudentPresentation")} >
        <Text style={styles.saveButtonText}>Assign Presentation</Text>
      </TouchableOpacity>
      </View>
   );
};
export default TeacherPanel;
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
      marginVertical: 11,
      borderColor: '#224B0C'
   },
   image: {
      width: 31,
      height: 27,
      marginLeft: 292
   },
   Search: {
      fontSize: 36,
      marginTop: 5,
      height: '6%',
      width: '70%',
      paddingHorizontal: 115,
      backgroundColor: `#C7E8CA`
   },
   weekText: {
      fontSize: 16,
      height: '150%',
      width: '70%',
      backgroundColor: '#C1D5A4',
      borderColor: '#224B0C'
   },
   picker: {
      top: 25,
      bottom: 5,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#C1D5A4',
      borderColor: '#224B0C',
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
      borderColor: '#224B0C',
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
      bottom:-10
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    saveButton: {
      backgroundColor: '#224B0C',
      padding: 10,
      width:'45%',
      left:170,
      borderRadius: 5,
      alignItems: 'center',
    },
    saveButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
    },
});