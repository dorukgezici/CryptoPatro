<template>
  <div class="market-history">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="recent-trades-tab"
          data-bs-toggle="tab"
          data-bs-target="#recent-trades"
          type="button"
          role="tab"
          aria-controls="recent-trades"
          aria-selected="true"
        >
          Recent Trades
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="recent-trades"
        role="tabpanel"
        aria-labelledby="recent-trades-tab"
      >
        <table class="table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Price (USDT)</th>
              <th>Amount (BTC)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trade in recentTrades" :key="trade">
              <td>13:03:53</td>
              <td :class="{red: trade.isBuyerMaker, green: !trade.isBuyerMaker}">{{ trade.price }}</td>
              <td>{{ trade.qty }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getRecentTrades");
  },
  computed: {
    recentTrades() {
      return this.$store.getters.recentTrades;
    },
  },
};
</script>
