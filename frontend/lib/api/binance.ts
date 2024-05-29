import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export default {
  // market
  getExchangeInformation(symbol?: string) {
    return axios.get(`${BACKEND_URL}/exchange_info/${symbol || ""}`);
  },
  getOrderBook(symbol: string) {
    return axios.get(`${BACKEND_URL}/order_book/${symbol}/`);
  },
  getRecentTrades(symbol: string) {
    return axios.get(`${BACKEND_URL}/recent_trades/${symbol}/`);
  },
  getCurrentAvgPrice(symbol: string) {
    return axios.get(`${BACKEND_URL}/current_avg_price/${symbol}/`);
  },
  getTickerPriceChange(symbol: string) {
    return axios.get(`${BACKEND_URL}/ticker_price_change/${symbol}/`);
  },
  // spot
  getAllOrderList(symbol: string) {
    return axios.get(`${BACKEND_URL}/all_order_list/${symbol}/`);
  },
  getOpenOrderList() {
    return axios.get(`${BACKEND_URL}/open_order_list/`);
  },
  getAccount() {
    return axios.get(`${BACKEND_URL}/account/`);
  },
  getMyTrades(symbol: string) {
    return axios.get(`${BACKEND_URL}/my_trades/${symbol}/`);
  },
};
