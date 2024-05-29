import binance from "@/api/binance";
import exchange from "@/api/exchange";

// initial state
const state = () => ({
  symbol: "BTCUSDT",
  assets: [],
  portfolios: [],
  portfolioAssets: [],
  // Binance APIs
  orderBook: {},
  recentTrades: [],
  currentAvgPrice: {},
  tickerPriceChange: {},
  allOrderList: [],
  openOrderList: [],
  account: {},
  myTrades: [],
});

// getters
const getters = {
  symbol: (state: any) => {
    return state.symbol;
  },
  assets: (state: any) => {
    return state.assets;
  },
  portfolios: (state: any) => {
    return state.portfolios;
  },
  portfolioAssets: (state: any) => {
    return state.portfolioAssets;
  },
  // Binance API
  orderBook: (state: any) => {
    return state.orderBook;
  },
  recentTrades: (state: any) => {
    return state.recentTrades;
  },
  currentAvgPrice: (state: any) => {
    return state.currentAvgPrice;
  },
  tickerPriceChange: (state: any) => {
    return state.tickerPriceChange;
  },
  allOrderList: (state: any) => {
    return state.allOrderList;
  },
  openOrderList: (state: any) => {
    return state.openOrderList;
  },
  account: (state: any) => {
    return state.account;
  },
  myTrades: (state: any) => {
    return state.myTrades;
  },
};

// actions
const actions = {
  setSymbol({ commit }: { commit: any }, symbol: string) {
    commit("SET_SYMBOL", symbol);
  },
  async getAssets({ commit }: { commit: any }) {
    const response = await exchange.getAssets();
    commit("SET_ASSETS", response.data);
  },
  async getPortfolios({ commit }: { commit: any }) {
    const response = await exchange.getPortfolios();
    commit("SET_PORTFOLIOS", response.data);
  },
  async getPortfolioAssets({ commit }: { commit: any }) {
    const response = await exchange.getPortfolioAssets();
    commit("SET_PORTFOLIO_ASSETS", response.data);
  },
  // Binance APIs
  async getOrderBook({ state, commit }: { state: any; commit: any }) {
    const response = await binance.getOrderBook(state.symbol);
    commit("SET_ORDER_BOOK", response.data);
  },
  async getRecentTrades({ state, commit }: { state: any; commit: any }) {
    const response = await binance.getRecentTrades(state.symbol);
    commit("SET_RECENT_TRADES", response.data);
  },
  async getCurrentAvgPrice({ state, commit }: { state: any; commit: any }) {
    const response = await binance.getCurrentAvgPrice(state.symbol);
    commit("SET_CURRENT_AVG_PRICE", response.data);
  },
  async getTickerPriceChange({ state, commit }: { state: any; commit: any }) {
    const response = await binance.getTickerPriceChange(state.symbol);
    commit("SET_TICKER_PRICE_CHANGE", response.data);
  },
  async getAllOrderList({ state, commit }: { state: any; commit: any }) {
    const response = await binance.getAllOrderList(state.symbol);
    commit("SET_ALL_ORDER_LIST", response.data);
  },
  async getOpenOrderList({ commit }: { commit: any }) {
    const response = await binance.getOpenOrderList();
    commit("SET_OPEN_ORDER_LIST", response.data);
  },
  async getAccount({ commit }: { commit: any }) {
    const response = await binance.getAccount();
    commit("SET_ACCOUNT", response.data);
  },
  async getMyTrades({ state, commit }: { state: any; commit: any }) {
    const response = await binance.getMyTrades(state.symbol);
    commit("SET_MY_TRADES", response.data);
  },
};

// mutations
const mutations = {
  SET_SYMBOL(state: any, symbol: string) {
    state.symbol = symbol;
  },
  SET_ASSETS(state: any, payload: JSON) {
    state.assets = payload;
  },
  SET_PORTFOLIOS(state: any, payload: JSON) {
    state.portfolios = payload;
  },
  SET_PORTFOLIO_ASSETS(state: any, payload: JSON) {
    state.portfolioAssets = payload;
  },
  // Binance APIs
  SET_ORDER_BOOK(state: any, payload: JSON) {
    state.orderBook = payload;
  },
  SET_RECENT_TRADES(state: any, payload: JSON) {
    state.recentTrades = payload;
  },
  SET_CURRENT_AVG_PRICE(state: any, payload: JSON) {
    state.currentAvgPrice = payload;
  },
  SET_TICKER_PRICE_CHANGE(state: any, payload: JSON) {
    state.tickerPriceChange = payload;
  },
  SET_ALL_ORDER_LIST(state: any, payload: JSON) {
    state.allOrderList = payload;
  },
  SET_OPEN_ORDER_LIST(state: any, payload: JSON) {
    state.openOrderList = payload;
  },
  SET_ACCOUNT(state: any, payload: any) {
    state.account = {
      ...payload,
      balances: payload.balances.filter(
        (balance: any) => balance.free > 0 || balance.locked > 0,
      ),
    };
  },
  SET_MY_TRADES(state: any, payload: JSON) {
    state.myTrades = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
