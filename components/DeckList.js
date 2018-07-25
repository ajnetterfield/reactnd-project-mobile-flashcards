import React from 'react';
import { ScrollView, View } from 'react-native';

import Deck from './Deck';

// TODO: Retrieve data from Local Storage
import decks from '../utils/data';

export default class DeckList extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {Object.keys(decks).map((key) => (
            <Deck deck={decks[key]} key={key} />
          ))}
        </ScrollView>
      </View>
    );
  }
}
