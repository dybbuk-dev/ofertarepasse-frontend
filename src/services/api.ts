/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:2483',
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
