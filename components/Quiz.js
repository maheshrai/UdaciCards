import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import { connect } from 'react-redux'
import { addNewCard } from '../actions'

class Quiz extends Component {

    constructor(props) {
        super(props);
        this.state = { index: 0, card: {}, showAnswer: false, quizComplete: false, score: 0 }
        this.onFlipCard = this.onFlipCard.bind(this)
        this.onCorrect = this.onCorrect.bind(this)
        this.onIncorrect = this.onIncorrect.bind(this)
        this.updateQuiz = this.updateQuiz.bind(this)
        this.onRestartQuiz = this.onRestartQuiz.bind(this)
    }

    componentDidMount() {
        this.onRestartQuiz()
    }

    onFlipCard() {
        this.setState({ showAnswer: !this.state.showAnswer })
    }

    onCorrect() {
        this.updateQuiz(true)
    }

    onIncorrect() {
        this.updateQuiz(false)
    }

    updateQuiz(correct) {
        const { deck } = this.props
        let { index, quizComplete, score } = this.state
        if (!quizComplete) index++
        if (!quizComplete && correct) score++
        if (index === deck.questions.length) quizComplete = true
        if (!quizComplete) {
            this.setState({ index: index, card: deck.questions[index], score: score })
        } else {
            this.setState({ quizComplete: true, score: score })
        }
    }

    onRestartQuiz() {
        const { deck } = this.props
        this.setState({ index: 0, card: deck.questions[0], showAnswer: false, quizComplete: false, score: 0 })
    }

    render() {
        const { deck } = this.props
        const { card, showAnswer, quizComplete, index, score } = this.state
        const totalQuestions = deck.questions.length
        const remainingQuestions = totalQuestions - index
        const finalScore = (score / totalQuestions) * 100

        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    {!quizComplete && <Text style={styles.cardText}>{`Remaining Questions: ${remainingQuestions}/${totalQuestions}`}</Text>}
                    {quizComplete && <Text style={styles.cardText}>{`Your Score is ${finalScore}%`}</Text>}
                    {!showAnswer &&
                        <Text style={styles.cardTitle}>{card.question}</Text>
                    }
                    {showAnswer &&
                        <Text style={styles.cardTitle}>{card.answer}</Text>
                    }
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.onFlipCard}
                        title={showAnswer ? "Question" : "Answer"}
                        color="#841584"
                    />
                    {!quizComplete &&
                        <Button
                            onPress={this.onCorrect}
                            title="Correct"
                            color="#841584"
                        />
                    }
                    {!quizComplete &&
                        <Button
                            onPress={this.onIncorrect}
                            title="Incorrect"
                            color="#841584"
                        />
                    }
                    {quizComplete &&
                        <Button
                            onPress={this.onRestartQuiz}
                            title="Restart Quiz"
                            color="#841584"
                        />
                    }
                    {quizComplete &&
                        <Button
                            onPress={() => { this.props.goBack() }}
                            title="Back to Deck"
                            color="#841584"
                        />
                    }
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
        goBack: () => navigation.goBack()
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(Quiz)