import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL: string =
    process.env.NODE_ENV === 'production'
        ? 'https://api.ofertarepasse.com.br:2083'
        : 'http://localhost:2083'

let user: any = localStorage.getItem('ofertarepasse@user')
user = JSON.parse(user)

export const socket = io(URL, {
    extraHeaders: {
        Authorization: 'bearer ' + user?.token ?? '',
    },
})
