<template>
  <div class="main-chart mb15">
    <VueTradingView
        :options="{
          symbol: `BINANCE:${symbol}`,
          theme: theme,
          width: '100%',
          height: '550px',
          allow_symbol_change: true,
        }"
    />
  </div>
</template>

<script>
import VueTradingView from "vue-trading-view/src/vue-trading-view.vue"

export default {
  props: ['symbol', 'theme'],
  components: {
    VueTradingView,
  },
}
</script>
