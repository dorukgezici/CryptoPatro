<template>
  <div class="order-book mb15">
    <h2 class="heading">Order Book</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Price (USDT)</th>
          <th>Amount (BTC)</th>
        </tr>
      </thead>
      <tbody>
        <tr class="red-bg-80" v-for="ask in orderBook.asks" :key="ask">
          <td class="red">{{ ask[0] }}</td>
          <td>{{ ask[1] }}</td>
        </tr>
      </tbody>
<!--      <tbody class="ob-heading">-->
<!--        <tr>-->
<!--          <td>-->
<!--            <span>Last Price</span>-->
<!--            0.020367-->
<!--          </td>-->
<!--          <td>-->
<!--            <span>USD</span>-->
<!--            148.65-->
<!--          </td>-->
<!--          <td class="red">-->
<!--            <span>Change</span>-->
<!--            -0.51%-->
<!--          </td>-->
<!--        </tr>-->
<!--      </tbody>-->
      <tbody>
        <tr class="green-bg" v-for="bid in orderBook.bids" :key="bid">
          <td class="green">{{ bid[0] }}</td>
          <td>{{ bid[1] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("getOrderBook");
  },
  computed: {
    orderBook() {
      return this.$store.getters.orderBook;
    },
  },
};
</script>
