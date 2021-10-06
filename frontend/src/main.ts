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
import * as Sentry from "@sentry/vue"
import {Integrations} from "@sentry/tracing"

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

Sentry.init({
    app,
    dsn: "https://4dcbe683fe8b433cb3b696669e053f48@o1025312.ingest.sentry.io/5991900",
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.vueRouterInstrumentation(router),
            tracingOrigins: ["localhost", "crypto.gezici.me", /^\//],
        }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

app.config.globalProperties.$filters = {
    getHumanDate: function (date: Date) {
        return moment(date).format('DD/MM/YYYY hh:mm')
    },
}

app.use(store).use(router).mount("#app")
