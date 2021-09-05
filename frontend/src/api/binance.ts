import axios from "axios"

axios.defaults.headers.common['Authorization'] = 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991'

export default {
    getAccount(cb: any) {
        axios.get('http://127.0.0.1:8000/account/').then(response => {
            cb(response.data)
        })
    },
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
}
