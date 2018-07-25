import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { green, white } from '../utils/colors';

// TODO: Retrieve data from Local Storage
import decks from '../utils/data';

class DeckShow extends React.Component {
  handleAddCard = () => {
    // TODO: Navigate to new card view
  }

  handleStartQuiz = () => {
    // TODO: Navigate to quiz view
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.title}>{deck.title}</Text>

          <Text style={styles.cardCount}>
            {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'}
          </Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.handleAddCard} style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleStartQuiz} style={[styles.button, { marginTop: 10 }]}>
            <Text style={styles.buttonText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params;

  return {
    deck: decks[title]
  }
};

const styles = StyleSheet.create({
  buttonSecondary: {
    backgroundColor: white,
    borderColor: green,
    borderWidth: 1
  },
  buttonTextSecondary: {
    color: green
  },
  button: {
    backgroundColor: green,
    borderRadius: 5,
    height: 40,
    padding: 10
  },
  buttonText: {
    color: white,
    fontSize: 16,
    textAlign: 'center'
  },
  buttons: {
    marginBottom: 60
  },
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1
  },
  details: {
    alignItems: 'center',
    flex: 1,
    padding: 60
  },
  title: {
    fontSize: 48,
    marginBottom: 5
  },
  cardCount: {
    color: '#999',
    fontSize: 28
  }
});

export default connect(mapStateToProps)(DeckShow);
