const WIKIPEDIA_URL = "https://fr.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exintro=&titles="

export class Wikipedia {

    static getExtracts(toSearch) {
        return fetch(WIKIPEDIA_URL + toSearch, {
            method: 'GET'
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            return json
        })
    }
}