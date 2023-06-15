import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import { FAB, Portal, Provider } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { PermissionsAndroid } from 'react-native'
import DocumentPicker from 'react-native-document-picker';
const WeekTopics = ({ navigation }) => {
   const [filename, setFileName] = useState();
   useEffect(() => {
      if (fileQuiz) {
         setFileName(fileQuiz[0].name);
      }
   }, []);
   async function sendFileQuiz() {
      if (Platform.OS === 'android') {
         // Calling the permission function
         const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
               title: 'Example App Camera Permission',
               message: 'Example App needs access to your camera',
            },
         );
         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Permission Granted
            selectFileQuiz();
         } else {
            // Permission Denied
            alert('CAMERA Permission Denied');
         }
      } else {
         selectFileQuiz();
      }


   }
   const selectFileQuiz = async () => {

      try {
         const excelFile = await DocumentPicker.pick({

         });

         console.log(excelFile)


         setFileQuiz(excelFile);
         console.log('fieQuiz', fileQuiz);

      } catch (error) {
         console.log(error);
      }
   };
   const SaveLessonPlan = async () => {
      console.log('selected file ---------------------', fileQuiz[0])

      const fileData = new FormData();
      fileData.append('file', {
         uri: fileQuiz[0].uri,
         type: fileQuiz[0].type,
         name: fileQuiz[0].name,
      });
      fileData.append('CourseId', courseId);
      fileData.append('WeekNo', selectedItem);
      var requestOptions = {
         method: 'POST',
         body: fileData,
         redirect: 'follow'
      };

      const response = await fetch(`${global.apiURL}/teacher/UploadLecturePlan`, requestOptions)
      const data = await response.json()
      console.log('RES', data)
   };
   const [selectedFile, setSelectedFile] = useState(null);
   const [fileQuiz, setFileQuiz] = useState(null);
   const [currency, setCurrency] = useState('US Dollar');
   const [selectedItem, setselectedItem] = useState('1');
   const [selectedItems, setselectedItems] = useState([]);
   const [topic, settopic] = useState([]);
   const [presentationTopic, setPresentationTopic] = useState([]);
   const [modalVisible, setModalVisible] = useState(false);
   const [newItem, setNewItem] = useState('');
   const [session, setSession] = useState('');
   const [isFABGroupOpen, setIsFABGroupOpen] = useState(false);
   const [selectedTopics, setSelectedTopics] = useState([]);
   const route = useRoute();
   let courseId = route.params.courseId;
   console.log("courseId", courseId);
   let user = route.params.user;
   let userId = user.userId;
   console.log('user', userId);
   useEffect(() => {
      getTopics();
      getSession();
      getPresentationTopics();
      console.log('topisx id  ...', selectedItems);
   }, [selectedItem])
   useEffect(() => {
      if (userId) {
         setselectedItems([true]);
      }
      // else{
      //    setselectedItems([false]);
      // }
   }, []);
   const getTopics = async () => {
      console.log('Selected Item', selectedItem)
      console.log('CourseId', courseId)
      // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
      const response = await fetch(`${global.apiURL}teacher/getTopicsOfWeek?courseId=${courseId}&week=${selectedItem}&t_id=${userId}`)
      const data = await response.json()
      console.log("JSON DATA", data)
      settopic(data)
   };
   const getPresentationTopics = async () => {
      // console.log('Selected Item', selectedItem)
      // console.log('CourseId', courseId)
      // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
      const response = await fetch(`${global.apiURL}teacher/GetTopicsAssignedForPresentation?t_id=${userId}&week=${selectedItem}`)
      const data = await response.json()
      console.log("Topics", data)
      setPresentationTopic(data)
   };
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
   };
   function updateTopics(index) {
      settopic(pre => {
         let arr = [...pre]
         arr[index].IsCovered = !arr[index].IsCovered
         return arr
      })
   }
   const saveCommonTopics = async () => {
      const topicIds = selectedItems
         .filter(topic => topic.topic_id !== undefined) // Exclude items without topic_id
         .map(topic => topic.topic_id);
      const dataa = topicIds.map((id, index) => ({ t_id: userId, topic_id: id, c_id: courseId, Status: selectedItems[index].IsCovered }));
      console.log("daata", dataa)
      console.log('tid', topicIds);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify(dataa);

      var requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow'
      };
      const response = await fetch(`${global.apiURL}teacher/SaveCoveredTopics`, requestOptions)
      const data = await response.json()
      console.log('response from JSON', data)
   }
   const navigateToUploadVideo = () => {
      const teacherId = user.userId
      // const courseId = courseId
      // console.log("Teacher ID/Course ID", teacherId, courseId)
      // const 
      navigation.navigate("UploadVideo", { teacherId, courseId, selectedItem })
   };
   // const navigateToEvaluation = (topicId) => {
   //    navigation.navigate("Evaluation", { topicId });
   // };
   const renderItem = ({ item, index }) => {
      const onPress = () => {
         // data: item
      }
      return (
         <View style={styles.weekContainer} key={index}>
            <CheckBox
               style={styles.checkBox}
               value={item.IsCovered}
               onValueChange={() => {
                  updateTopics(index)
                  const updatedItems = selectedItems.includes(item)
                     ? selectedItems.filter(selectedItem => selectedItem !== item)
                     : [...selectedItems, item];
                  setselectedItems(updatedItems);
               }}
            />
            <Text style={styles.weekText}>{item.topic_name}</Text>
            <TouchableOpacity style={{ backgroundColor: '#C1D5A4', height: '110%', fontWeight: "bold", color: "#5D9C59", }}
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
                     <Text style={{ color: '#224B0C', fontSize: 20 }}>Quiz Title</Text>
                     <TextInput style={{
                        fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                        backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C'
                     }} value={newItem}
                        onChangeText={text => setNewItem(text)} />
                     <Text style={{ color: '#224B0C', fontSize: 20 }}>Total Marks</Text>
                     <TextInput style={{
                        fontFamily: "roboto-regular", color: "#121212", height: 50, width: 250,
                        backgroundColor: "white", borderWidth: 1, borderColor: '#224B0C', marginTop: -0
                     }} value={newItem}
                        onChangeText={text => setNewItem(text)} />
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
            <Picker.Item label="Week 1" value="1" />
            <Picker.Item label="Week 2" value="2" />
            <Picker.Item label="Week 3" value="3" />
            <Picker.Item label="Week 4" value="4" />
            <Picker.Item label="Week 5" value="5" />
            <Picker.Item label="Week 6" value="6" />
            <Picker.Item label="Week 7" value="7" />
            <Picker.Item label="Week 8" value="8" />
            <Picker.Item label="Week 9" value="9" />
            <Picker.Item label="Week 10" value="10" />
            <Picker.Item label="Week 11" value="11" />
            <Picker.Item label="Week 12" value="12" />
            <Picker.Item label="Week 13" value="13" />
            <Picker.Item label="Week 14" value="14" />
            <Picker.Item label="Week 15" value="15" />
            <Picker.Item label="Week 16" value="16" />
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
         <Text style={styles.iconText}>{filename ? filename : ''}</Text>
         {/* <TouchableOpacity style={styles.button}
            onPress={saveCommonTopics}>
            <Text style={styles.save}>Save</Text>
         </TouchableOpacity> */}
         <View style={{ marginBottom: 50 }}>
            <Text style={{ color: '#224B0C', left: 20, fontSize: 20 }}>Presentation</Text>
            <FlatList
               data={presentationTopic}
               keyExtractor={(item, index) => index.toString()} // Convert index to string for keyExtractor
               renderItem={({ item }) => {
                  return (
                     <Pressable onPress={() => navigation.navigate("Evaluation", { user: user, topicId: item.topic_id })}>
                        <View style={styles.weekContainer1}>
                           <Text style={styles.weekText1}>{item.topic_name}</Text>
                        </View>
                     </Pressable>
                  );
               }}
            />
         </View>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, bottom: 35 }}>
            {/* <FAB.Group
               open={isFABGroupOpen}
               icon={isFABGroupOpen ? 'close' : 'plus'}
               onPress={() => setIsFABGroupOpen(!isFABGroupOpen)

               }
               actions={[
                  {
                     icon: 'upload',
                     label: 'Upload Video',
                     onPress: navigateToUploadVideo,
                  },
                  {
                     icon: 'upload',
                     label: 'Assign',
                     onPress: () => navigation.navigate('AssignPresentation', { courseId, user }),
                  },
                  {
                     icon: 'file',
                     label: 'Send File Quiz',
                     // onPress: sendFileQuiz(),
                  },
                  {
                     icon: 'content-save',
                     label: 'Save',
                     onPress: saveCommonTopics,
                  },
               ]}
               onStateChange={({ open }) => setIsFABGroupOpen(open)}
               color="white"
               style={styles.fabGroup}
            /> */}
            <FAB.Group
               style={styles.fab}
               open={isFABGroupOpen}
               icon={isFABGroupOpen ? 'close' : 'plus'}
               onPress={() => {
                  setIsFABGroupOpen(!isFABGroupOpen);
               }}
               actions={[
                  {
                     icon: 'upload',
                     label: 'Upload Video',
                     onPress: navigateToUploadVideo,
                  },
                  {
                     icon: 'upload',
                     label: 'Assign',
                     onPress: () => navigation.navigate('AssignPresentation', { courseId, user }),
                  },
                  {
                     icon: 'file',
                     label: "file-pdf-o",
                     onPress: sendFileQuiz, // Remove the parentheses from sendFileQuiz
                  },
                  {
                     icon: 'content-save',
                     label: 'Save',
                     onPress: saveCommonTopics,
                  },
                  {
                     icon: 'file-pdf-box',
                     label: 'Save',
                     onPress: SaveLessonPlan,
                  },
               ]}
               onStateChange={({ open }) => setIsFABGroupOpen(open)}
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
      borderColor: '#224B0C',
      paddingHorizontal: 20,
   },
   weekContainer1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 15,
      borderColor: '#224B0C',
      marginTop: 10,
      overflow: 'hidden', // Add this line to clip the content within the border radius
      width: 350,
      marginLeft: 10,
   },
   weekText1: {
      fontSize: 16,
      height: 40, // Set an appropriate height for the text container
      flex: 1, // Add flex: 1 to make the text fill the container
      backgroundColor: '#C1D5A4',
      paddingHorizontal: 10, // Add horizontal padding for some spacing around the text
      marginHorizontal: 10, // Add horizontal margin for spacing within the container
   },
   iconContainer: {
      flexDirection: 'column',
      alignItems: 'center',
   },
   iconText: {
      flexDirection: 'row',
      marginTop: 15,
      color: '#224B0C',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10
   },
   checkBox: {
      marginRight: 10,
      backgroundColor: '#C1D5A4',
      left: 10,
      height: '110%'
   },
   weekText: {
      fontSize: 16,
      height: '110%',
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
     marginTop:-35,
      color: 'white',
   },
   button: {
      alignSelf: 'center',
      width: 100,
      height: 55,
      backgroundColor: '#224B0C',
      borderWidth: 1,
      borderColor: "#C7E8CA",
      borderRadius: 26,
      marginTop: 20,
      marginLeft: 10,

   },
   save: {
      fontSize: 15,
      alignItems: 'center',
      fontWeight: "bold",
      color: "white",
      marginTop: 13,
      marginLeft: 30
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