import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { green, grey, white } from '../utils/colors';

class DeckShow extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
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

        <View style={{ marginBottom: 30 }}>
          <TouchableOpacity onPress={() => this.handleNewCard(deck.title)} style={[styles.button, styles.buttonSecondary]}>
            <Text style={[styles.buttonText, styles.buttonTextSecondary]}>Add Card</Text>
          </TouchableOpacity>

          {deck.cards.length > 0 &&
            <TouchableOpacity onPress={() => this.handleStartQuiz(deck.title)} style={[styles.button, { marginTop: 15 }]}>
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
    paddingHorizontal: 30,
    paddingVertical: 25
  },
  details: {
    alignItems: 'center',
    flex: 1
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 5
  },
  cardCount: {
    color: grey,
    fontSize: 22,
    marginTop: 15
  }
});

export default connect(mapStateToProps)(DeckShow);
