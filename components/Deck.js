import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button, Alert } from 'react-native';
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors'
import { connect } from 'react-redux'

class Deck extends Component {

  _onPressButton() {
    Alert.alert('You tapped the button!')
  }

  render() {
    const { card } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardText}>{card.questions.length} Cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Add Card"
            color="#841584"
          />
          <Button
            onPress={this._onPressButton}
            title="Start Quiz"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cardContainer: {
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  buttonContainer: {
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  cardTitle: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 5,
  },
  cardText: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
})

function mapStateToProps(state, { navigation }) {
  const { title } = navigation.state.params

  return {
    title,
    card: state[title],
  }
}

function mapDispatchToProps(dispatch, { navigation }) {
  const { title } = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Deck)