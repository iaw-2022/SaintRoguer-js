import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

export async function getTags() {
    try {
        const response = await axios({
            url: `${baseUrl}/tags`,
            method: 'GET',
        })
        return response
    } catch (error) {
        console.log(error)
    }
}