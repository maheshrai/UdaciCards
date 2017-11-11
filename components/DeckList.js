import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors'
import { AppLoading } from 'expo'
import { saveDeckTitle, getDecks, addCardToDeck } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
    const { dispatch } = this.props
    const json = {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
    }
    // Load Initial data

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })))
  }

  _keyExtractor = (item, index) => item.title;

  _renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Deck', { title: item.title })}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardText}>{item.questions ? item.questions.length : 0}</Text>
      </View>
    </TouchableOpacity>)

  render() {
    const { decks } = this.props
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    return (
      <FlatList
        data={Object.values(decks)}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  card: {
    justifyContent: 'space-around',
    flex: 1,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: lightPurp,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10
  },
  cardTitle: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 5,
  },
  cardText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
})

function mapStateToProps(decks) {
  return {
    decks
  }
}
export default connect(
  mapStateToProps,
)(DeckList)