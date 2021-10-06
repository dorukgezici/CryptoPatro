<template>
  <div class="container-fluid mtb15 no-fluid">
    <div class="row sm-gutters">
      <div class="col-sm-12 col-md-3">
        <MarketPairs/>
      </div>
      <div class="col-sm-12 col-md-6">
        <TradingChart v-if="darkTheme" :symbol="symbol" theme="dark"/>
        <TradingChart v-else :symbol="symbol" theme="light"/>
        <MarketTrade/>
      </div>
      <div class="col-md-3">
        <OrderBook/>
        <MarketHistory/>
      </div>
      <div class="col-md-3">
        <MarketNews/>
      </div>
      <div class="col-md-9">
        <HistoryOrder/>
      </div>
    </div>
  </div>
</template>

<script>
import MarketPairs from "../components/MarketPairs.vue"
import TradingChart from "../components/TradingChart.vue"
import MarketTrade from "../components/MarketTrade.vue"
import OrderBook from "../components/OrderBook.vue"
import MarketHistory from "../components/MarketHistory.vue"
import MarketNews from "../components/MarketNews.vue"
import HistoryOrder from "../components/HistoryOrder.vue"
import {mapState} from "vuex"

export default {
  computed: {
    ...mapState([
      'darkTheme',
    ]),
    ...mapState('exchange', [
      'symbol',
    ]),
  },
  components: {
    MarketPairs,
    TradingChart,
    MarketTrade,
    OrderBook,
    MarketHistory,
    MarketNews,
    HistoryOrder,
  },
}
</script>
