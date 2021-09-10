import binance from '../../api/binance'
import exchange from '../../api/exchange'

// initial state
const state = () => ({
    assets: {},
    portfolios: {},
    portfolioAssets: {},
    // Binance APIs
    orderBook: {},
    recentTrades: [],
    currentAvgPrice: {},
    allOrderList: [],
    openOrderList: [],
    account: {},
    myTrades: [],
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
    orderBook: (state: any) => {
        return state.orderBook
    },
    recentTrades: (state: any) => {
        return state.recentTrades
    },
    currentAvgPrice: (state: any) => {
        return state.currentAvgPrice
    },
    allOrderList: (state: any) => {
        return state.allOrderList
    },
    openOrderList: (state: any) => {
        return state.openOrderList
    },
    account: (state: any) => {
        return state.account
    },
    myTrades: (state: any) => {
        return state.myTrades
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
    getTickerPriceChange({commit}: { commit: any }) {
        binance.getTickerPriceChange((response: any) => {
            commit('setTickerPriceChange', response)
        })
    },
    getAllOrderList({commit}: { commit: any }) {
        binance.getAllOrderList((response: any) => {
            commit('setAllOrderList', response)
        })
    },
    getOpenOrderList({commit}: { commit: any }) {
        binance.getOpenOrderList((response: any) => {
            commit('setOpenOrderList', response)
        })
    },
    getAccount({commit}: { commit: any }) {
        binance.getAccount((response: any) => {
            commit('setAccount', response)
        })
    },
    getMyTrades({commit}: { commit: any }) {
        binance.getMyTrades((response: any) => {
            commit('setMyTrades', response)
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
    // Binance APIs
    setOrderBook(state: any, payload: JSON) {
        state.orderBook = payload
    },
    setRecentTrades(state: any, payload: JSON) {
        state.recentTrades = payload
    },
    setCurrentAvgPrice(state: any, payload: JSON) {
        state.currentAvgPrice = payload
    },
    setAllOrderList(state: any, payload: JSON) {
        state.allOrderList = payload
    },
    setOpenOrderList(state: any, payload: JSON) {
        state.openOrderList = payload
    },
    setAccount(state: any, payload: any) {
        state.account = {
            ...payload,
            balances: payload.balances.filter((balance: any) => balance.free > 0 || balance.locked > 0),
        }
    },
    setMyTrades(state: any, payload: JSON) {
        state.myTrades = payload
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}