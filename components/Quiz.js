import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { green, red, white } from '../utils/colors';

class Quiz extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title} Quiz`
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

  render() {
    const { deck } = this.props;
    const { correct, currentCard, flipped } = this.state;

    const totalCards = deck.cards.length;

    if (currentCard >= totalCards) {
      return (
        <View style={[styles.container, { justifyContent: 'center' }]}>
          <Text style={{ fontSize: 30 }}>
            You scored {(100 * correct) / totalCards}%
          </Text>
        </View>
      );
    }

    const card = deck.cards[currentCard];

    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 15 }}>
          {currentCard + 1} / {totalCards}
        </Text>

        <View style={styles.details}>
          <Text style={flipped ? styles.answer : styles.question}>
            {flipped ? card.answer : card.question}
          </Text>

          <TouchableOpacity onPress={this.handleFlip}>
            <Text style={{ color: green }}>
              {flipped ? 'Question' : 'Answer'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 60 }}>
          <TouchableOpacity onPress={this.handleCorrect} style={[styles.button]}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleIncorrect} style={[styles.button, styles.buttonIncorrect, { marginTop: 10 }]}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (decks, { navigation }) => {
  const { title } = navigation.state.params;

  return {
    deck: decks[title]
  }
};

const styles = StyleSheet.create({
  answer: {
    fontSize: 22,
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
  buttonIncorrect: {
    backgroundColor: red
  },
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1
  },
  details: {
    alignItems: 'center',
    flex: 1,
    padding: 15
  },
  question: {
    fontSize: 30,
    marginBottom: 15
  }
});

export default connect(mapStateToProps)(Quiz);
