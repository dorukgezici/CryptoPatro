<template>
  <div class="market-trade">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          class="nav-link active"
          id="limit-tab"
          data-bs-toggle="tab"
          data-bs-target="#limit"
          type="button"
          role="tab"
          aria-controls="limit"
          aria-selected="true"
        >
          Limit
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="market-tab"
          data-bs-toggle="tab"
          data-bs-target="#market"
          type="button"
          role="tab"
          aria-controls="market"
          aria-selected="false"
        >
          Market
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="stop-limit-tab"
          data-bs-toggle="tab"
          data-bs-target="#stop-limit"
          type="button"
          role="tab"
          aria-controls="stop-limit"
          aria-selected="false"
        >
          Stop Limit
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="stop-market-tab"
          data-bs-toggle="tab"
          data-bs-target="#stop-market"
          type="button"
          role="tab"
          aria-controls="stop-market"
          aria-selected="false"
        >
          Stop Limit
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="limit"
        role="tabpanel"
        aria-labelledby="limit-tab"
      >
        <div class="d-flex justify-content-between">
          <div class="market-trade-buy">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button type="submit" class="btn buy">Buy</button>
            </form>
          </div>
          <div class="market-trade-sell">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button class="btn sell">Sell</button>
            </form>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="market"
        role="tabpanel"
        aria-labelledby="market-tab"
      >
        <div class="d-flex justify-content-between">
          <div class="market-trade-buy">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button type="submit" class="btn buy">Buy</button>
            </form>
          </div>
          <div class="market-trade-sell">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button class="btn sell">Sell</button>
            </form>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="stop-limit"
        role="tabpanel"
        aria-labelledby="stop-limit-tab"
      >
        <div class="d-flex justify-content-between">
          <div class="market-trade-buy">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button type="submit" class="btn buy">Buy</button>
            </form>
          </div>
          <div class="market-trade-sell">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button class="btn sell">Sell</button>
            </form>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="stop-market"
        role="tabpanel"
        aria-labelledby="stop-market-tab"
      >
        <div class="d-flex justify-content-between">
          <div class="market-trade-buy">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button type="submit" class="btn buy">Buy</button>
            </form>
          </div>
          <div class="market-trade-sell">
            <form @submit.stop.prevent="submit">
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Price"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">BTC</span>
                </div>
              </div>
              <div class="input-group">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Amount"
                  required
                />
                <div class="input-group-append">
                  <span class="input-group-text">ETH</span>
                </div>
              </div>
              <ul class="market-trade-list">
                <li>
                  <a href="#!">25%</a>
                </li>
                <li>
                  <a href="#!">50%</a>
                </li>
                <li>
                  <a href="#!">75%</a>
                </li>
                <li>
                  <a href="#!">100%</a>
                </li>
              </ul>
              <p>Available: <span>0 BTC = 0 USD</span></p>
              <p>Volume: <span>0 BTC = 0 USD</span></p>
              <p>Margin: <span>0 BTC = 0 USD</span></p>
              <p>Fee: <span>0 BTC = 0 USD</span></p>
              <button class="btn sell">Sell</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$router.push("wallet");
    },
  },
};
</script>
