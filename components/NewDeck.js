import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { handleAddDeck } from '../actions';

import { green, white } from '../utils/colors';

class NewDeck extends React.Component {
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
    this.props.handleAddDeck(this.state.title);

    this.setState({
      title: ''
    });

    this.navigateBack();
  }

  navigateBack = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'NewDeck'
    }));
  }

  render() {
    return (
      <View style={styles.container}>
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
  container: {
    alignItems: 'center',
    backgroundColor: white,
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

const mapDispatchToProps = {
  handleAddDeck
};

export default connect(null, mapDispatchToProps)(NewDeck);
