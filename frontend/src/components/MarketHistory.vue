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
              <th>Price(BTC)</th>
              <th>Amount(ETH)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>13:03:53</td>
              <td class="red">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="red">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="red">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="red">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="red">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="green">0.020191</td>
              <td>0.2155045</td>
            </tr>
            <tr>
              <td>13:03:53</td>
              <td class="red">0.020191</td>
              <td>0.2155045</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
