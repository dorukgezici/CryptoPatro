import axios from "axios"

export default {
    signIn(username: string, password: string) {
        return axios.post(`${process.env.VUE_APP_BACKEND_URL}/users/sign-in/`, {
            'username': username,
            'password': password,
        })
    },
    signUp(email: string, username: string, firstName: string, lastName: string, password: string, password2: string) {
        return axios.post(`${process.env.VUE_APP_BACKEND_URL}/users/sign-up/`, {
            'email': email,
            'username': username,
            'firstName': firstName,
            'lastName': lastName,
            'password': password,
            'password2': password2,
        })
    },
    signOut() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/users/sign-out/`)
    },
    getMe() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/users/me/`)
    },
}
