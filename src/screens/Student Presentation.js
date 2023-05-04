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
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
const StudentPresenation=()=> {  
const [section, setSetion] = useState('');
const [selectedItems, setSelectedItems] = useState([]);
const [toggleCheckBox, setToggleCheckBox] = useState(false);
const [toCheckBox, setToCheckBox] = useState(false);
return (
 <View style={styles.container}>
<Text style={styles.setdata}>List of Participants</Text>
<Picker style={{backgroundColor: "#D8D8D8",left:20, width: 304}}
selectedValue={section}
 onValueChange={currentSection => setSetion(currentSection)}>
 <Picker.Item label="BSCS-2A" value="BSCS-2A"/>
<Picker.Item label="BSCS-2B" value="BSCS-2B" />
<Picker.Item label="BSCS-2C" value="BSCS-2C" />
</Picker>
<TextInput placeholder="search" style={styles.textInput1}></TextInput>
<Text style={{left:20,fontSize: 20,color:'black',top:50,backgroundColor:'#D8D8D8',width: 304}}> Usman Hassan</Text>
<CheckBox style={{left:290,top:20}}
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
/>
<Text style={{left:20,fontSize: 20,color:'black',top:50,backgroundColor:'#D8D8D8',width: 304}}> Zeeshan Ahmed</Text>
<CheckBox style={{left:290,top:20}}
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
/> 
<Text style={{left:20,fontSize: 20,color:'black',top:50,backgroundColor:'#D8D8D8',width: 304}}> Muhammad Usman</Text>
<CheckBox style={{left:290,top:20}}
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
/>
<Text style={{left:20,fontSize: 20,color:'black',top:50,backgroundColor:'#D8D8D8',width: 304}}> Muhammad Noman</Text> 
<CheckBox style={{left:290,top:20}}
    disabled={false}
    value={toggleCheckBox}
    onValueChange={(newValue) => setToggleCheckBox(newValue)}
/>
<Text style={{left:20,fontSize: 20,color:'black',top:50,backgroundColor:'#D8D8D8',width: 304}}> Hifza Nisar</Text> 
<CheckBox style={{left:290,top:20}}
    disabled={false}
    value={toCheckBox}
    onValueChange={(newValue) => setToCheckBox(newValue)}
/> 
<Text style={{left:20,fontSize: 20,color:'black',top:50,backgroundColor:'#D8D8D8',width: 304}}>Syeda Farah</Text> 
<CheckBox style={{left:290,top:20}}
    disabled={false}
    value={toCheckBox}
    onValueChange={(newValue) => setToCheckBox(newValue)}
/> 
<View>
<TouchableOpacity style={styles.button2}>
<Text style={styles.set2}>Assign</Text>
</TouchableOpacity>
</View>
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1
 },
setdata: {
fontFamily: "roboto-700",
color: "#121212",
 fontSize: 30,
 marginTop: 14,
 marginLeft: 45
 },
textInput1: {
 fontFamily: "roboto-regular",
color: "#121212",
 height: 54,
 width: 308,
 backgroundColor: "#D8D8D8",
 top:20,
 marginLeft: 17
},
 button2: {
 width: 160,
height: 60,
 backgroundColor: "#0E8388",
 borderRadius: 21,
 top:50,
 marginLeft: 118
 },
 set2: {
 color: "black",
 fontSize: 40,
 marginLeft: 20
 }
});

export default StudentPresenation;