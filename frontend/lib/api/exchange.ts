import axios from "axios"

export default {
    getAssets() {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/assets/`)
    },
    getPortfolios() {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/portfolios/`)
    },
    getPortfolioAssets() {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/portfolio_assets/`)
    },
    getNews() {
        return axios.get(`${import.meta.env.VITE_BACKEND_URL}/news/`)
    },
}
