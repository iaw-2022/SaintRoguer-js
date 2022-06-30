import axios from 'axios'

const key = process.env.REACT_APP_API_KEY

export async function getMovies() {
    try {
        const response = await axios({
            url: `https://imdb-api.com/en/API/MostPopularMovies/${key}`,
            method: 'GET',
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getSeries() {
    try {
        const response = await axios({
            url: `https://imdb-api.com/en/API/MostPopularTVs/${key}`,
            method: 'GET',
        })
        return response
    } catch (error) {
        console.log(error)
    }
}