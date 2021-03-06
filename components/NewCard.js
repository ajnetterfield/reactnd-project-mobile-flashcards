import React from 'react';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { handleAddCard } from '../actions';

import { green, red, white } from '../utils/colors';

class NewCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      hasError: false,
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
    const { title } = this.props;
    const { answer, question } = this.state;

    if (answer === '' || question === '') {
      this.setState({
        hasError: true
      });
    } else {
      const card = {
        answer,
        question
      };

      this.props.handleAddCard(title, card)
        .then(() => {
          this.setState({
            answer: '',
            hasError: false,
            question: ''
          });

          this.props.navigation.goBack();
        });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Question</Text>

          <TextInput
            autoFocus
            onChangeText={this.handleChangeQuestion}
            placeholder="e.g. What is React?"
            style={styles.textInput}
            value={this.state.question}
          />

          <Text style={styles.label}>Answer</Text>

          <TextInput
            onChangeText={this.handleChangeAnswer}
            placeholder="e.g. A library for managing user interfaces"
            style={styles.textInput}
            value={this.state.answer}
          />
        </View>

        <View style={{ marginBottom: 30 }}>
          {this.state.hasError && (
            <Text style={styles.errorText}>Please enter a question and an answer</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: green,
    borderRadius: 5,
    height: 46,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10
  },
  buttonText: {
    color: white,
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 25
  },
  errorText: {
    color: red,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 20,
    marginBottom: 15
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

const mapStateToProps = (decks, { navigation }) => ({
  title: navigation.state.params.title
});

const mapDispatchToProps = {
  handleAddCard
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);
