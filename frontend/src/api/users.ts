import axios from "axios"

export default {
    signIn(cb: any, username: string, password: string) {
        axios.post(`${process.env.VUE_APP_BACKEND_URL}/users/sign-in/`, {
            'username': username,
            'password': password,
        }).then(response => {
            cb(response.data)
        })
    },
    signUp(cb: any, email: string, username: string, firstName: string, lastName: string, password: string, password2: string) {
        axios.post(`${process.env.VUE_APP_BACKEND_URL}/users/sign-up/`, {
            'email': email,
            'username': username,
            'firstName': firstName,
            'lastName': lastName,
            'password': password,
            'password2': password2,
        }).then(response => {
            cb(response.data)
        })
    },
    signOut(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/users/sign-out/`).then(response => {
            cb(response.data)
        })
    },
    getMe(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/users/me/`).then(response => {
            cb(response.data)
        })
    },
}
