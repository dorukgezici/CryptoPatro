<template>
  <div class="market-pairs">
    <div class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">
          <i class="icon ion-md-search"></i>
        </span>
      </div>
      <input
          type="text"
          class="form-control"
          placeholder="Search"
          aria-describedby="inputGroup-sizing-sm"
      />
    </div>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation" v-for="tab in tabs" :key="tab">
        <button
            class="nav-link"
            :class="{ active: tab.isActive }"
            :id="`${tab.name}-id`"
            data-bs-toggle="tab"
            :data-bs-target="`#${tab.name}`"
            type="button"
            role="tab"
            :aria-controls="tab.name"
            :aria-selected="{ true: tab.isActive }"
        >
          <span v-if="tab.name === 'favorites'">*</span>
          <span v-else>{{ tab.name.toUpperCase() }}</span>
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
          v-for="tab in tabs"
          :key="tab"
          class="tab-pane fade"
          :class="{show: tab.isActive, active: tab.isActive}"
          :id="tab.name"
          role="tabpanel"
          :aria-labelledby="`${tab.name}-id`"
      >
        <table class="table">
          <thead>
          <tr>
            <th>Pairs</th>
            <th>Last Price</th>
            <th>Change</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="pair in tab.pairs" :key="pair">
            <td><i class="icon ion-md-star"></i> {{ pair }}</td>
            <td>PRICE</td>
            <td class="red">-2.58%</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from 'vuex'

export default {
  mounted() {
    this.$store.dispatch("auth/getMe")
  },
  data() {
    return {
      tabs: [
        {name: 'favorites', isActive: true, pairs: ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'SOL/USDT']},
        {name: 'usdt', isActive: false, pairs: ['BTC/USDT', 'ETH/USDT']},
        {name: 'btc', isActive: false, pairs: ['ETH/BTC']},
      ],
    }
  },
  computed: {
    ...mapState([
      'auth/me',
    ]),
    ...mapGetters([
      'auth/me',
    ]),
  },
}
</script>
