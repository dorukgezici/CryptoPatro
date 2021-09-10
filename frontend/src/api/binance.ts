import axios from "axios"

export default {
    // market
    getOrderBook(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/order_book/BTCUSDT/`).then(response => {
            cb(response.data)
        })
    },
    getRecentTrades(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/recent_trades/BTCUSDT/`).then(response => {
            cb(response.data)
        })
    },
    getCurrentAvgPrice(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/current_avg_price/BTCUSDT/`).then(response => {
            cb(response.data)
        })
    },
    getTickerPriceChange(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/ticker_price_change/BTCUSDT/`).then(response => {
            cb(response.data)
        })
    },
    // spot
    getAllOrderList(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/all_order_list/BTCUSDT/`).then(response => {
            cb(response.data)
        })
    },
    getOpenOrderList(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/open_order_list/`).then(response => {
            cb(response.data)
        })
    },
    getAccount(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/account/`).then(response => {
            cb(response.data)
        })
    },
    getMyTrades(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/my_trades/BTCUSDT/`).then(response => {
            cb(response.data)
        })
    },
}
