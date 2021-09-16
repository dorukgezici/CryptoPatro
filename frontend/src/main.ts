import {createApp} from "vue"
import App from "./App.vue"
import "./registerServiceWorker"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "./assets/css/ionicons.min.css"
import "./assets/scss/style.scss"
import router from "./router"
import store from "./store"
import moment from "moment"
import axios from "axios"

const token = localStorage.getItem('token')
if (token !== null) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
}

axios.interceptors.response.use((response) => {
    return response
}, (error) => {
    if (error.response.status === 401) {
        store.dispatch('auth/signOut', false).then(() => router.push('/login'))
    }
    return Promise.reject(error)
})

const app = createApp(App)

app.config.globalProperties.$filters = {
    getHumanDate: function (date: Date) {
        return moment(date).format('DD/MM/YYYY hh:mm')
    },
}

app.use(store).use(router).mount("#app")
