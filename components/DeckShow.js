import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { green, white } from '../utils/colors';

class DeckShow extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title} Deck`
  });

  handleNewCard = (title) => {
    this.props.navigation.navigate('NewCard', {
      title: title
    });
  }

  handleStartQuiz = (title) => {
    this.props.navigation.navigate('Quiz', {
      title: title
    });
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.details}>
          <Text style={styles.title}>{deck.title}</Text>

          <Text style={styles.cardCount}>
            {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
          </Text>
        </View>

        <View style={{ marginBottom: 60 }}>
          <TouchableOpacity onPress={() => this.handleNewCard(deck.title)} style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Add Card</Text>
          </TouchableOpacity>

          {deck.cards.length > 0 &&
            <TouchableOpacity onPress={() => this.handleStartQuiz(deck.title)} style={[styles.button, { marginTop: 10 }]}>
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          }
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
