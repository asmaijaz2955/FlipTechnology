import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Button, FlatList, ScrollView, Pressable, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Weeks = ({ navigation, route }) => {
   const [currency, setCurrency] = useState('US Dollar');
   const [selectedItem, setselectedItem] = useState('1');
   const [topic, settopic] = useState([]);
   let courseId = route.params.courseId
   useEffect(() => {
      getTopics();
   }, [selectedItem])
   const getTopics = async () => {
      // "http://192.168.0.105/FlipTech_Fyp/api/student/getTopics?courseId=1&week=6"
      const response = await fetch(`${global.apiURL}student/getTopics?courseId=${courseId}&week=${selectedItem}`)
      const data = await response.json()
      console.log("JSON DATA", data)
      settopic(data)
   }
   return (
      <View style={styles.container}>
         <TouchableOpacity>
            <Text>search</Text>
         <Image
        source={require('./Assets/Icon/search.png')}
        resizeMode="contain"
        style={styles.image}
      />
         </TouchableOpacity>
      <View >
         <Picker
            selectedValue={selectedItem}
            onValueChange={(itemValue, itemIndex) =>
               setselectedItem(itemValue)}
            style={styles.picker}
         >
            {/* <ScrollView style={{flex: 1, height: '100%', width: "100%"}}> */}
            <Picker.Item label="Week 1" value="1" />
            <Picker.Item label="Week 2" value="2" />
            <Picker.Item label="Week 3" value="3" />
            <Picker.Item label="Week 4" value="4" />
            <Picker.Item label="Week 5" value="5" />
            <Picker.Item label="Week 6" value="6" />
            <Picker.Item label="Week 7" value="7" />
            <Picker.Item label="Week 8" value="8" />
            <Picker.Item label="Week 9" value="9" />
            <Picker.Item label="Week 10" value="10" />
            <Picker.Item label="Week 11" value="11" />
            <Picker.Item label="Week 12" value="12" />
            <Picker.Item label="Week 13" value="13" />
            <Picker.Item label="Week 14" value="14" />
            <Picker.Item label="Week 15" value="15" />
            <Picker.Item label="Week 16" value="16" />

            {/* </ScrollView> */}
         </Picker>
         <View style={{ marginVertical: 20 }}></View>
         <FlatList
            data={topic}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
               <Pressable onPress={() => navigation.navigate("Videos", {lessonId:item.less_id})}>
                  <View style={styles.weekContainer} >
                     <Text style={styles.weekText}>{item.topic_name}</Text>
                  </View>
               </Pressable>
            )}
         />

      </View>
      </View>
   );
};
export default Weeks;
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
      marginVertical: 10,
   },
   image: {
      width: 31,
      height: 27,
      marginLeft: 292
    },
   weekText: {
      fontSize: 16,
      height:'150%',
      width: '90%',
      backgroundColor: `#C7E8CA`

   },
   picker: {
      top: 25,
      bottom: 5,
      width: '90%',
      alignSelf:'center',
      backgroundColor: `#C7E8CA`

   }
});