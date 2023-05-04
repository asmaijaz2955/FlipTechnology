
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, ScrollView, FlatList, Pressable, Image } from "react-native";
const StudentPanel = ({ navigation, route }) => {
   const [subjects, setsubjects] = useState([]);
   const [images, setimages] = useState([{ src: require('./Assets/Images/sub.png'), key: '1' }]);
   let user = route.params.user;
   console.log(user)
   useEffect(() => {
      getAllSubjects();
   }, [])
   const getAllSubjects = async () => {
      const response = await fetch(`${global.apiURL}student/getEnrollSubjects?userId=${user.Id}`)
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
               <Pressable onPress={() => navigation.navigate("MobileApplicationDevelopment", { user:user ,courseId: item.c_id })}>
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
      // justifyContent: 'space-between', // Set the alignment between each row

      // paddingHorizontal: 10, // Set the horizontal padding between each item
      // paddingVertical: 10, // Set the vertical padding between each item
   },
   weekContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 54,
      top: 10,
      width: '50%', // Set the width of each item
      height: 130, // Set the height of each item
      backgroundColor: '#C1D5A4',
      marginTop: 20,
      borderRadius: 10,
      marginLeft:10,
      marginRight: 30
   },
   image: {
      width: 50,
      height: 50,
      borderRadius: 25,
   },
   weekText: {
      paddingTop: 15,
      fontWeight: "bold",
      // width: 350,
      // height: 62,
      // backgroundColor: `#C7E8CA`,
      // marginTop: 30,
      // marginLeft: 6
   }
});

export default StudentPanel;