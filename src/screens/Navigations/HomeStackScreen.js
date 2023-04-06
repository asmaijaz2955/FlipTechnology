import React from "react";
import { View,Button,Text } from "react-native";
import Login from "../Login";
import ListofTeachers from "../ListofTeachers";
import TeacherPanel from "../TeacherPanel";
import MobileApplicationDevelopment from "../MobileApplicationDevelopment";
import StudentPanel from "../StudentPanel";
import SubjectWeeks from "../SubjectWeeks";
import ListofTopics from "../ListofTopics";
import Videos from "../Videos";
import Searching from "../Searching";
import Subjects from "../Subjects";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UploadVideo from "../UploadVideo";
import Presentation from "../Presentation";

const HomeStack = createNativeStackNavigator();
const HomeStackScreen = ({navigation}) => {
    return (
        <HomeStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#5D9C59',
          },
          headerTintColor: '5D9C59',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
             {/* <HomeStack.Screen name="Videos" component={Videos} /> */}
          <HomeStack.Screen name="Login" component={Login}  />
          <HomeStack.Screen name="ListofTeachers" component={ListofTeachers} />
          <HomeStack.Screen name="TeacherPanel" component={TeacherPanel} />
          <HomeStack.Screen name="MobileApplicationDevelopment" component={MobileApplicationDevelopment} />
          <HomeStack.Screen name="StudentPanel" component={StudentPanel} />
          <HomeStack.Screen name="SubjectWeeks" component={SubjectWeeks} />
          <HomeStack.Screen name="ListofTopics" component={ListofTopics} />
          <HomeStack.Screen name="Videos" component={Videos} />
          <HomeStack.Screen name="UploadVideo" component={UploadVideo} />
          <HomeStack.Screen name="Searching" component={Searching} />
          <HomeStack.Screen name="Subjects" component={Subjects} />
          {/* <HomeStack.Screen name="Presentation" component={Presentation} /> */}
        </HomeStack.Navigator>
      );
}
export  default HomeStackScreen;
