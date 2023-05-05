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
const [Tasbih, setTasbih] = useState('اللهأكبر');
 const [Type, setType] = useState('Weekly');
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
selectedValue={Tasbih}
 onValueChange={currentTasbih => setTasbih(currentTasbih)}  style={styles.picker}>
 <Picker.Item label="DBMS "value="DBMS" />
<Picker.Item label="CC"value="CC"/>
<Picker.Item label="NA" value="NA" />
</Picker>
 <Picker
selectedValue={Type}
onValueChange={currentType => setType(currentType)}  style={styles.picker1}>
 <Picker.Item label="Nauman" value="Nauman"/>
<Picker.Item label="Naseer" value="Naseer" />
<Picker.Item label="Zeeshan" value="Zeeshan" />
</Picker>
<Picker
selectedValue={Type}
onValueChange={currentType => setType(currentType)}  style={styles.picker2}>
 <Picker.Item label="1" value="1"/>
<Picker.Item label="2" value="2" />
<Picker.Item label="3" value="3" />
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
 backgroundColor: '#224B0C',
 borderRadius: 21,
 top: 165,
 marginLeft: 110
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
 }
});

export default SetSchedule;