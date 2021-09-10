import axios from "axios"

export default {
    // market
    getOrderBook(cb: any) {
        axios.get('http://127.0.0.1:8000/order_book/BTCUSDT/').then(response => {
            cb(response.data)
        })
    },
    getRecentTrades(cb: any) {
        axios.get('http://127.0.0.1:8000/recent_trades/BTCUSDT/').then(response => {
            cb(response.data)
        })
    },
    getCurrentAvgPrice(cb: any) {
        axios.get('http://127.0.0.1:8000/current_avg_price/BTCUSDT/').then(response => {
            cb(response.data)
        })
    },
    getTickerPriceChange(cb: any) {
        axios.get('http://127.0.0.1:8000/ticker_price_change/BTCUSDT/').then(response => {
            cb(response.data)
        })
    },
    // spot
    getAllOrderList(cb: any) {
        axios.get('http://127.0.0.1:8000/all_order_list/BTCUSDT/').then(response => {
            cb(response.data)
        })
    },
    getOpenOrderList(cb: any) {
        axios.get('http://127.0.0.1:8000/open_order_list/').then(response => {
            cb(response.data)
        })
    },
    getAccount(cb: any) {
        axios.get('http://127.0.0.1:8000/account/').then(response => {
            cb(response.data)
        })
    },
    getMyTrades(cb: any) {
        axios.get('http://127.0.0.1:8000/my_trades/BTCUSDT/').then(response => {
            cb(response.data)
        })
    },
}
