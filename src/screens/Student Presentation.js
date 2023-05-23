import React, { useState,Component,useEffect } from "react";
import {
 StyleSheet,
View,
Image,
ImageBackground,
Text,
TextInput,
 TouchableOpacity,
 FlatList,
 RefreshControl
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Evil from 'react-native-vector-icons/EvilIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import Fonta from 'react-native-vector-icons/FontAwesome';
import Ant from 'react-native-vector-icons/AntDesign';
import Ions from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { Picker } from '@react-native-picker/picker';
import { FAB, Provider } from 'react-native-paper';
import Presentation from "./Presentation";

const StudentPresenation=({navigation,route})=> {  
const [section, setSetion] = useState('');
const [selectedItems, setSelectedItems] = useState([]);
const [toggleCheckBox, setToggleCheckBox] = useState(false);
const [toCheckBox, setToCheckBox] = useState(false);
const[list,setlist]=useState([]);
const[lst,setlst]=useState([]);
let courseId = route.params.courseId;
useEffect(() => {
    getSection();
 }, [section])
const getSection = async () => {
    const response = await fetch(`${global.apiURL}teacher/getStudentBySection?section=${section}`)
    const courses = await response.json();
    console.log("std",courses);
    setlist(courses);
};
const [refreshing, setRefreshing] = useState(false);
const onRefresh = () => {
    setRefreshing(true);
    getSection();
    setRefreshing(false);
  };
const handleCheckStudentToggle = (item) => {
    const selectedIndex = selectedItems.findIndex((selectedItem) => selectedItem === item);
    
    if (selectedIndex >= 0) {
        // the item was already selected, so remove it from the list
        setSelectedItems((prevSelectedItems) =>
            prevSelectedItems.filter((selectedItem) => selectedItem !== item)
        );
    } else {
        // add the new item to the list of selected items
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
        console.log("lst",selectedItems);
       
    }
};
return (
 <View style={styles.container}>
<Text style={styles.setdata}>List of Participants</Text>
<Picker style={{backgroundColor: '#C1D5A4',left:30, width: 304}}
selectedValue={section}
 onValueChange={currentSection => setSetion(currentSection)}>
 <Picker.Item label="BCS1A" value="BCS1A"/>
<Picker.Item label="BCS1B" value="BCS1B" />
<Picker.Item label="BCS1C" value="BCS1C" />
</Picker>
<FlatList
                data={list}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.inputvi,
                            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                        ]}
                    >
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Font name="chalkboard-teacher" size={30} color="#076F65" style={styles.icon1} />
                            <Text style={{ alignItems: 'flex-start', color: "#076F65",}}>
                                {item.std_id} {item.name}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', color: "#076F65" }}>
                            <CheckBox
                                value={selectedItems.includes(item)}
                                onValueChange={() => handleCheckStudentToggle(item)}
                                tintColors={{ true: '#076F65', false: '#076F65' }}
                            />
                        </View>
                    </View>
                )    
            } refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} />
            <FAB
          style={styles.fabSave}
          small
          label='Assign'
          onPress={() => navigation.navigate('Presentation',{selectedItems,courseId})}
        />
 </View>
 );
}

const styles = StyleSheet.create({
 container: {
 flex: 1
 },
setdata: {
fontFamily: "roboto-700",
color: '#224B0C',
 fontSize: 30,
 marginLeft: 30
 },
textInput1: {
 fontFamily: "roboto-regular",
color: "#121212",
 height: 54,
 width: 308,
 backgroundColor: "white",
 borderWidth:1,
 borderColor: '#224B0C',
 top:20,
 marginLeft: 17
},
inputvi: {
    flexDirection: 'row',
    width: 360,
    marginTop: 30,
    height: 50,
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    borderColor: '#076F65',
    borderWidth: 1,
    justifyContent: 'space-between'

},
 button2: {
 width: 160,
height: 60,
 backgroundColor: '#224B0C',
 borderRadius: 21,
 top:50,
 marginLeft: 118
 },
 set2: {
 color: "white",
 fontSize: 40,
 marginLeft: 20
 },
 fabSave: {
    position: 'absolute',
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: '#224B0C',
  },
});

export default StudentPresenation;