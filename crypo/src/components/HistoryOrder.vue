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
          id="closed-orders-tab"
          data-bs-toggle="tab"
          data-bs-target="#closed-orders"
          type="button"
          role="tab"
          aria-controls="closed-orders"
          aria-selected="false"
        >
          Closed Orders
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
          Order History
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          class="nav-link"
          id="balance-tab"
          data-bs-toggle="tab"
          data-bs-target="#balance"
          type="button"
          role="tab"
          aria-controls="balance"
          aria-selected="false"
        >
          Balance
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
          <i class="icon ion-md-document"></i>
          No data
        </span>
      </div>
      <div
        class="tab-pane fade"
        id="closed-orders"
        role="tabpanel"
        aria-labelledby="closed-orders-tab"
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
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-checkmark-circle-outline green"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-close-circle-outline red"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-checkmark-circle-outline green"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="red">SELL</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-close-circle-outline red"></i>
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
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
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-checkmark-circle-outline green"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-close-circle-outline red"></i>
                </td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="balance"
        role="tabpanel"
        aria-labelledby="balance-tab"
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
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-checkmark-circle-outline green"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-close-circle-outline red"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="green">BUY</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-checkmark-circle-outline green"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="red">SELL</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-close-circle-outline red"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="red">SELL</td>
                <td>$444</td>
                <td>41</td>
                <td>
                  <i class="icon ion-md-close-circle-outline red"></i>
                </td>
                <td>-</td>
              </tr>
              <tr>
                <td>2:40 PM</td>
                <td>ETH/BTC</td>
                <td class="red">SELL</td>
                <td>$444</td>
                <td>41</td>
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
