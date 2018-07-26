import React from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { handleAddDeck } from '../actions';

import { green, red, white } from '../utils/colors';

class NewDeck extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      title: ''
    };
  }

  handleChangeText = (title) => {
    this.setState({
      title
    });
  }

  handleSubmit = () => {
    const { title } = this.state;

    if (title === '') {
      this.setState({
        hasError: true
      });
    } else {
      this.props.handleAddDeck(title);

      this.setState({
        hasError: false,
        title: ''
      });

      this.props.navigation.goBack();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>What is the title of your new deck?</Text>

          <TextInput
            autoFocus
            onChangeText={this.handleChangeText}
            placeholder="Deck Title"
            style={styles.textInput}
            value={this.state.title}
          />
        </View>

        <View>
          {this.state.hasError && (
            <Text style={styles.errorText}>Please enter a title for the deck</Text>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingVertical: 25
  },
  errorText: {
    color: red,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center'
  },
  label: {
    fontSize: 20,
    marginBottom: 15
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
