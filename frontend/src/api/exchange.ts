import axios from "axios"

export default {
    getAssets() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/assets/`)
    },
    getPortfolios() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/portfolios/`)
    },
    getPortfolioAssets() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/portfolio_assets/`)
    },
    getNews() {
        return axios.get(`${process.env.VUE_APP_BACKEND_URL}/news/`)
    },
}
