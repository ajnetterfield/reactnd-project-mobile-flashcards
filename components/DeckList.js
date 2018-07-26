import React from 'react';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native';

import DeckListItem from './DeckListItem';

import { decks } from '../reducers';
import { receiveDecks } from '../actions';

import { getDecks, getEmpty } from '../utils/api';
import { white } from '../utils/colors';

class DeckList extends React.Component {
  componentDidMount() {
    getDecks()
      .then((decks) => {
        this.props.receiveDecks(decks)
      });
  }

  handlePress = (title) => {
    this.props.navigation.navigate('DeckShow', {
      title: title
    });
  }

  render() {
    const { decks } = this.props;

    const titles = Object.keys(decks);

    if (titles.length === 0) {
      return (
        <View style={styles.empty}>
          <Ionicons name="ios-albums-outline" size={90} />
          <Text style={styles.emptyText}>You don't have any decks yet</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {titles.map((title) => (
            <TouchableOpacity key={title} onPress={() => this.handlePress(title)}>
              <DeckListItem deck={decks[title]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center'
  },
  emptyText: {
    fontSize: 22
  }
});

const mapStateToProps = (decks) => ({
  decks
});

const mapDispatchToProps = {
  receiveDecks
};

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
