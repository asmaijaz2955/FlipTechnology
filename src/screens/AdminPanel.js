
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, FlatList, Pressable, Image } from "react-native";
const AdminPanel = ({ navigation, route }) => {
   const [subjects, setsubjects] = useState([]);
   const [images, setimages] = useState([{ src: require('./Assets/Images/sub.png'), key: '1' }]);
   let user = route.params.user;
   console.log(user)
   useEffect(() => {
      getAllSubjects();
   }, [])
   const getAllSubjects = async () => {
      const response = await fetch(`${global.apiURL}Hod/getAllCourses`)
      const courses = await response.json();
      console.log("course",courses)
      setsubjects(courses)
   }
   return (

      <View style={styles.container}>
         <FlatList
            data={subjects}
            keyExtractor={(item, index) => index}
            numColumns={2} // Set the number of columns
            columnWrapperStyle={styles.columnWrapper}
            renderItem={({ item }) => (
               <Pressable onPress={() => navigation.navigate("Topics", { user:user ,courseId: item.c_id })}>
                  <View style={styles.weekContainer}>
                     <Image source={images[0].src} style={styles.image} />
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
      backgroundColor: "white"
      // borderColor: "#000000"
   },
   columnWrapper: {
      justifyContent: 'flex-start', // Set the alignment between each row
      marginVertical:20,
      // alignItems: 'center'
      // marginHorizontal: 10, 
      // paddingHorizontal: 10, // Set the horizontal padding between each item
      // paddingVertical: 10, // Set the vertical padding between each item
   },
   weekContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 15,
      paddingVertical: 15,
      gap:5,
      backgroundColor: '#C1D5A4',
      marginHorizontal: 30,
      borderRadius: 10,
   },
   image: {
      width: 90,
      height: 80,
      borderRadius: 25,
   },
   weekText: {
      // paddingTop: 15,
      fontSize: 15,
      fontWeight: "bold",
   }
});

export default AdminPanel;