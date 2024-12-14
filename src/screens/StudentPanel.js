
import React,{useState,useEffect}from'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView,FlatList, Pressable } from "react-native";
const StudentPanel = ({navigation, route}) => {
   const [subjects, setsubjects] = useState([]);
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
   const data = [{
      name: "Week-1",
   },
   {
      name: "Week-2",
   },
   {
      name: "Week-3",
   },
   {
      name: "Week-4",
   },
   {
      name: "Week-5",
   },]
    return (

<View>
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
   weekContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 54,
      left:5,
      top:15
   },
   weekText: {
      paddingTop:15,
      paddingLeft:15,
      fontWeight:"bold",
      width: 350,
      height: 62,
      backgroundColor: `#32cd32`,
      marginTop: 30,
      marginLeft: 6
   }
 });
 
 export default StudentPanel;