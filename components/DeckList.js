import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import DeckListItem from './DeckListItem';

// TODO: Retrieve data from Local Storage
import decks from '../utils/data';

export default class DeckList extends React.Component {
  handlePress = (title) => {
    this.props.navigation.navigate('DeckShow', {
      title: title
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {Object.keys(decks).map((title) => (
            <TouchableOpacity key={title} onPress={() => this.handlePress(title)}>
              <DeckListItem deck={decks[title]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}
