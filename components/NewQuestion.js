import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import { connect } from 'react-redux'
import { addNewCard } from '../actions'

class NewQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = { question: '', answer: '' }
        this.onAddCard = this.onAddCard.bind(this)
    }

    componentDidMount() {
        this.setState({ question: '', answer: '' })
    }

    onAddCard() {
        if (this.state.answer === '' || this.state.question === '') {
            Alert.alert('Please eneter a valid question and answer')
            return
        }
        this.props.onAddNewCard(this.props.title, this.state)
        this.props.goBack()
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(question) => this.setState({ question })}
                    value={this.state.question}
                    placeholder='Question'
                />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(answer) => this.setState({ answer })}
                    value={this.state.answer}
                    placeholder='Answer'
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.onAddCard}
                        title="Submit"
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
        onAddNewCard: (title, card) => {
            dispatch(addNewCard(title, card))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(NewQuestion)