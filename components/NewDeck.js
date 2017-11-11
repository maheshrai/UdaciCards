import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux'
import { addNewDeck } from '../actions'

class NewDeck extends Component {

    constructor(props) {
        super(props);
        this.state = { title: '' }
        this.onAddDeck = this.onAddDeck.bind(this)
    }

    onAddDeck() {
        this.props.onAddNewDeck(this.state.title)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Text style={styles.cardTitle}>What is the title of your new Deck?</Text>
                </View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={(title) => this.setState({ title })}
                    value={this.state.title}
                    placeholder='Deck Title'
                />
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this.onAddDeck}
                        title="Add Deck"
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

const mapStateToProps = (decks) => (decks)

const mapDispatchToProps = dispatch => ({
    onAddNewDeck: (title) => {
        dispatch(addNewDeck(title))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewDeck)