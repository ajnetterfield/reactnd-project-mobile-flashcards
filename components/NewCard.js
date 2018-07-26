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

      this.props.handleAddCard(title, card);

      this.setState({
        answer: '',
        hasError: false,
        question: ''
      });

      this.props.navigation.goBack();
    }
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

        {this.state.hasError && (
          <Text style={styles.errorText}>Please enter a question and an answer</Text>
        )}
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
  errorText: {
    color: red,
    fontSize: 16,
    marginTop: 20
  },
  button: {
    backgroundColor: green,
    borderRadius: 5,
    height: 40,
    marginTop: 15,
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
