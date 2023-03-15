
import React,{useState,useEffect}from'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView,FlatList, Pressable, Image } from "react-native";
const StudentPanel = ({navigation, route}) => {
   const [subjects, setsubjects] = useState([]);
   const [images, setimages] = useState([{src:require('./Assets/Images/sub.png'),key:'1'}]);
   let user=route.params.user;
   console.log(user)
   useEffect(()=>{
      getAllSubjects();
   },[])
   const getAllSubjects=async()=>{
    const response = await fetch(`${global.apiURL}student/getEnrollSubjects?userId=${user.Id}`)
   const courses= await response.json();
   setsubjects(courses)
   }
    return (

<View  style={styles.container}>

<FlatList
            data={subjects}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
            <Pressable onPress={()=>navigation.navigate("MobileApplicationDevelopment",{courseId:item.c_id})}>
            <View style={styles.weekContainer}>
            <Text style={styles.weekText}>{item.name}</Text>
            </View>
            </Pressable>
            )}
         />
</View>
         
    );
 }
 
const styles = StyleSheet.create({
   //Check project repo for styles
   container: {
      flex: 1,
      borderWidth: 1,
      backgroundColor: "#DDF7E3"
      // borderColor: "#000000"
    },
   weekContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 54,
      left:5,
      top:15
   },
   image: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
   weekText: {
      paddingTop:15,
      paddingLeft:15,
      fontWeight:"bold",
      width: 350,
      height: 62,
      backgroundColor: `#C7E8CA`,
      marginTop: 30,
      marginLeft: 6
   }
 });
 
 export default StudentPanel;