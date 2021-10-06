import {createStore} from "vuex"
import auth from "./modules/auth"
import exchange from "./modules/exchange"

export default createStore({
    state: () => ({
        darkTheme: true,
    }),
    actions: {
        toggleDarkTheme({commit}: { commit: any }) {
            document.body.classList.toggle("dark")
            commit("TOGGLE_DARK_THEME")
        },
    },
    mutations: {
        TOGGLE_DARK_THEME(state: any) {
            state.darkTheme = !state.darkTheme
        },
    },
    modules: {
        auth,
        exchange,
    },
})
