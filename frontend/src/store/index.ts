import {createStore} from "vuex";
import axios from 'axios'

const store = createStore({
    state: {
        assets: {},
        orderBook: {},
        recentTrades: {},
        me: {},
        balances: {},
        theme: true,
    },
    getters: {
        assets: state => {
            return state.assets;
        },
        orderBook: state => {
            return state.orderBook;
        },
        recentTrades: state => {
            return state.recentTrades;
        },
        me: state => {
            return state.me;
        },
        balances: state => {
            return state.balances;
        }
    },
    actions: {
        getAssets({commit}) {
            axios.get('http://127.0.0.1:8000/assets/', {
                headers: {
                    Authorization: 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991',
                },
            }).then(response => {
                commit('setAssets', response.data);
            })
        },
        getOrderBook({commit}) {
            axios.get('http://127.0.0.1:8000/order_book/BTCUSDT/', {
                headers: {
                    Authorization: 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991',
                },
            }).then(response => {
                commit('setOrderBook', response.data);
            })
        },
        getRecentTrades({commit}) {
            axios.get('http://127.0.0.1:8000/recent_trades/BTCUSDT/', {
                headers: {
                    Authorization: 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991',
                },
            }).then(response => {
                commit('setRecentTrades', response.data);
            })
        },
        getMe({commit}) {
            axios.get('http://127.0.0.1:8000/users/me/', {
                headers: {
                    Authorization: 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991',
                },
            }).then(response => {
                commit('setMe', response.data);
            })
        },
        getBalances({commit}) {
            axios.get('http://127.0.0.1:8000/', {
                headers: {
                    Authorization: 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991',
                },
            }).then(response => {
                commit('setBalances', response.data.balances);
            })
        },
    },
    mutations: {
        setAssets(state, response) {
            state.assets = response;
        },
        setOrderBook(state, response) {
            state.orderBook = response;
        },
        setRecentTrades(state, response) {
            state.recentTrades = response;
        },
        setMe(state, response) {
            state.me = response;
        },
        setBalances(state, response) {
            state.balances = response;
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
