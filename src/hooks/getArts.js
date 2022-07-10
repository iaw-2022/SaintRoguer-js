import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

export async function getArts() {
    try {
        const response = await axios({
            url: `${baseUrl}/arts`,
            method: 'GET',
        })
        return response
    } catch (error) {
        console.log(error)
    }
}