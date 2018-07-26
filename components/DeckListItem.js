import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { grey } from '../utils/colors';

export default class DeckListItem extends React.Component {
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>

        <Text style={styles.cardCount}>
          {deck.cards.length} {deck.cards.length === 1 ? 'card' : 'cards'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: grey,
    borderBottomWidth: 1,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 25
  },
  title: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: 'center'
  },
  cardCount: {
    color: grey,
    fontSize: 14,
    textAlign: 'center'
  }
});
