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
    <View style={{flexDirection:'row',backgroundColor:'#C7E8CA', alignItems:'center', padding:5, margin:15}}>
    <TextInput style={{flex:1, marginLeft:40, height:40}}
   ></TextInput>
   <TouchableOpacity style={{padding:5,right:285}}>
   <FontAwesomeIcon style={{fontSize: 25}} name="search"
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
 <Picker.Item label="12" value="12"/>
<Picker.Item label="123" value="123" />
<Picker.Item label="1234" value="1234" />
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
 backgroundColor: "#DDF7E3"
 },
 button2: {
 width: 144,
height: 65,
 backgroundColor: "#C7E8CA",
 borderRadius: 21,
 borderColor:'#5D9C59',
 top: 165,
 marginLeft: 110
 },
 login: {
    fontSize: 22,
    alignItems: 'center',
    fontWeight: "bold",
    color: "#5D9C59",
    marginTop: 13,
    marginLeft: 30
  },
  picker: {
    top: 35,
    bottom: 5,
    width: '90%',
    alignSelf:'center',
    borderColor:'#5D9C59',
    backgroundColor: `#C7E8CA`
 },
 picker1: {
    top: 75,
    bottom: 5,
    width: '90%',
    alignSelf:'center',
    backgroundColor: `#C7E8CA`
 },
 picker2: {
    top: 115,
    bottom: 5,
    width: '90%',
    alignSelf:'center',
    backgroundColor: `#C7E8CA`
 }
});

export default SetSchedule;