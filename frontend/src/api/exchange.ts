import axios from "axios"

export default {
    getAssets(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/assets/`).then(response => {
            cb(response.data)
        })
    },
    getPortfolios(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/portfolios/`).then(response => {
            cb(response.data)
        })
    },
    getPortfolioAssets(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/portfolio_assets/`).then(response => {
            cb(response.data)
        })
    },
    getNews(cb: any) {
        axios.get(`${process.env.VUE_APP_BACKEND_URL}/news/`).then(response => {
            cb(response.data)
        })
    },
}
