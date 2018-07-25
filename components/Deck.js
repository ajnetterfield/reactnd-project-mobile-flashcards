import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Deck extends React.Component {
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.deck}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardCount}>{deck.questions.length} cards</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  deck: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 30,
    paddingTop: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 5
  },
  cardCount: {
    color: '#999',
    fontSize: 14
  }
});
