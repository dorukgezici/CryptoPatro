import axios from "axios"

export default {
    signIn(cb: any, username: string, password: string) {
        axios.post('http://127.0.0.1:8000/users/sign-in/', {
            'username': username,
            'password': password,
        }).then(response => {
            cb(response.data)
        })
    },
    signUp(cb: any, email: string, username: string, firstName: string, lastName: string, password: string, password2: string) {
        axios.post('http://127.0.0.1:8000/users/sign-up/', {
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
        axios.get('http://127.0.0.1:8000/users/sign-out/').then(response => {
            cb(response.data)
        })
    },
    getMe(cb: any) {
        axios.get('http://127.0.0.1:8000/users/me/').then(response => {
            cb(response.data)
        })
    },
}
