import { AsyncStorage } from 'react-native'

export const UADCICARDS_STORAGE_KEY = 'UdaciCards'

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
            if (!data[title]) {
                data[title] = {
                    title: title,
                    questions: []
                }
                AsyncStorage.setItem(UADCICARDS_STORAGE_KEY, JSON.stringify(data))
            }
        })
}

export function addCardToDeck(title, card) {
    return AsyncStorage.getItem(UADCICARDS_STORAGE_KEY)
        .then((results) => {
            let data = JSON.parse(results)
            data[title].questions.push(card)
            const str = JSON.stringify(data)
            AsyncStorage.setItem(UADCICARDS_STORAGE_KEY, JSON.stringify(data))
        })
}

