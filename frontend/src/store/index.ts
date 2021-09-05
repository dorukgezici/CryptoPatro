import {createStore} from "vuex"
import auth from "./modules/auth"
import exchange from "./modules/exchange"

const store = createStore({
    modules: {
        auth,
        exchange,
    },
})

export default store
