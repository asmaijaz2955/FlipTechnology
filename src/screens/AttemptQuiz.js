import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { RadioButton, Button } from 'react-native-paper';


const QuizQuestions = ({ navigation,route }) => {
  const [quesList, setQuesList] = useState([]);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  let topicId=route.params.topicId;
  let user=route.params.user;
  let userId = user.userId;
  console.log("userid",userId);
  console.log("user",user);
  console.log("topicid",topicId);
  useEffect(() => {
    getQuizByTopic();
  }, []);

  const getQuizByTopic = async () => {
    try {
      const response = await fetch(`${global.apiURL}student/getQuizByTopic?topicId=${topicId}`);
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setQuesList(data); // Assuming data is an array of questions
      } else {
        console.log('Not Found');
      }
    } catch (e) {
      console.log(e.toString());
    }
  };

  const handleAnswer = () => {
    const currentQuestion = quesList[index];
    if (selectedOption === currentQuestion.CorrectOption) {
      setCorrect((prevCorrect) => prevCorrect + 1);
    } else {
      setWrong((prevWrong) => prevWrong + 1);
    }
    setIndex((prevIndex) => prevIndex + 1);
    setSelectedOption(null);
    saveQuizAttempts();
    if (index === quesList.length - 1) {
      // Navigating back to the "Video" screen when questions have ended
      navigation.goBack();
    }
  };
const saveQuizAttempts = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "Qid": 2,
  "Answer": selectedOption,
  "StudentId": userId,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
const response = await fetch(`${global.apiURL}student/SaveQuizAttempt`, requestOptions)
const data = await response.json()
console.log('data', data)
  }
  const renderQuestions = () => {
    const question = quesList[index];
    return (
      <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 20 }}>{`Q no ${index + 1} ${question.Question}`}</Text>
        <RadioButton.Group onValueChange={(value) => setSelectedOption(value)} value={selectedOption}>
          <RadioButton.Item label={question.Option_A} value={question.Option_A} />
          <RadioButton.Item label={question.Option_B} value={question.Option_B} />
          <RadioButton.Item label={question.Option_C} value={question.Option_C} />
          <RadioButton.Item label={question.Option_D} value={question.Option_D} />
        </RadioButton.Group>
        <Button mode="contained" onPress={handleAnswer} disabled={!selectedOption}>
          Next
        </Button>
      </View>
    );
  };

  const renderResultView = () => {
    return (
      <View style={{ padding: 8, justifyContent: 'center' }}>
        <View style={{ height: 400, backgroundColor: 'white' }}>
          {/* Remaining code for result view */}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: '#C1D5A4', height: 50, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'green', fontSize: 20 }}>Question List</Text>
      </View>
      {index === quesList.length ? renderResultView() : renderQuestions()}
    </View>
  );
};

export default QuizQuestions;
