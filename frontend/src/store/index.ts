import {createStore} from "vuex"
import auth from "./modules/auth"
import exchange from "./modules/exchange"

export default createStore({
    state: () => ({
        theme: false,
    }),
    actions: {
        toggleTheme({commit}: { commit: any }) {
            document.body.classList.toggle("dark")
            commit("TOGGLE_THEME")
        },
    },
    mutations: {
        TOGGLE_THEME(state: any) {
            state.theme = !state.theme
        },
    },
    modules: {
        auth,
        exchange,
    },
})
