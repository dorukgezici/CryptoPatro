import binance from '../../api/binance'
import exchange from '../../api/exchange'

// initial state
const state = () => ({
    assets: {},
    portfolios: {},
    portfolioAssets: {},
    // Binance API
    account: {},
    orderBook: {},
    recentTrades: [],
    currentAvgPrice: {},
})

// getters
const getters = {
    assets: (state: any) => {
        return state.assets
    },
    portfolios: (state: any) => {
        return state.portfolios
    },
    portfolioAssets: (state: any) => {
        return state.portfolioAssets
    },
    // Binance API
    account: (state: any) => {
        return state.account
    },
    orderBook: (state: any) => {
        return state.orderBook
    },
    recentTrades: (state: any) => {
        return state.recentTrades
    },
    currentAvgPrice: (state: any) => {
        return state.currentAvgPrice
    },
}

// actions
const actions = {
    getAssets({commit}: { commit: any }) {
        exchange.getAssets((response: any) => {
            commit('setAssets', response)
        })
    },
    getPortfolios({commit}: { commit: any }) {
        exchange.getPortfolios((response: any) => {
            commit('setPortfolios', response)
        })
    },
    getPortfolioAssets({commit}: { commit: any }) {
        exchange.getPortfolioAssets((response: any) => {
            commit('setPortfolioAssets', response)
        })
    },
    // Binance APIs
    getAccount({commit}: { commit: any }) {
        binance.getAccount((response: any) => {
            commit('setAccount', response)
        })
    },
    getOrderBook({commit}: { commit: any }) {
        binance.getOrderBook((response: any) => {
            commit('setOrderBook', response)
        })
    },
    getRecentTrades({commit}: { commit: any }) {
        binance.getRecentTrades((response: any) => {
            commit('setRecentTrades', response)
        })
    },
    getCurrentAvgPrice({commit}: { commit: any }) {
        binance.getCurrentAvgPrice((response: any) => {
            commit('setCurrentAvgPrice', response)
        })
    },
}

// mutations
const mutations = {
    setAssets(state: any, payload: JSON) {
        state.assets = payload
    },
    setPortfolios(state: any, payload: JSON) {
        state.portfolios = payload
    },
    setPortfolioAssets(state: any, payload: JSON) {
        state.portfolioAssets = payload
    },
    // Binance API
    setAccount(state: any, payload: JSON) {
        state.account = payload
    },
    setOrderBook(state: any, payload: JSON) {
        state.orderBook = payload
    },
    setRecentTrades(state: any, payload: JSON) {
        state.recentTrades = payload
    },
    setCurrentAvgPrice(state: any, payload: JSON) {
        state.currentAvgPrice = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}
