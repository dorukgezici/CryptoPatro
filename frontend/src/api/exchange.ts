import axios from "axios"

export default {
    getAssets(cb: any) {
        axios.get('http://127.0.0.1:8000/assets/').then(response => {
            cb(response.data)
        })
    },
    getPortfolios(cb: any) {
        axios.get('http://127.0.0.1:8000/portfolios/').then(response => {
            cb(response.data)
        })
    },
    getPortfolioAssets(cb: any) {
        axios.get('http://127.0.0.1:8000/portfolio_assets/').then(response => {
            cb(response.data)
        })
    },
}
