import axios from "axios"

const API_BASE_URL = "https://cold-issie-uf-officials-7d76a96e.koyeb.app/api/v1"

export const signUp = async (userData: FormData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, userData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error) {
        throw error
    }
}

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, { email, password })
        return response.data
    } catch (error) {
        throw error
    }
}
