import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Button, Alert, Animated } from 'react-native';
import { red, orange, blue, lightPurp, pink, white, purple } from '../utils/colors'
import { connect } from 'react-redux'

class Deck extends Component {

  constructor(props) {
    super(props);
    this.onStartQuiz = this.onStartQuiz.bind(this)
  }

  state = {
    bounceValue: new Animated.Value(1)
  }

  componentDidMount() {
    const { bounceValue } = this.state
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 1 })
    ]).start()
  }

  onStartQuiz() {
    const { title, deck } = this.props
    if (!deck || deck.questions.length == 0) {
      Alert.alert('The deck has no cards to start the quiz')
      return
    }
    this.props.navigation.navigate('Quiz', { title: title })
  }

  render() {
    const { title, deck } = this.props
    const { bounceValue } = this.state
    return (
      <Animated.View style={[styles.container, { transform: [{ scale: bounceValue }] }]}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardText}>{deck ? deck.questions.length : 0} Cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.props.navigation.navigate('NewQuestion', { title: deck.title })}
            title="Add Card"
            color="#841584"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this.onStartQuiz}
            title="Start Quiz"
            color="#841584"
          />
        </View>
      </Animated.View>
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
    margin: 10,
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

function mapStateToProps(card, { navigation }) {
  const { title } = navigation.state.params

  return {
    title,
    deck: card.decks.find(d => d.title === title),
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
  null,
  {
    pure: false
  }
)(Deck)