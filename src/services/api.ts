/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const api = axios.create({
    baseURL:
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:2083'
            : 'https://api.ofertarepasse.com.br:2083',
})

api.interceptors.request.use(
    async (config: any) => {
        let user: any = localStorage.getItem('ofertarepasse@user')

        if (user) {
            user = JSON.parse(user)
            config.headers['Authorization'] = 'bearer ' + user.token

            return config
        }
        return config
    },
    (error: any) => {
        Promise.reject(error)
    }
)

export default api
