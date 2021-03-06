import React from 'react';
import thunk from 'redux-thunk';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { applyMiddleware, createStore } from 'redux';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import ConfigurableStatusBar from './components/ConfigurableStatusBar';
import DeckList from './components/DeckList';
import DeckShow from './components/DeckShow';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import Quiz from './components/Quiz';

import reducer from './reducers';

import { setLocalNotification } from './utils/notifications';
import { green, white } from './utils/colors';

const store = createStore(reducer, applyMiddleware(thunk));

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-albums" size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add-circle" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: green,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        height: 3,
        width: 0
      },
      shadowOpacity: 1,
      shadowRadius: 6
    }
  }
});

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckShow: {
    screen: DeckShow,
    navigationOptions: {
      headerStyle: {
        backgroundColor: green
      },
      headerTintColor: white
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerStyle: {
        backgroundColor: green
      },
      headerTintColor: white,
      title: 'Add Card'
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerStyle: {
        backgroundColor: green
      },
      headerTintColor: white
    }
  }
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <ConfigurableStatusBar
            backgroundColor={green}
            barStyle='light-content'
          />

          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
