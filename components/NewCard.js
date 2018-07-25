import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { green, white } from '../utils/colors';

export default class NewCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      question: ''
    };
  }

  handleChangeAnswer = (answer) => {
    this.setState({
      answer
    });
  }

  handleChangeQuestion = (question) => {
    this.setState({
      question
    });
  }

  handleSubmit = () => {
    // TODO: Update data in Local Storage
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Question</Text>

        <TextInput
          onChangeText={this.handleChangeQuestion}
          style={styles.textInput}
          placeholder="Question"
          value={this.state.question}
        />

        <Text style={styles.label}>Answer</Text>

        <TextInput
          onChangeText={this.handleChangeAnswer}
          style={styles.textInput}
          placeholder="Answer"
          value={this.state.answer}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    padding: 30
  },
  label: {
    fontSize: 20,
    marginBottom: 15
  },
  button: {
    backgroundColor: green,
    borderRadius: 5,
    height: 40,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10
  },
  buttonText: {
    color: white,
    fontSize: 16,
    textAlign: 'center'
  },
  textInput: {
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 15,
    padding: 10,
    width: '100%'
  }
});
