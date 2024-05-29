import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export default {
  async getAssets() {
    const res = await axios.get(`${BACKEND_URL}/assets/`);
    return res.data;
  },
  async getPortfolios() {
    const res = await axios.get(`${BACKEND_URL}/portfolios/`);
    return res.data;
  },
  async getPortfolioAssets() {
    const res = await axios.get(`${BACKEND_URL}/portfolio_assets/`);
    return res.data;
  },
  async getNews() {
    const res = await axios.get(`${BACKEND_URL}/news/`);
    return res.data;
  },
};
