import { AsyncStorage } from 'react-native'

export const UADCICARDS_STORAGE_KEY = 'UdaciCards'

export function clearDecks() {
    return AsyncStorage.setItem(UADCICARDS_STORAGE_KEY, '{}')
}

export function getDecks() {
    return AsyncStorage.getItem(UADCICARDS_STORAGE_KEY)
        .then((results) => JSON.parse(results))
}

export function getDeck(id) {
    return AsyncStorage.getItem(UADCICARDS_STORAGE_KEY)
        .then((results) => JSON.parse(results)[id])
}

export function saveDeckTitle(title) {
    return AsyncStorage.getItem(UADCICARDS_STORAGE_KEY)
        .then((results) => {
            let data = JSON.parse(results)
            if (data[title] !== null) {
                data[title] = {
                    title: title,
                    questions: []
                }
                AsyncStorage.setItem(UADCICARDS_STORAGE_KEY, JSON.stringify(data))
                return data[title]
            }
            return false
        })
}

export function addCardToDeck(title, card) {
    AsyncStorage.getItem(UADCICARDS_STORAGE_KEY)
        .then((results) => {
            let data = JSON.parse(results)
            data[title].questions.push(card)
            const str = JSON.stringify(data)
            AsyncStorage.setItem(UADCICARDS_STORAGE_KEY, JSON.stringify(data))
        })
}

