import axios from "axios"

axios.defaults.headers.common['Authorization'] = 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991'

export default {
    getMe(cb: any) {
        axios.get('http://127.0.0.1:8000/users/me/').then(response => {
            cb(response.data)
        })
    },
}
