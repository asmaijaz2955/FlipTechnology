import React from "react";
import { View,Button,Text } from "react-native";
import Login from "../Login";
import ListofTeachers from "../ListofTeachers";
import WeekTopics from "../WeekTopics";
import MobileApplicationDevelopment from "../WeekTopic";
import EnrolledCourses from "../EnrolledCourses";
import SubjectWeeks from "../SubjectWeeks";
import Videos from "../Videos";
import Searching from "../Searching";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UploadVideo from "../UploadVideo";
import Quiz from "../Quiz";
import AllocatedCourses from "../AllocatedCourses";
import AssignPresentation from "../AssignPresentation";
import Presentation from "../Presentation";
import Evaluation from "../Evaluation";
const HomeStack = createNativeStackNavigator();
const HomeStackScreen = ({navigation}) => {
    return (
        <HomeStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#224B0C',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        >
             {/* <HomeStack.Screen name="Videos" component={Videos} /> */}
          <HomeStack.Screen name="Login" component={Login}  />
          <HomeStack.Screen name="ListofTeachers" component={ListofTeachers} />
          <HomeStack.Screen name="WeekTopics" component={WeekTopics} />
          <HomeStack.Screen name="MobileApplicationDevelopment" component={MobileApplicationDevelopment} />
          <HomeStack.Screen name="EnrolledCourse" component={EnrolledCourses} />
          <HomeStack.Screen name="SubjectWeeks" component={SubjectWeeks} />
          <HomeStack.Screen name="Videos" component={Videos} />
          <HomeStack.Screen name="UploadVideo" component={UploadVideo} />
          <HomeStack.Screen name="Searching" component={Searching} />
          <HomeStack.Screen name="AllocatedCourses" component={AllocatedCourses} />
          <HomeStack.Screen name="Quiz" component={Quiz} />
          <HomeStack.Screen name="AssignPresentation" component={AssignPresentation} />
          <HomeStack.Screen name="Presentation" component={Presentation} />
          <HomeStack.Screen name="Evaluation" component={Evaluation} />
        </HomeStack.Navigator>
      );
}
export  default HomeStackScreen;
