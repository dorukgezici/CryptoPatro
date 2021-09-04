import {createStore} from "vuex";
import axios from 'axios'

const store = createStore({
    state: {
        me: {},
        theme: true,
    },
    getters: {
        me: state => {
            return state.me;
        },
    },
    actions: {
        getMe({commit}) {
            axios.get('http://127.0.0.1:8000/users/me/', {
                headers: {
                    Authorization: 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991',
                },
            }).then(response => {
                commit('getMe', response.data);
            })
        },
    },
    mutations: {
        getMe(state, response) {
            state.me = response;
        },
        changeTheme(state) {
            if (state.theme) {
                state.theme = false;
            } else {
                state.theme = true;
            }
        },
    },
});

export default store;
