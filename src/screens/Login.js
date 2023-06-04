import React, { useState } from 'react';

import { Text, Image, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const Login = ({ navigation }) => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {

    const response = await fetch(`${global.apiURL}account/Login?email=${text}&password=${password}`)
    if (response.status == 200) {
      const data = await response.json();
      console.log("DATA", data)
      if (data.Role == "Student") {
        navigation.navigate("EnrolledCourses", {user:data})
      }
      else if (data.Role == "Teacher") {
        navigation.navigate("AllocatedCourses", {user:data})
      }
      else if (data.Role == "Director") {
        navigation.navigate("AdminPanel", {user:data})
      }
    }
  }


  return (
    <View style={styles.container}>
      <Image
        source={require('./Assets/Images/Logo.png')}
        resizeMode="contain"
        style={styles.image}
      />
      <View>
        <Text style={styles.biitLms}>Flip LMS</Text>
      </View>
      <View>
        <TextInput placeholder="username" style={styles.username}
          onChangeText={newText => setText(newText)}
          autoCapitalize="none"
          autoCorrect={false} />
      </View>
      <View>

        <TextInput placeholder="password" style={styles.password}
          onChangeText={newPassword => setPassword(newPassword)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true} />
      </View>
      <View style={{ justifyContent: 'center', alignItems: "center", right: 60 }}>
        <TouchableOpacity style={styles.button}
          onPress={handleLogin}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    // borderColor: "#000000"
  },
  image: {
    width: 131,
    height: 137,
    marginTop: 43,
    borderRadius: 3,
    marginLeft: 122
  },
  biitLms: {
    // fontFamily: "roboto-700",
    fontWeight: "bold",
    color: '#224B0C',
    fontSize: 24,
    marginTop: 19,
    alignSelf: "center"
  },
  username: {
    fontSize: 15,
    color: "black",
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#224B0C',
    marginTop: 33,
    marginLeft: 32,
    backgroundColor: "white",
    borderRadius: 15,
  },
  password: {
    fontFamily: "roboto-regular",
    color: "black",
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: '#224B0C',
    marginTop: 35,
    marginLeft: 32,
    backgroundColor: "white",
    borderRadius: 15,
  },
  button: {
    alignSelf:'center',
    width: 150,
    height: 65,
    backgroundColor: '#224B0C',
    borderWidth: 1,
    borderColor: "#C7E8CA",
    borderRadius: 26,
    marginTop: 34,
    marginLeft: 140,

  },
  login: {
    fontSize: 22,
    alignItems: 'center',
    fontWeight: "bold",
    color: "white",
    marginTop: 13,
    marginLeft: 40
  },
  button3: {
    width: 250,
    height: 65,
    backgroundColor: "#C7E8CA",
    borderWidth: 1,
    borderColor: "#C7E8CA",
    borderRadius: 26,
    marginTop: 25,
    marginLeft: 160,

  },
  loginasteacher: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#121212",
    marginTop: 13,
    marginLeft: 40
  },
  button2: {
    width: 250,
    height: 65,
    backgroundColor: "#C7E8CA",
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 26,
    marginTop: 25,
    marginLeft: 160,

  },
  loginasstudent: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#121212",
    marginTop: 13,
    marginLeft: 40
  }
});
export default Login;