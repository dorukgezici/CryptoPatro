import axios from "axios"

const BASE_URL = process.env.VUE_APP_BACKEND_URL

export default {
    // market
    getExchangeInformation(symbol?: string) {
        return axios.get(`${BASE_URL}/exchange_info/${symbol || ''}`)
    },
    getOrderBook(symbol: string) {
        return axios.get(`${BASE_URL}/order_book/${symbol}/`)
    },
    getRecentTrades(symbol: string) {
        return axios.get(`${BASE_URL}/recent_trades/${symbol}/`)
    },
    getCurrentAvgPrice(symbol: string) {
        return axios.get(`${BASE_URL}/current_avg_price/${symbol}/`)
    },
    getTickerPriceChange(symbol: string) {
        return axios.get(`${BASE_URL}/ticker_price_change/${symbol}/`)
    },
    // spot
    getAllOrderList(symbol: string) {
        return axios.get(`${BASE_URL}/all_order_list/${symbol}/`)
    },
    getOpenOrderList() {
        return axios.get(`${BASE_URL}/open_order_list/`)
    },
    getAccount() {
        return axios.get(`${BASE_URL}/account/`)
    },
    getMyTrades(symbol: string) {
        return axios.get(`${BASE_URL}/my_trades/${symbol}/`)
    },
}
