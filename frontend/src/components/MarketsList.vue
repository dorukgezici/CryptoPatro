<template>
  <div class="markets pb70">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="markets-pair-list">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
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
                  class="nav-link active"
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
                  id="kcs-id"
                  data-bs-toggle="tab"
                  data-bs-target="#kcs"
                  type="button"
                  role="tab"
                  aria-controls="kcs"
                  aria-selected="false"
                >
                  KCS
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
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="alts-id"
                  data-bs-toggle="tab"
                  data-bs-target="#alts"
                  type="button"
                  role="tab"
                  aria-controls="alts"
                  aria-selected="false"
                >
                  ALTS
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane fade"
                id="favorites"
                role="tabpanel"
                aria-labelledby="favorites-id"
              >
                <div class="table-responsive">
                  <table class="table star-active">
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
                        <td><img src="img/icon/1.png" alt="eth" /> ETH</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> EOS/BTC</td>
                        <td><img src="img/icon/2.png" alt="vid" /> EOS</td>
                        <td>6984.06</td>
                        <td class="red">-1.65%</td>
                        <td>6554.91</td>
                        <td>6548.06</td>
                        <td>431,684,298.45</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> LTC/BTC</td>
                        <td><img src="img/icon/3.png" alt="bitcoin" /> LTC</td>
                        <td>4582.06</td>
                        <td class="green">+2.62%</td>
                        <td>7444.91</td>
                        <td>4646.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> KCS/BTC</td>
                        <td><img src="img/icon/4.png" alt="bitcoin" /> KCS</td>
                        <td>7394.06</td>
                        <td class="red">-0.94%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> COTI/BTC</td>
                        <td><img src="img/icon/5.png" alt="bitcoin" /> COTI</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TRX/BTC</td>
                        <td><img src="img/icon/6.png" alt="bitcoin" /> TRX</td>
                        <td>7394.06</td>
                        <td class="green">+0.71%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XMR/BTC</td>
                        <td><img src="img/icon/7.png" alt="bitcoin" /> XMR</td>
                        <td>7394.06</td>
                        <td class="red">-0.73%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ADA/BTC</td>
                        <td><img src="img/icon/8.png" alt="bitcoin" /> ADA</td>
                        <td>7394.06</td>
                        <td class="red">-1.20%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> BNB/BTC</td>
                        <td><img src="img/icon/9.png" alt="bitcoin" /> BNB</td>
                        <td>7394.06</td>
                        <td class="green">+0.74%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> NEO/BTC</td>
                        <td><img src="img/icon/10.png" alt="bitcoin" /> NEO</td>
                        <td>7394.06</td>
                        <td class="red">-0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade show active"
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
                        <td><img src="img/icon/1.png" alt="eth" /> ETH</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> EOS/BTC</td>
                        <td><img src="img/icon/2.png" alt="vid" /> EOS</td>
                        <td>6984.06</td>
                        <td class="red">-1.65%</td>
                        <td>6554.91</td>
                        <td>6548.06</td>
                        <td>431,684,298.45</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> LTC/BTC</td>
                        <td><img src="img/icon/3.png" alt="bitcoin" /> LTC</td>
                        <td>4582.06</td>
                        <td class="green">+2.62%</td>
                        <td>7444.91</td>
                        <td>4646.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> KCS/BTC</td>
                        <td><img src="img/icon/4.png" alt="bitcoin" /> KCS</td>
                        <td>7394.06</td>
                        <td class="red">-0.94%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> COTI/BTC</td>
                        <td><img src="img/icon/5.png" alt="bitcoin" /> COTI</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TRX/BTC</td>
                        <td><img src="img/icon/6.png" alt="bitcoin" /> TRX</td>
                        <td>7394.06</td>
                        <td class="green">+0.71%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XMR/BTC</td>
                        <td><img src="img/icon/7.png" alt="bitcoin" /> XMR</td>
                        <td>7394.06</td>
                        <td class="red">-0.73%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ADA/BTC</td>
                        <td><img src="img/icon/8.png" alt="bitcoin" /> ADA</td>
                        <td>7394.06</td>
                        <td class="red">-1.20%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> BNB/BTC</td>
                        <td><img src="img/icon/9.png" alt="bitcoin" /> BNB</td>
                        <td>7394.06</td>
                        <td class="green">+0.74%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> NEO/BTC</td>
                        <td><img src="img/icon/10.png" alt="bitcoin" /> NEO</td>
                        <td>7394.06</td>
                        <td class="red">-0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TOMO/BTC</td>
                        <td>
                          <img src="img/icon/11.png" alt="bitcoin" /> TOMO
                        </td>
                        <td>7394.06</td>
                        <td class="red">-4.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MKR/BTC</td>
                        <td><img src="img/icon/12.png" alt="bitcoin" /> MKR</td>
                        <td>7394.06</td>
                        <td class="green">+0.32%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.14</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ZEC/BTC</td>
                        <td><img src="img/icon/13.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="green">+5.53%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.22</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> VSYS/BTC</td>
                        <td>
                          <img src="img/icon/14.png" alt="bitcoin" /> VSYS
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.52%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ATOM/BTC</td>
                        <td>
                          <img src="img/icon/15.png" alt="bitcoin" /> ATOM
                        </td>
                        <td>7394.06</td>
                        <td class="red">-2.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.21</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MTV/BTC</td>
                        <td><img src="img/icon/16.png" alt="bitcoin" /> MTV</td>
                        <td>7394.06</td>
                        <td class="green">+1.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.32</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> XTZ/BTC</td>
                        <td><img src="img/icon/17.png" alt="bitcoin" /> XTZ</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> CEL/BTC</td>
                        <td><img src="img/icon/19.png" alt="bitcoin" /> CEL</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> EGLD/BTC</td>
                        <td>
                          <img src="img/icon/20.png" alt="bitcoin" /> EGLD
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> ZEC/BTC</td>
                        <td><img src="img/icon/21.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> RUNE/BTC</td>
                        <td>
                          <img src="img/icon/22.png" alt="bitcoin" /> RUNE
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="kcs"
                role="tabpanel"
                aria-labelledby="kcs-id"
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
                        <td><i class="icon ion-md-star"></i> ETH/KCS</td>
                        <td><img src="img/icon/1.png" alt="eth" /> ETH</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> EOS/KCS</td>
                        <td><img src="img/icon/2.png" alt="vid" /> EOS</td>
                        <td>6984.06</td>
                        <td class="red">-1.65%</td>
                        <td>6554.91</td>
                        <td>6548.06</td>
                        <td>431,684,298.45</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> LTC/KCS</td>
                        <td><img src="img/icon/3.png" alt="bitcoin" /> LTC</td>
                        <td>4582.06</td>
                        <td class="green">+2.62%</td>
                        <td>7444.91</td>
                        <td>4646.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> KCS/KCS</td>
                        <td><img src="img/icon/4.png" alt="bitcoin" /> KCS</td>
                        <td>7394.06</td>
                        <td class="red">-0.94%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> COTI/KCS</td>
                        <td><img src="img/icon/5.png" alt="bitcoin" /> COTI</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TRX/KCS</td>
                        <td><img src="img/icon/6.png" alt="bitcoin" /> TRX</td>
                        <td>7394.06</td>
                        <td class="green">+0.71%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XMR/KCS</td>
                        <td><img src="img/icon/7.png" alt="bitcoin" /> XMR</td>
                        <td>7394.06</td>
                        <td class="red">-0.73%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ADA/KCS</td>
                        <td><img src="img/icon/8.png" alt="bitcoin" /> ADA</td>
                        <td>7394.06</td>
                        <td class="red">-1.20%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> BNB/KCS</td>
                        <td><img src="img/icon/9.png" alt="bitcoin" /> BNB</td>
                        <td>7394.06</td>
                        <td class="green">+0.74%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> NEO/KCS</td>
                        <td><img src="img/icon/10.png" alt="bitcoin" /> NEO</td>
                        <td>7394.06</td>
                        <td class="red">-0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TOMO/KCS</td>
                        <td>
                          <img src="img/icon/11.png" alt="bitcoin" /> TOMO
                        </td>
                        <td>7394.06</td>
                        <td class="red">-4.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MKR/KCS</td>
                        <td><img src="img/icon/12.png" alt="bitcoin" /> MKR</td>
                        <td>7394.06</td>
                        <td class="green">+0.32%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.14</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ZEC/KCS</td>
                        <td><img src="img/icon/13.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="green">+5.53%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.22</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> VSYS/KCS</td>
                        <td>
                          <img src="img/icon/14.png" alt="bitcoin" /> VSYS
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.52%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ATOM/KCS</td>
                        <td>
                          <img src="img/icon/15.png" alt="bitcoin" /> ATOM
                        </td>
                        <td>7394.06</td>
                        <td class="red">-2.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.21</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MTV/KCS</td>
                        <td><img src="img/icon/16.png" alt="bitcoin" /> MTV</td>
                        <td>7394.06</td>
                        <td class="green">+1.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.32</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XTZ/KCS</td>
                        <td><img src="img/icon/17.png" alt="bitcoin" /> XTZ</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> XTZ/KCS</td>
                        <td><img src="img/icon/17.png" alt="bitcoin" /> XTZ</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> CEL/KCS</td>
                        <td><img src="img/icon/19.png" alt="bitcoin" /> CEL</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> EGLD/KCS</td>
                        <td>
                          <img src="img/icon/20.png" alt="bitcoin" /> EGLD
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> ZEC/KCS</td>
                        <td><img src="img/icon/21.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> RUNE/KCS</td>
                        <td>
                          <img src="img/icon/22.png" alt="bitcoin" /> RUNE
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
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
                        <td><img src="img/icon/1.png" alt="eth" /> ETH</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> EOS/USDT</td>
                        <td><img src="img/icon/2.png" alt="vid" /> EOS</td>
                        <td>6984.06</td>
                        <td class="red">-1.65%</td>
                        <td>6554.91</td>
                        <td>6548.06</td>
                        <td>431,684,298.45</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> LTC/USDT</td>
                        <td><img src="img/icon/3.png" alt="bitcoin" /> LTC</td>
                        <td>4582.06</td>
                        <td class="green">+2.62%</td>
                        <td>7444.91</td>
                        <td>4646.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> USDT/USDT</td>
                        <td><img src="img/icon/4.png" alt="bitcoin" /> USDT</td>
                        <td>7394.06</td>
                        <td class="red">-0.94%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> COTI/USDT</td>
                        <td><img src="img/icon/5.png" alt="bitcoin" /> COTI</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TRX/USDT</td>
                        <td><img src="img/icon/6.png" alt="bitcoin" /> TRX</td>
                        <td>7394.06</td>
                        <td class="green">+0.71%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XMR/USDT</td>
                        <td><img src="img/icon/7.png" alt="bitcoin" /> XMR</td>
                        <td>7394.06</td>
                        <td class="red">-0.73%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ADA/USDT</td>
                        <td><img src="img/icon/8.png" alt="bitcoin" /> ADA</td>
                        <td>7394.06</td>
                        <td class="red">-1.20%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> BNB/USDT</td>
                        <td><img src="img/icon/9.png" alt="bitcoin" /> BNB</td>
                        <td>7394.06</td>
                        <td class="green">+0.74%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> NEO/USDT</td>
                        <td><img src="img/icon/10.png" alt="bitcoin" /> NEO</td>
                        <td>7394.06</td>
                        <td class="red">-0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TOMO/USDT</td>
                        <td>
                          <img src="img/icon/11.png" alt="bitcoin" /> TOMO
                        </td>
                        <td>7394.06</td>
                        <td class="red">-4.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MKR/USDT</td>
                        <td><img src="img/icon/12.png" alt="bitcoin" /> MKR</td>
                        <td>7394.06</td>
                        <td class="green">+0.32%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.14</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ZEC/USDT</td>
                        <td><img src="img/icon/13.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="green">+5.53%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.22</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> VSYS/USDT</td>
                        <td>
                          <img src="img/icon/14.png" alt="bitcoin" /> VSYS
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.52%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ATOM/USDT</td>
                        <td>
                          <img src="img/icon/15.png" alt="bitcoin" /> ATOM
                        </td>
                        <td>7394.06</td>
                        <td class="red">-2.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.21</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MTV/USDT</td>
                        <td><img src="img/icon/16.png" alt="bitcoin" /> MTV</td>
                        <td>7394.06</td>
                        <td class="green">+1.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.32</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XTZ/USDT</td>
                        <td><img src="img/icon/17.png" alt="bitcoin" /> XTZ</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> XTZ/USDT</td>
                        <td><img src="img/icon/17.png" alt="bitcoin" /> XTZ</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> CEL/USDT</td>
                        <td><img src="img/icon/19.png" alt="bitcoin" /> CEL</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> EGLD/USDT</td>
                        <td>
                          <img src="img/icon/20.png" alt="bitcoin" /> EGLD
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> ZEC/USDT</td>
                        <td><img src="img/icon/21.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> RUNE/USDT</td>
                        <td>
                          <img src="img/icon/22.png" alt="bitcoin" /> RUNE
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="alts"
                role="tabpanel"
                aria-labelledby="alts-id"
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
                        <td><i class="icon ion-md-star"></i> ETH/ALTS</td>
                        <td><img src="img/icon/1.png" alt="eth" /> ETH</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> EOS/ALTS</td>
                        <td><img src="img/icon/2.png" alt="vid" /> EOS</td>
                        <td>6984.06</td>
                        <td class="red">-1.65%</td>
                        <td>6554.91</td>
                        <td>6548.06</td>
                        <td>431,684,298.45</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> LTC/ALTS</td>
                        <td><img src="img/icon/3.png" alt="bitcoin" /> LTC</td>
                        <td>4582.06</td>
                        <td class="green">+2.62%</td>
                        <td>7444.91</td>
                        <td>4646.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ALTS/ALTS</td>
                        <td><img src="img/icon/4.png" alt="bitcoin" /> ALTS</td>
                        <td>7394.06</td>
                        <td class="red">-0.94%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> COTI/ALTS</td>
                        <td><img src="img/icon/5.png" alt="bitcoin" /> COTI</td>
                        <td>7394.06</td>
                        <td class="green">+0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TRX/ALTS</td>
                        <td><img src="img/icon/6.png" alt="bitcoin" /> TRX</td>
                        <td>7394.06</td>
                        <td class="green">+0.71%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.53</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XMR/ALTS</td>
                        <td><img src="img/icon/7.png" alt="bitcoin" /> XMR</td>
                        <td>7394.06</td>
                        <td class="red">-0.73%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ADA/ALTS</td>
                        <td><img src="img/icon/8.png" alt="bitcoin" /> ADA</td>
                        <td>7394.06</td>
                        <td class="red">-1.20%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> BNB/ALTS</td>
                        <td><img src="img/icon/9.png" alt="bitcoin" /> BNB</td>
                        <td>7394.06</td>
                        <td class="green">+0.74%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.23</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> NEO/ALTS</td>
                        <td><img src="img/icon/10.png" alt="bitcoin" /> NEO</td>
                        <td>7394.06</td>
                        <td class="red">-0.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.77</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> TOMO/ALTS</td>
                        <td>
                          <img src="img/icon/11.png" alt="bitcoin" /> TOMO
                        </td>
                        <td>7394.06</td>
                        <td class="red">-4.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.33</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MKR/ALTS</td>
                        <td><img src="img/icon/12.png" alt="bitcoin" /> MKR</td>
                        <td>7394.06</td>
                        <td class="green">+0.32%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.14</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ZEC/ALTS</td>
                        <td><img src="img/icon/13.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="green">+5.53%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.22</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> VSYS/ALTS</td>
                        <td>
                          <img src="img/icon/14.png" alt="bitcoin" /> VSYS
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.52%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.35</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> ATOM/ALTS</td>
                        <td>
                          <img src="img/icon/15.png" alt="bitcoin" /> ATOM
                        </td>
                        <td>7394.06</td>
                        <td class="red">-2.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.21</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> MTV/ALTS</td>
                        <td><img src="img/icon/16.png" alt="bitcoin" /> MTV</td>
                        <td>7394.06</td>
                        <td class="green">+1.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.32</td>
                      </tr>
                      <tr>
                        <td><i class="icon ion-md-star"></i> XTZ/ALTS</td>
                        <td><img src="img/icon/17.png" alt="bitcoin" /> XTZ</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> XTZ/ALTS</td>
                        <td><img src="img/icon/17.png" alt="bitcoin" /> XTZ</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> CEL/ALTS</td>
                        <td><img src="img/icon/19.png" alt="bitcoin" /> CEL</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> EGLD/ALTS</td>
                        <td>
                          <img src="img/icon/20.png" alt="bitcoin" /> EGLD
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> ZEC/ALTS</td>
                        <td><img src="img/icon/21.png" alt="bitcoin" /> ZEC</td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
                      </tr>
                      <tr class="more-market-data">
                        <td><i class="icon ion-md-star"></i> RUNE/ALTS</td>
                        <td>
                          <img src="img/icon/22.png" alt="bitcoin" /> RUNE
                        </td>
                        <td>7394.06</td>
                        <td class="red">-3.78%</td>
                        <td>7444.91</td>
                        <td>7267.06</td>
                        <td>431,687,258.25</td>
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
export default {
  methods: {
    loadMore: function () {
      let loadMore = document.querySelector(".load-more");
      let newData = document.getElementsByClassName("more-market-data");
      for (let i = 0; i < newData.length; i++) {
        newData[i].style.display = "table-row";
      }
      loadMore.style.display = "none";
    },
  },
};
</script>
