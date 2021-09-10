import {createStore} from "vuex"
import auth from "./modules/auth"
import exchange from "./modules/exchange"

export default createStore({
    state: () => ({
        theme: false,
    }),
    mutations: {
        toggleTheme(state: any) {
            state.theme = !state.theme
        },
    },
    modules: {
        auth,
        exchange,
    },
})
