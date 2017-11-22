import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { receiveDecks } from '../actions'
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors'
import { AppLoading } from 'expo'
import { saveDeckTitle, getDecks, addCardToDeck, clearDecks } from '../utils/api'

class DeckList extends Component {
  state = {
    ready: false,
    totalFlashCards: 0
  }

  componentDidMount() {
    const { dispatch } = this.props
    
    getDecks()
      .then((decks) => this.props.onLoadDecks(decks))
      .then(() => this.setState(() => ({ ready: true })))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.totalFlashCards !== nextProps.totalFlashCards) {
      this.setState({ totalFlashCards: nextProps.totalFlashCards })
    }
  }

  _keyExtractor = (item, index) => item.title

  _renderItem = ({ item }) => {
    return <TouchableOpacity
      onPress={() => this.props.navigation.navigate('Deck', { title: item.title })}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardText}>{item.questions.length}</Text>
      </View>
    </TouchableOpacity>
  }

  render() {
    const { decks } = this.props
    const { ready } = this.state

    if (ready === false) {
      return <AppLoading />
    }
    return (
      <FlatList
        data={decks}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        extraData={this.state}
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

const mapStateToProps = (card) => ({
  decks: card.decks,
  totalFlashCards: card.flashCardCount
})

const mapDispatchToProps = dispatch => ({
  onLoadDecks: (decks) => {
    if (decks) dispatch(receiveDecks(Object.values(decks)))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {
    pure: false
  }
)(DeckList)