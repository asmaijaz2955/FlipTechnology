import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import { Text, Image, View, StyleSheet, TextInput, TouchableOpacity  } from 'react-native';
const ListofTopics=( { navigation })=>{
    // const [isSelected, setSelection] = useState();
    const [agree,  setAgree] = useState(false);

    return(


        <View style={styles.container}>
         <View style={{backgroundColor:"white",height:110,flexDirection:"column"}}>
            <View style={styles.button}>
           
               <Text style={styles.aftabKhan}>Week 1</Text>
     
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
         </View>
                
            </View>
            </View>
<View style={{top:10,left:280,flexDirection:"column",justifyContent:'space-between'}}>
    <TouchableOpacity
    onPress={() => navigation.navigate('Videos')}
    >
    <View style={{
        right:30,top:20
    }}>
    <Image
              source={require('./Assets/Icon/plus.png')}
            
           
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                
                
              }}
            />
    </View>
   
  

   
        <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
            Add Video
        </Text>
        </TouchableOpacity>
</View>
            </View>
            <View style={{backgroundColor:"white",height:110,flexDirection:"column"}}>
            <View style={styles.button}>
           
               <Text style={styles.aftabKhan}>Week 1</Text>
     
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
         </View>
                
            </View>
            </View>
<View style={{top:10,left:280,flexDirection:"column",justifyContent:'space-between'}}>
    <View style={{
        right:30,top:20
    }}>
    <Image
              source={require('./Assets/Icon/plus.png')}
            
           
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                
                
              }}
            />
    </View>

   
        <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
            Add Video
        </Text>
   
</View>
            </View>
            <View style={{backgroundColor:"white",height:110,flexDirection:"column"}}>
            <View style={styles.button}>
           
               <Text style={styles.aftabKhan}>Week 1</Text>
     
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
         </View>
                
            </View>
            </View>
<View style={{top:10,left:280,flexDirection:"column",justifyContent:'space-between'}}>
    <View style={{
        right:30,top:20
    }}>
    <Image
              source={require('./Assets/Icon/plus.png')}
            
           
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                
                
              }}
            />
    </View>

   
        <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
            Add Video
        </Text>
   
</View>
            </View>
            <View style={{backgroundColor:"white",height:110,flexDirection:"column"}}>
            <View style={styles.button}>
           
               <Text style={styles.aftabKhan}>Week 1</Text>
     
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
         </View>
                
            </View>
            </View>
<View style={{top:10,left:280,flexDirection:"column",justifyContent:'space-between'}}>
    <View style={{
        right:30,top:20
    }}>
    <Image
              source={require('./Assets/Icon/plus.png')}
            
           
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                
                
              }}
            />
    </View>

   
        <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
            Add Video
        </Text>
   
</View>
            </View>
            <View style={{backgroundColor:"white",height:110,flexDirection:"column"}}>
            <View style={styles.button}>
           
               <Text style={styles.aftabKhan}>Week 1</Text>
     
         <View style={{ flexDirection: "column", marginLeft: 340,bottom:20 }}>
                  <View style={styles.checkboxContainer}>
               <CheckBox  style={styles.checkbox}
          value={ agree}
          onClick={() => setAgree(!agree) }
        
       />
         </View>
                
            </View>
            </View>
<View style={{top:10,left:280,flexDirection:"column",justifyContent:'space-between'}}>
    <View style={{
        right:30,top:20
    }}>
    <Image
              source={require('./Assets/Icon/plus.png')}
            
           
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                
                
              }}
            />
    </View>

   
        <Text style={{fontSize:20,fontWeight:"bold",color:"black"}}>
            Add Video
        </Text>
   
</View>
            </View>
  
       </View>
    );
}
const styles = StyleSheet.create({
    container: {
       top: 40,
       
    },
    button: {
       width: 370,
       height: 42,
    //    alignItems:'center',
       backgroundColor: `#32cd32`,
       marginTop: 5,
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
export default ListofTopics;
// // return (
// //     <View style={styles.container}>
// //       <View style={styles.checkboxContainer}>
// //         <CheckBox
// //           value={isSelected}
// //           onValueChange={setSelection}
// //           style={styles.checkbox}
// //         />
// //         <Text style={styles.label}>Do you like React Native?</Text>
// //       </View>
// //       <Text>Is CheckBox selected: {isSelected ? '👍' : '👎'}</Text>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   checkboxContainer: {
// //     flexDirection: 'row',
// //     marginBottom: 20,
// //   },
// //   checkbox: {
// //     alignSelf: 'center',
// //   },
// //   label: {
// //     margin: 8,
// //   },
// // });

// // export default ListofTopics;