<template>
  <div class="main-chart mb15">
    <VueTradingView
      :options="{
        symbol: 'BINANCE:BTCUSDT',
        theme: 'light',
        width: '100%',
        height: '550px',
        allow_symbol_change: true,
      }"
    />
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view/src/vue-trading-view.vue";

export default {
  components: {
    VueTradingView,
  },
};
</script>
