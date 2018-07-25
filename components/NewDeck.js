import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { green, white } from '../utils/colors';

export default class DeckList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ''
    };
  }

  handleChangeText = (title) => {
    this.setState({
      title
    });
  }

  handleSubmit = () => {
    // TODO: Update data in Local Storage
  }

  render() {
    return (
      <View style={styles.form}>
        <Text style={styles.label}>What is the title of your new deck?</Text>

        <TextInput
          onChangeText={this.handleChangeText}
          style={styles.textInput}
          placeholder="Deck Title"
          value={this.state.title}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    alignItems: 'center',
    flex: 1,
    padding: 30
  },
  label: {
    fontSize: 20,
    marginBottom: 15
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
  textInput: {
    borderColor: '#000',
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    marginBottom: 15,
    padding: 10,
    width: '100%'
  }
});
