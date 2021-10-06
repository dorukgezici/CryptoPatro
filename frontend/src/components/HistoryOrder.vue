<template>
  <div class="market-history market-order markets-pair-list mt15">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
            class="nav-link active"
            id="open-orders-tab"
            data-bs-toggle="tab"
            data-bs-target="#open-orders"
            type="button"
            role="tab"
            aria-controls="open-orders"
            aria-selected="true"
        >
          Open Orders
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
            class="nav-link"
            id="order-history-tab"
            data-bs-toggle="tab"
            data-bs-target="#order-history"
            type="button"
            role="tab"
            aria-controls="order-history"
            aria-selected="false"
        >
          Order History ({{ $store.state.exchange.symbol }})
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
          class="tab-pane fade show active"
          id="open-orders"
          role="tabpanel"
          aria-labelledby="open-orders-tab"
      >
        <template v-if="openOrderList">
          <div class="table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th>Time</th>
                <th>Pair</th>
                <th>Buy/Sell</th>
                <th>Price</th>
                <th>Amount</th>
                <th>Executed</th>
                <th>Unexecuted</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="openOrder in openOrderList" :key="openOrder">
                <td>{{ $filters.getHumanDate(openOrder.time) }}</td>
                <td>{{ openOrder.symbol }}</td>
                <td v-if="openOrder.side === 'BUY'" class="green">BUY</td>
                <td v-else-if="openOrder.side === 'SELL'" class="red">SELL</td>
                <td>{{ openOrder.price }}</td>
                <td>{{ openOrder.origQty }}</td>
                <td>
                  <i class="icon ion-md-checkmark-circle-outline green"></i>
                </td>
                <td>-</td>
              </tr>
              </tbody>
            </table>
          </div>
        </template>
        <template v-else>
          <ul class="d-flex justify-content-between market-order-item">
            <li>Time</li>
            <li>All pairs</li>
            <li>Buy/Sell</li>
            <li>Price</li>
            <li>Amount</li>
            <li>Executed</li>
            <li>Unexecuted</li>
          </ul>
          <span class="no-data">
              <i class="icon ion-md-document"></i>No data
          </span>
        </template>
      </div>
      <div
          class="tab-pane fade"
          id="order-history"
          role="tabpanel"
          aria-labelledby="order-history-tab"
      >
        <div class="table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th>Time</th>
              <th>All pairs</th>
              <th>Buy/Sell</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Executed</th>
              <th>Unexecuted</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in allOrderList" :key="order">
              <td>{{ $filters.getHumanDate(order.time) }}</td>
              <td>{{ order.symbol }}</td>
              <td v-if="order.side === 'BUY'" class="green">BUY</td>
              <td v-else-if="order.side === 'SELL'" class="red">SELL</td>
              <td>{{ order.price }}</td>
              <td>{{ order.origQty }}</td>
              <td>
                <i class="icon ion-md-checkmark-circle-outline green"></i>
              </td>
              <td>-</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  mounted() {
    this.$store.dispatch('exchange/getOpenOrderList')
    this.$store.dispatch('exchange/getAllOrderList')
  },
  computed: {
    ...mapState('exchange', [
      'openOrderList',
      'allOrderList',
    ]),
  },
}
</script>
