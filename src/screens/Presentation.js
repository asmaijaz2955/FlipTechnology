import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, TouchableOpacity, Image,Modal } from 'react-native';
const Presentation=({navigation})=>{
    const [newItem, setNewItem] = useState('');
return(
    <View style={styles.container}>
    <View style={styles.modalView}>
    <Text style={{color: '#224B0C',fontSize: 20,right:20}}>Topic</Text>      
<TextInput style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
backgroundColor: "white",borderWidth: 1,borderColor: '#224B0C'}} value={newItem}
onChangeText={text => setNewItem(text)}/>
<Text style={{color: '#224B0C',fontSize: 20,marginTop:40}}>Date</Text>      
<TextInput style={{ fontFamily: "roboto-regular",color: "#121212", height: 50,width: 250,
backgroundColor: "white",borderWidth: 1,borderColor: '#224B0C', marginTop:0}} value={newItem}
onChangeText={text => setNewItem(text)}/>
 <Pressable style={styles.modalButton} onPress={() => navigation.navigate("TeacherPanel")}>
                  <Text style={styles.modalButtonText}>Save</Text>
                </Pressable>
</View>
</View>
);
};
export default Presentation;
const styles = StyleSheet.create({
   //Check project repo for styles
   container: {
      flex: 1,
      borderWidth: 1,
      backgroundColor: "white"
      // borderColor: "#000000"
   },
   modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    margin: 5,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#224B0C',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    bottom:-40
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}
);