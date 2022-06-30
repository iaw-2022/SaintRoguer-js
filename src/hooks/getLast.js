import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

export async function getMovies() {
    try {
        const response = await axios({
            url: `${baseUrl}/last`,
            method: 'GET',
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function getArtImage(props) {
    console.log(props)
    const { slug } = props
    try {
        const response = await axios({
            url: `${baseUrl}/art/${slug}/image`,
            method: 'GET',
        })
        return response
    } catch (error) {
        console.log(error)
    }
}