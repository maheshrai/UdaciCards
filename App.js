import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import Deck from './components/Deck'
import DeckList from './components/DeckList'
import { purple, white } from './utils/colors'
import reducer from './reducers'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
