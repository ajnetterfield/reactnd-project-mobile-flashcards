import React from 'react';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { green, red, white } from '../utils/colors';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
  });

  constructor(props) {
    super(props);

    this.state = {
      correct: 0,
      currentCard: 0,
      flipped: false
    };
  }

  handleCorrect = () => {
    this.setState((prevState) => ({
      correct: prevState.correct + 1,
      currentCard: prevState.currentCard + 1,
      flipped: false
    }));
  }

  handleIncorrect = () => {
    this.setState((prevState) => ({
      currentCard: prevState.currentCard + 1,
      flipped: false
    }));
  }

  handleFlip = () => {
    this.setState((prevState) => ({
      flipped: !prevState.flipped
    }));
  }

  handleRestartQuiz = () => {
    this.setState({
      correct: 0,
      currentCard: 0,
      flipped: false
    });
  }

  handleBackToDeck = () => {
    this.props.navigation.navigate('DeckShow', {
      title: this.props.deck.title
    });
  }

  render() {
    const { deck } = this.props;
    const { correct, currentCard, flipped } = this.state;

    const totalCards = deck.cards.length;

    if (currentCard >= totalCards) {
      const score = parseInt((100 * correct) / totalCards, 10);
      const failed = score < 50;

      return (
        <View style={styles.container}>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons
              name={failed ? 'ios-sad-outline' : 'ios-happy-outline'}
              size={90}
              color={failed ? red : green}
            />

            <Text style={[styles.score, { color: failed ? red : green }]}>
              You scored {score}%
            </Text>
          </View>

          <View style={{ marginBottom: 30 }}>
            <TouchableOpacity onPress={this.handleRestartQuiz} style={[styles.button, styles.buttonSecondary]}>
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.handleBackToDeck} style={[styles.button, { marginTop: 15 }]}>
              <Text style={styles.buttonText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const card = deck.cards[currentCard];

    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={{ marginBottom: 15 }}>
            {currentCard + 1} / {totalCards}
          </Text>

          <Text style={flipped ? styles.answer : styles.question}>
            {flipped ? card.answer : card.question}
          </Text>

          <TouchableOpacity onPress={this.handleFlip}>
            <Text style={{ color: flipped ? red : green, fontSize: 16 }}>
              {flipped ? 'Show question' : 'Show answer'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 30 }}>
          <TouchableOpacity onPress={this.handleIncorrect} style={[styles.button, styles.buttonIncorrect]}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleCorrect} style={[styles.button, { marginTop: 15 }]}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => ({
  deck: decks[navigation.state.params.title]
});

const styles = StyleSheet.create({
  answer: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center'
  },
  button: {
    backgroundColor: green,
    borderRadius: 5,
    height: 46,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10
  },
  buttonSecondary: {
    backgroundColor: white,
    borderColor: green,
    borderWidth: 1
  },
  buttonText: {
    color: white,
    fontSize: 20,
    textAlign: 'center'
  },
  buttonTextSecondary: {
    color: green
  },
  buttonIncorrect: {
    backgroundColor: red
  },
  container: {
    backgroundColor: white,
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 25
  },
  details: {
    alignItems: 'center',
    flex: 1
  },
  score: {
    fontSize: 30
  },
  question: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default connect(mapStateToProps)(Quiz);
