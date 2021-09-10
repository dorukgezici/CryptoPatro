<template>
  <div class="container-fluid mtb15 no-fluid">
    <div class="row sm-gutters">
      <div class="col-sm-12 col-md-3">
        <MarketPairs />
      </div>
      <div class="col-sm-12 col-md-6">
        <TradingChart v-if="$store.state.theme" />
        <TradingChartDark v-else />
        <MarketTrade />
      </div>
      <div class="col-md-3">
        <OrderBook />
        <MarketHistory />
      </div>
      <div class="col-md-3">
        <MarketNews />
      </div>
      <div class="col-md-9">
        <HistoryOrder />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import MarketPairs from "../components/MarketPairs.vue";
import TradingChart from "../components/TradingChart.vue";
import TradingChartDark from "../components/TradingChartDark.vue";
import MarketTrade from "../components/MarketTrade.vue";
import OrderBook from "../components/OrderBook.vue";
import MarketHistory from "../components/MarketHistory.vue";
import MarketNews from "../components/MarketNews.vue";
import HistoryOrder from "../components/HistoryOrder.vue";
export default {
  components: {
    MarketPairs,
    TradingChart,
    TradingChartDark,
    MarketTrade,
    OrderBook,
    MarketHistory,
    MarketNews,
    HistoryOrder,
  },
};
</script>
