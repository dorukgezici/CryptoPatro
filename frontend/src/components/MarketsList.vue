<template>
  <div class="markets pb70">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="markets-pair-list">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                    class="nav-link active"
                    id="favorites-id"
                    data-bs-toggle="tab"
                    data-bs-target="#favorites"
                    type="button"
                    role="tab"
                    aria-controls="favorites"
                    aria-selected="true"
                >
                  ★ Favorites
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    id="btc-id"
                    data-bs-toggle="tab"
                    data-bs-target="#btc"
                    type="button"
                    role="tab"
                    aria-controls="btc"
                    aria-selected="false"
                >
                  BTC
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                    class="nav-link"
                    id="usdt-id"
                    data-bs-toggle="tab"
                    data-bs-target="#usdt"
                    type="button"
                    role="tab"
                    aria-controls="usdt"
                    aria-selected="false"
                >
                  USDT
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                  class="tab-pane fade show active"
                  id="favorites"
                  role="tabpanel"
                  aria-labelledby="favorites-id"
              >
                <div class="table-responsive">
                  <table class="table star-active">
                    <thead>
                    <tr>
                      <th>Ticker</th>
                      <th>Last Price ($)</th>
                      <th>Change (24H)</th>
                      <th>High (24H)</th>
                      <th>Low (24h)</th>
                      <th>Volume (24h)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="asset in assets" :key="asset">
                      <td>
                        <i class="icon ion-md-star"></i>
                        <img :src="`https://cryptoicon-api.vercel.app/api/icon/${asset.ticker.toLowerCase()}`"
                             :alt="asset.ticker">
                        {{ asset.name }}
                        ({{ asset.ticker }})
                      </td>
                      <td>{{ Number(asset.priceChange.lastPrice).toLocaleString() }}</td>
                      <td :class="{green: Number(asset.priceChange.priceChange) > 0, red: Number(asset.priceChange.priceChange) < 0}">
                        {{ Number(asset.priceChange.priceChangePercent).toLocaleString() }}%
                      </td>
                      <td>{{ Number(asset.priceChange.highPrice).toLocaleString() }}</td>
                      <td>{{ Number(asset.priceChange.lowPrice).toLocaleString() }}</td>
                      <td>{{ Number(asset.priceChange.volume).toLocaleString() }}</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                  class="tab-pane fade"
                  id="btc"
                  role="tabpanel"
                  aria-labelledby="btc-id"
              >
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>Pairs</th>
                      <th>Coin</th>
                      <th>Last Price</th>
                      <th>Change (24H)</th>
                      <th>High (24H)</th>
                      <th>Low (24h)</th>
                      <th>Volume (24h)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><i class="icon ion-md-star"></i> ETH/BTC</td>
                      <td><img src="img/icon/1.png" alt="eth"/> ETH</td>
                      <td>7394.06</td>
                      <td class="green">+0.78%</td>
                      <td>7444.91</td>
                      <td>7267.06</td>
                      <td>431,687,258.77</td>
                    </tr>
                    <tr>
                      <td><i class="icon ion-md-star"></i> EOS/BTC</td>
                      <td><img src="img/icon/2.png" alt="vid"/> EOS</td>
                      <td>6984.06</td>
                      <td class="red">-1.65%</td>
                      <td>6554.91</td>
                      <td>6548.06</td>
                      <td>431,684,298.45</td>
                    </tr>
                    <tr>
                      <td><i class="icon ion-md-star"></i> LTC/BTC</td>
                      <td><img src="img/icon/3.png" alt="bitcoin"/> LTC</td>
                      <td>4582.06</td>
                      <td class="green">+2.62%</td>
                      <td>7444.91</td>
                      <td>4646.06</td>
                      <td>431,687,258.23</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                  class="tab-pane fade"
                  id="usdt"
                  role="tabpanel"
                  aria-labelledby="usdt-id"
              >
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                    <tr>
                      <th>Pairs</th>
                      <th>Coin</th>
                      <th>Last Price</th>
                      <th>Change (24H)</th>
                      <th>High (24H)</th>
                      <th>Low (24h)</th>
                      <th>Volume (24h)</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td><i class="icon ion-md-star"></i> ETH/USDT</td>
                      <td><img src="img/icon/1.png" alt="eth"/> ETH</td>
                      <td>7394.06</td>
                      <td class="green">+0.78%</td>
                      <td>7444.91</td>
                      <td>7267.06</td>
                      <td>431,687,258.77</td>
                    </tr>
                    <tr>
                      <td><i class="icon ion-md-star"></i> EOS/USDT</td>
                      <td><img src="img/icon/2.png" alt="vid"/> EOS</td>
                      <td>6984.06</td>
                      <td class="red">-1.65%</td>
                      <td>6554.91</td>
                      <td>6548.06</td>
                      <td>431,684,298.45</td>
                    </tr>
                    <tr>
                      <td><i class="icon ion-md-star"></i> LTC/USDT</td>
                      <td><img src="img/icon/3.png" alt="bitcoin"/> LTC</td>
                      <td>4582.06</td>
                      <td class="green">+2.62%</td>
                      <td>7444.91</td>
                      <td>4646.06</td>
                      <td>431,687,258.23</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="text-center">
              <a href="#!" class="load-more btn" @click="loadMore">
                Load More <i class="icon ion-md-arrow-down"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  mounted() {
    this.$store.dispatch("exchange/getAssets").then(() => {
      // for (let asset in this.assets) {
      //
      // }
    })
  },
  computed: {
    ...mapState('exchange', [
      'assets',
    ]),
  },
  methods: {
    loadMore() {
      let loadMore = document.querySelector(".load-more")
      let newData = document.getElementsByClassName("more-market-data")
      for (let i = 0; i < newData.length; i++) {
        newData[i].style.display = "table-row"
      }
      loadMore.style.display = "none"
    },
  },
}
</script>
