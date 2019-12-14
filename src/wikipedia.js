const WIKIPEDIA_URL = "https://fr.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exintro=&titles="

export class Wikipedia {

    static getExtracts(toSearch) {
        return new Promise(function (resolve, reject) {
            fetch(WIKIPEDIA_URL + toSearch, {
                method: 'GET'
            }).then(function (response) {
                response.json()
                    .then(function (value) {
                        console.log('value', value)
                        return resolve(value)
                    });
            })
        })
        // try {
        // let resp = await fetch(WIKIPEDIA_URL + toSearch, { method: 'GET', mode: 'no-cors' })
        // fetch(WIKIPEDIA_URL, {
        //     method: 'GET',
        //     mode: 'no-cors'
        // headers: {
        //     'Accept': 'application/json'
        // }
        // }).then(resp => resp.text().then(data => console.log('data', data))).catch(error => console.log('ERR', error))
        //     console.log(resp.json())
        // } catch (error) {
        //     console.log(error)
        // }


    }
}
