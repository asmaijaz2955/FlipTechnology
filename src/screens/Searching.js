import React, { useState,Component } from "react";
import {
 StyleSheet,
View,
 Image,
 ImageBackground,
Text,
TextInput,
 TouchableOpacity
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
const SetSchedule=()=> {   
const [subject, setSubject] = useState('');
const [teacher, setTeacher] = useState('');
const [topics, setTopics] = useState('');
const [rating, setRating] = useState('');
return (
 <View style={styles.container}>
    <View style={{flexDirection:'row',backgroundColor: 'white',borderWidth:1,borderColor: '#224B0C', alignItems:'center', padding:5, margin:15}}>
    <TextInput style={{flex:1, marginLeft:40, height:40}}
   ></TextInput>
   <TouchableOpacity style={{padding:5,right:285}}>
   <FontAwesomeIcon style={{fontSize: 25,color:'#224B0C'}} name="search"
            />
   </TouchableOpacity ></View>
<Picker
selectedValue={subject}
 onValueChange={currentSubject => setSubject(currentSubject)}  style={styles.picker}>
 <Picker.Item label="PS "value="PS" />
<Picker.Item label="PP"value="PP"/>
<Picker.Item label="Islamiat" value="Islamiat" />
</Picker>
 <Picker
selectedValue={teacher}
onValueChange={currentTeacher => setTeacher(currentTeacher)}  style={styles.picker1}>
 <Picker.Item label="Khalid" value="Khalid"/>
<Picker.Item label="Ihsan" value="Ihsan" />
<Picker.Item label="Umer" value="Umer" />
</Picker>
<Picker
selectedValue={topics}
onValueChange={currentTopic => setTopics(currentTopic)}  style={styles.picker2}>
 <Picker.Item label="What is Flip" value="What is Flip"/>
<Picker.Item label="Introduction to Pakistan Studies" value="Introduction to Pakistan Studies" />
<Picker.Item label="Significance of Pakistan Studies" value="Significance of Pakistan Studies" />
<Picker.Item label="Location of Pakistan" value="Location of Pakistan " />
<Picker.Item label="Strategic importance" value="Strategic importance" />
<Picker.Item label="Neighbouring Countries" value="Neighbouring Countries" />
<Picker.Item label="Pakistan and India" value="Pakistan and India" />
<Picker.Item label="Pakistan and Afghanistan" value="Pakistan and Afghanistan" />

</Picker>
<Picker
selectedValue={rating}
onValueChange={currentRating => setRating(currentRating)}  style={styles.picker3}>
 <Picker.Item label="1" value="1"/>
<Picker.Item label="2" value="2" />
<Picker.Item label="3" value="3" />
<Picker.Item label="4" value="4" />
<Picker.Item label="5" value="5" />
</Picker>
<TouchableOpacity style={styles.button2}>
<Text style={styles.login}>Search</Text>
</TouchableOpacity>
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 backgroundColor: "white"
 },
 button2: {
 width: 144,
height: 65,
position:'absolute',
 backgroundColor: '#224B0C',
 borderRadius: 21,
 marginLeft: 110,
marginTop:600
 },
 login: {
    fontSize: 22,
    alignItems: 'center',
    fontWeight: "bold",
    color: "white",
    marginTop: 13,
    marginLeft: 30
  },
  picker: {
    top: 35,
    bottom: 5,
    width: '90%',
    alignSelf:'center',
    borderColor:'#5D9C59',
    backgroundColor: '#C1D5A4',
 },
 picker1: {
    top: 75,
    bottom: 5,
    width: '90%',
    alignSelf:'center',
    backgroundColor: '#C1D5A4'
 },
 picker2: {
    top: 115,
    bottom: 5,
    width: '90%',
    alignSelf:'center',
    backgroundColor: '#C1D5A4'
 },
 picker3: {
   bottom: -155,
   width: '90%',
   alignSelf:'center',
   backgroundColor: '#C1D5A4'
}
});

export default SetSchedule;