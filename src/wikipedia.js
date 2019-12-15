const WIKIPEDIA_URL = "https://fr.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exintro=&titles="

export class Wikipedia {

    static async getExtract(toSearch) {
        let uri
        let extract

        uri = encodeURI(WIKIPEDIA_URL + toSearch + ' (département)')
        extract = await Wikipedia.fetchWikipedia(uri)
        if (extract) return extract

        uri = encodeURI(WIKIPEDIA_URL + toSearch + ' (département français)')
        extract = await Wikipedia.fetchWikipedia(uri)
        if (extract) return extract

        uri = encodeURI(WIKIPEDIA_URL + toSearch)
        extract = await Wikipedia.fetchWikipedia(uri)
        return extract
    }

    static async fetchWikipedia(uri) {
        return fetch(uri, {
            method: 'GET'
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            let pages = json.query.pages
            return pages[Object.keys(pages)[0]].extract
        })
    }
}
