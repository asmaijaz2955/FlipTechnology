
import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { Card, Button, CheckBox } from 'react-native-elements';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris'
  },
  {
    question: 'What is the largest continent?',
    options: ['Asia', 'Africa', 'North America', 'South America'],
    answer: 'Asia'
  },
  // Add more questions here
];

const QuizScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (option) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = option;
    setUserAnswers(updatedAnswers);
  };

  const handleQuizSubmit = () => {
    setShowResult(true);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  return (
    <View style={styles.container}>
      {!showResult ? (
        <Card>
          <Text style={styles.question}>{questions[currentQuestion].question}</Text>
          {questions[currentQuestion].options.map((option, index) => (
            <CheckBox
              key={index}
              title={option}
              checked={userAnswers[currentQuestion] === option}
              onPress={() => handleAnswerSelect(option)}
            />
          ))}
          <Button
            title={currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
            onPress={() => {
              if (currentQuestion === questions.length - 1) {
                handleQuizSubmit();
              } else {
                setCurrentQuestion(currentQuestion + 1);
              }
            }}
          />
        </Card>
      ) : (
        <Modal visible={showResult} animationType="fade" transparent>
          <View style={styles.modalContainer}>
            <Card>
              <Text style={styles.resultText}>
                You scored {calculateScore()} out of {questions.length}
              </Text>
              <Button title="Restart Quiz" onPress={handleRestartQuiz} />
            </Card>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  }
});

export default QuizScreen;