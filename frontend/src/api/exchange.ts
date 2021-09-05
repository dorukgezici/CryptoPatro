import axios from "axios"

axios.defaults.headers.common['Authorization'] = 'Token c73ad7196b0bbdd860b0a184535ba60c5d14d991'

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
