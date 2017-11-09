import { AsyncStorage } from 'react-native'

export const UADCICARDS_STORAGE_KEY = 'UdaciCards'

export function getDecks() {
    return AsyncStorage.getAllKeys()
        .then((keys) => (AsyncStorage.multiGet(values).then((data) => JSON.parse(data))))
}

export function getDeck(id) {
    return AsyncStorage.getItem(id)
        .then((data) => JSON.parse(data))
}

export function saveDeckTitle(title) {
    return AsyncStorage.mergeItem(UADCICARDS_STORAGE_KEY, JSON.stringify({
        [title]: { title: title }
    }))
}

export function addCardToDeck(title, card) {
    return AsyncStorage.mergeItem(title, JSON.stringify(card))
}

