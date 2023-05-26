import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useRoute } from '@react-navigation/native';
import { FAB, Provider } from 'react-native-paper';
const WeekTopics = ({ navigation }) => {
   const [currency, setCurrency] = useState('US Dollar');
   const [selectedItem, setselectedItem] = useState('1');
   const [topic, settopic] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [newItem, setNewItem] = useState('');
   const [session, setSession] = useState('');
   const route = useRoute();
   let courseId = route.params.courseId
   console.log("courseId", courseId)
   let user = route.params.user
   console.log('user', user)
   useEffect(() => {
      getTopics();
      getSession();
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
   const getSession = async () => {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      const response = await fetch(`${global.apiURL}teacher/getCurrentSession?currentDate=${formattedDate}`)
      const data = await response.json()
      console.log("JSON DATA", data)
      setSession(data)
   }
   const navigateToUploadVideo = () => {
      const teacherId = user.userId
      // const courseId = courseId
      // console.log("Teacher ID/Course ID", teacherId, courseId)
      // const 
      navigation.navigate("UploadVideo", { teacherId, courseId })
   }
   const renderItem = ({ item, index }) => {
      return (
         <View style={styles.weekContainer} key={index}>
            <Text style={styles.weekText}>{item.topic_name}</Text>
            <TouchableOpacity style={{ backgroundColor: '#C1D5A4', height: '150%', fontWeight: "bold", color: "#5D9C59", }}
               onPress={() => setModalVisible(true)}>
               <Text style={{ color: '#224B0C' }}> Add Quiz</Text>
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
                <Pressable style={styles.modalButton} onPress={() => navigation.navigate("Quiz", { session: session })}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
               {/* Modal content */}
            </Modal>
         </View>
      )
   }
   return (
      <View style={styles.container}>
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
         <View style={{ marginVertical: 10 }}></View>
         {/* <FlatList
               data={topic}
               keyExtractor={(item, index) => index}
               renderItem={({ item }) => {
                  return(
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
                <Pressable style={styles.modalButton} onPress={() => navigation.navigate("Quiz", { session: session })}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
                     </View>
                     )
               }}
            /> */}
         <FlatList data={topic}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
         />
         <View style={{ flexDirection: 'row',  justifyContent: 'space-between', padding: 15 }}>
            <FAB
               style={styles.fab}
               small
               icon="plus"
               onPress={navigateToUploadVideo}
               color='white'
            />
            <FAB
               style={styles.fab}
               small
               label='Assign'
               onPress={() => navigation.navigate('AssignPresentation', { courseId, user })}
               color='white'
            />
            <FAB
               style={styles.fab}
               small
               label='Evalute'
               onPress={() => navigation.navigate('Evaluation', {user})}
               color='white'
            />

         </View>
      </View>
   );
};
export default WeekTopics;
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
      bottom: -5,
      width: '92%',
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
      bottom: -10
   },
   modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
   },
   fab: {
      backgroundColor: '#224B0C',
      color: 'white'
   },
   fabSave: {
      position: 'absolute',
      margin: 16,
      left: 15,
      bottom: 0,
      backgroundColor: '#224B0C',
   },
   fab1: {
      position: 'absolute',
      margin: 16,
      left: 10,
      bottom: 0,
      backgroundColor: '#224B0C',
   },
   saveButton: {
      backgroundColor: '#224B0C',
      padding: 10,
      width: '45%',
      left: 170,
      borderRadius: 5,
      alignItems: 'center',
   },
   saveButtonText: {
      color: '#FFF',
      fontWeight: 'bold',
   },
});