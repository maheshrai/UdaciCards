import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { receiveCards } from '../actions'
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors'
import { AppLoading } from 'expo'
import { saveDeckTitle, getDecks } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false,
  }

  componentDidMount() {
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
    saveDeckTitle('React')
    saveDeckTitle('JavaScript')
    this.setState(() => ({ ready: true }))
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Deck')}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.key}</Text>
        <Text style={styles.cardText}>{item.cnt}</Text>
      </View>
    </TouchableOpacity>)

  render() {
    const { entries } = this.props
    const { ready } = this.state
    if (ready === false) {
      return <AppLoading />
    }
    return (
      <FlatList
        data={[
          { key: 'Devin', cnt: 1 },
          { key: 'Jackson', cnt: 5 },
          { key: 'James', cnt: 10 },
          { key: 'Joel', cnt: 3 },
          { key: 'John', cnt: 2 },
          { key: 'Jillian', cnt: 4 },
          { key: 'Jimmy', cnt: 1 },
          { key: 'Julie', cnt: 1 },
        ]}
        renderItem={this.renderItem}
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

function mapStateToProps(cards) {
  return {
    cards
  }
}
export default connect(
  mapStateToProps,
)(DeckList)