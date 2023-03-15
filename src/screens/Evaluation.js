import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import { Text, Image, View, StyleSheet, TextInput, TouchableOpacity  } from 'react-native';
const Presentation=( { navigation })=>{
    // const [isSelected, setSelection] = useState();
    const [agree,  setAgree] = useState(false);

    return(


        <View style={styles.container}>

            <View style={styles.button}>
           <TouchableOpacity onPress={() => navigation.navigate('UploadVideo')}>
               <Text style={styles.aftabKhan}>Week 1</Text>
               </TouchableOpacity>
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
         </View>
         </View>
         </View>
         <View style={styles.button}>
           <TouchableOpacity onPress={() => navigation.navigate('UploadVideo')}>
               <Text style={styles.aftabKhan}>Week 1</Text>
               </TouchableOpacity>
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
       </View>
         </View>
         </View>
         <View style={styles.button}>
           <TouchableOpacity onPress={() => navigation.navigate('UploadVideo')}>
               <Text style={styles.aftabKhan}>Week 1</Text>
               </TouchableOpacity>
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
       </View>
         </View>
         </View>
         <View style={styles.button}>
           <TouchableOpacity onPress={() => navigation.navigate('UploadVideo')}>
               <Text style={styles.aftabKhan}>Week 1</Text>
               </TouchableOpacity>
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
       </View>
         </View>
         </View>
         <View style={styles.button}>
           <TouchableOpacity onPress={() => navigation.navigate('UploadVideo')}>
               <Text style={styles.aftabKhan}>Week 1</Text>
               </TouchableOpacity>
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
       </View>
         </View>
         </View>
         <View style={styles.button}>
           <TouchableOpacity onPress={() => navigation.navigate('UploadVideo')}>
               <Text style={styles.aftabKhan}>Week 1</Text>
               </TouchableOpacity>
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
       </View>
         </View>
         </View>
         <View style={{justifyContent:'center',alignItems:"center",right:70}}>
    <TouchableOpacity style={styles.button1}
    onPress={() => navigation.navigate('Presentation')}>
        <Text style={styles.Save}>Save</Text>
      </TouchableOpacity>
        </View>
         </View>
    );
}
const styles = StyleSheet.create({
    container: {
       top: 40,
       
    },
    button1: {
        width: 120,
        height: 55,
        backgroundColor: "#E6E6E6",
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 26,
        marginTop: 30,
        marginLeft: 120,
       
      },
      Save: {
     fontSize:22,
       fontWeight:"bold",
        color: "#121212",
        marginTop: 15,
        marginLeft: 35,
      },
    button: {
       width: 370,
       height: 42,
    //    alignItems:'center',
       backgroundColor: `#32cd32`,
       marginTop: 20,
       marginLeft: 10,
    },
    wrapper:{
        padding: 1,
        paddingTop:80,
        paddingBottom: 80,
        paddingLeft: 20,
        //paddingRight:3,
        
       
     
      },
      wrapperText:{
        fontFamily: "bold",
        color:"black",
        fontSize: 20,
      },
    aftabKhan: {
       fontFamily: "roboto-regular",
       color: "#121212",
       marginTop: 13,
       marginLeft: 25
    },
    checkboxContainer: {
            flexDirection: 'row',
            marginBottom: 20,
          },
          checkbox: {
            alignSelf: 'center',
          },
        });
export default Presentation;