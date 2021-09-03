<template>
  <div class="settings mtb15">
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-3">
          <ul
            class="nav nav-tabs nav-pills settings-nav"
            id="myTab"
            role="tablist"
          >
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="Profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#Profile"
                type="button"
                role="tab"
                aria-controls="Profile"
                aria-selected="true"
              >
                Profile
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="Wallet-tab"
                data-bs-toggle="tab"
                data-bs-target="#Wallet"
                type="button"
                role="tab"
                aria-controls="Wallet"
                aria-selected="false"
              >
                Wallet
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="Settings-tab"
                data-bs-toggle="tab"
                data-bs-target="#Settings"
                type="button"
                role="tab"
                aria-controls="Settings"
                aria-selected="false"
              >
                Settings
              </button>
            </li>
          </ul>
        </div>
        <div class="col-lg-9">
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade"
              id="Profile"
              role="tabpanel"
              aria-labelledby="Profile-tab"
            >
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">General Information</h5>
                  <div class="settings-profile">
                    <form>
                      <img src="img/avatar.svg" alt="avatar" />
                      <div class="custom-file">
                        <input type="file" class="form-control" />
                      </div>

                      <div class="row mt-4">
                        <div class="col-md-6">
                          <label htmlFor="formFirst">First name</label>
                          <input
                            id="formFirst"
                            type="text"
                            class="form-control"
                            placeholder="First name"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="formLast">Last name</label>
                          <input
                            id="formLast"
                            type="text"
                            class="form-control"
                            placeholder="Last name"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="emailAddress">Email</label>
                          <input
                            id="emailAddress"
                            type="text"
                            class="form-control"
                            placeholder="Enter your email"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="phoneNumber">Phone</label>
                          <input
                            id="phoneNumber"
                            type="text"
                            class="form-control"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="selectLanguage">Language</label>
                          <select id="selectLanguage" class="form-select">
                            <option defaultValue>English</option>
                            <option>Mandarin Chinese</option>
                            <option>Spanish</option>
                            <option>Arabic</option>
                            <option>Russian</option>
                          </select>
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="selectCurrency">Currency</label>
                          <select id="selectCurrency" class="form-select">
                            <option defaultValue>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                            <option>CHF</option>
                          </select>
                        </div>
                        <div class="col-md-12">
                          <input type="submit" value="Update" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Security Information</h5>
                  <div class="settings-profile">
                    <form>
                      <div class="row">
                        <div class="col-md-6">
                          <label htmlFor="currentPass">
                            Current password
                          </label>
                          <input
                            id="currentPass"
                            type="text"
                            class="form-control"
                            placeholder="Enter your password"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="newPass">New password</label>
                          <input
                            id="newPass"
                            type="text"
                            class="form-control"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="securityOne">
                            Security questions #1
                          </label>
                          <select id="securityOne" class="form-select">
                            <option defaultValue>
                              What was the name of your first pet?
                            </option>
                            <option>What's your Mother's middle name?</option>
                            <option>
                              What was the name of your first school?
                            </option>
                            <option>
                              Where did you travel for the first time?
                            </option>
                          </select>
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="securityAnsOne">Answer</label>
                          <input
                            id="securityAnsOne"
                            type="text"
                            class="form-control"
                            placeholder="Enter your answer"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="securityTwo">
                            Security questions #2
                          </label>
                          <select id="securityTwo" class="form-select">
                            <option defaultValue>Choose...</option>
                            <option>
                              What was the name of your first pet?
                            </option>
                            <option>What's your Mother's middle name?</option>
                            <option>
                              What was the name of your first school?
                            </option>
                            <option>
                              Where did you travel for the first time?
                            </option>
                          </select>
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="securityAnsTwo">Answer</label>
                          <input
                            id="securityAnsTwo"
                            type="text"
                            class="form-control"
                            placeholder="Enter your answer"
                          />
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="securityThree">
                            Security questions #3
                          </label>
                          <select id="securityThree" class="form-select">
                            <option defaultValue>Choose...</option>
                            <option>
                              What was the name of your first pet?
                            </option>
                            <option>What's your Mother's middle name?</option>
                            <option>
                              What was the name of your first school?
                            </option>
                            <option>
                              Where did you travel for the first time?
                            </option>
                          </select>
                        </div>
                        <div class="col-md-6">
                          <label htmlFor="securityFore">Answer</label>
                          <input
                            id="securityFore"
                            type="text"
                            class="form-control"
                            placeholder="Enter your answer"
                          />
                        </div>
                        <div class="col-md-12">
                          <input type="submit" value="Update" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade show active"
              id="Wallet"
              role="tabpanel"
              aria-labelledby="Wallet-tab"
            >
              <div class="wallet">
                <div class="row">
                  <div class="col-lg-4">
                    <ul class="settings-nav nav nav-pills nav-tabs">
                      <li class="nav-item">
                        <a
                          href="#"
                          class="
                            nav-link
                            d-flex
                            justify-content-between
                            align-items-center
                            active
                          "
                          data-bs-toggle="tab"
                          data-bs-target="#coinBTC"
                          type="button"
                          role="tab"
                          aria-controls="coinBTC"
                          aria-selected="true"
                        >
                          <div class="d-flex">
                            <img src="img/icon/18.png" alt="btc" />
                            <div>
                              <h2>BTC</h2>
                              <p>Bitcoin</p>
                            </div>
                          </div>
                          <div>
                            <h3>4.5484254</h3>
                            <p class="text-end">
                              <i class="icon ion-md-lock"></i> 0.0000000
                            </p>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          href="#"
                          class="
                            nav-link
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          data-bs-toggle="tab"
                          data-bs-target="#coinETH"
                          type="button"
                          role="tab"
                          aria-controls="coinETH"
                          aria-selected="true"
                        >
                          <div class="d-flex">
                            <img src="img/icon/1.png" alt="btc" />
                            <div>
                              <h2>ETH</h2>
                              <p>Ethereum</p>
                            </div>
                          </div>
                          <div>
                            <h3>13.454845</h3>
                            <p class="text-end">
                              <i class="icon ion-md-lock"></i> 0.0000000
                            </p>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          href="#"
                          class="
                            nav-link
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          data-bs-toggle="tab"
                          data-bs-target="#coinBNB"
                          type="button"
                          role="tab"
                          aria-controls="coinBNB"
                          aria-selected="true"
                        >
                          <div class="d-flex">
                            <img src="img/icon/9.png" alt="btc" />
                            <div>
                              <h2>BNB</h2>
                              <p>Binance</p>
                            </div>
                          </div>
                          <div>
                            <h3>35.48428</h3>
                            <p class="text-end">
                              <i class="icon ion-md-lock"></i> 0.0000000
                            </p>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          href="#"
                          class="
                            nav-link
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          data-bs-toggle="tab"
                          data-bs-target="#coinTRX"
                          type="button"
                          role="tab"
                          aria-controls="coinTRX"
                          aria-selected="true"
                        >
                          <div class="d-flex">
                            <img src="img/icon/6.png" alt="btc" />
                            <div>
                              <h2>TRX</h2>
                              <p>Tron</p>
                            </div>
                          </div>
                          <div>
                            <h3>4.458941</h3>
                            <p class="text-end">
                              <i class="icon ion-md-lock"></i> 0.0000000
                            </p>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          href="#"
                          class="
                            nav-link
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          data-bs-toggle="tab"
                          data-bs-target="#coinEOS"
                          type="button"
                          role="tab"
                          aria-controls="coinEOS"
                          aria-selected="true"
                        >
                          <div class="d-flex">
                            <img src="img/icon/2.png" alt="btc" />
                            <div>
                              <h2>EOS</h2>
                              <p>Eosio</p>
                            </div>
                          </div>
                          <div>
                            <h3>33.478951</h3>
                            <p class="text-end">
                              <i class="icon ion-md-lock"></i> 0.0000000
                            </p>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          href="#"
                          class="
                            nav-link
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          data-bs-toggle="tab"
                          data-bs-target="#coinXMR"
                          type="button"
                          role="tab"
                          aria-controls="coinXMR"
                          aria-selected="true"
                        >
                          <div class="d-flex">
                            <img src="img/icon/7.png" alt="btc" />
                            <div>
                              <h2>XMR</h2>
                              <p>Monero</p>
                            </div>
                          </div>
                          <div>
                            <h3>99.465975</h3>
                            <p class="text-end">
                              <i class="icon ion-md-lock"></i> 0.0000000
                            </p>
                          </div>
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          href="#"
                          class="
                            nav-link
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          data-bs-toggle="tab"
                          data-bs-target="#coinKCS"
                          type="button"
                          role="tab"
                          aria-controls="coinKCS"
                          aria-selected="true"
                        >
                          <div class="d-flex">
                            <img src="img/icon/4.png" alt="btc" />
                            <div>
                              <h2>KCS</h2>
                              <p>Kstarcoin</p>
                            </div>
                          </div>
                          <div>
                            <h3>114.57564</h3>
                            <p class="text-end">
                              <i class="icon ion-md-lock"></i> 0.0000000
                            </p>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="col-lg-8">
                    <div class="tab-content">
                      <div
                        class="tab-pane fade show active"
                        id="coinBTC"
                        role="tabpanel"
                      >
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Balances</h5>
                            <ul>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-cash"></i>
                                  <h2>Total Equity</h2>
                                </div>
                                <div>
                                  <h3>5.5894 BTC</h3>
                                </div>
                              </li>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-checkmark"></i>
                                  <h2>Available Margin</h2>
                                </div>
                                <div>
                                  <h3>2.480 BTC</h3>
                                </div>
                              </li>
                            </ul>
                            <button class="btn green">Deposit</button>
                            <button class="btn red">Withdraw</button>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Wallet Deposit Address</h5>
                            <div class="row wallet-address">
                              <div class="col-md-8">
                                <p>
                                  Deposits to this address are unlimited. Note
                                  that you may not be able to withdraw all of
                                  your funds at once if you deposit more than
                                  your daily withdrawal limit.
                                </p>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                  />
                                  <div class="input-group-prepend">
                                    <button class="btn btn-primary">
                                      COPY
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <img
                                  v-if="$store.state.theme"
                                  src="img/qr-code-dark.svg"
                                  alt="qr-code"
                                />
                                <img
                                  v-else
                                  src="img/qr-code-light.svg"
                                  alt="qr-code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Latest Transactions</h5>
                            <div class="wallet-history">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>25-04-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>4.5454334</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>25-05-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>0.5484468</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-06-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>25-07-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>1.45894147</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-08-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="coinETH" role="tabpanel">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Balances</h5>
                            <ul>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-cash"></i>
                                  <h2>Total Equity</h2>
                                </div>
                                <div>
                                  <h3>4.1542 ETH</h3>
                                </div>
                              </li>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-checkmark"></i>
                                  <h2>Available Margin</h2>
                                </div>
                                <div>
                                  <h3>1.334 ETH</h3>
                                </div>
                              </li>
                            </ul>
                            <button class="btn green">Deposit</button>
                            <button class="btn red">Withdraw</button>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Wallet Deposit Address</h5>
                            <div class="row wallet-address">
                              <div class="col-md-8">
                                <p>
                                  Deposits to this address are unlimited. Note
                                  that you may not be able to withdraw all of
                                  your funds at once if you deposit more than
                                  your daily withdrawal limit.
                                </p>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                  />
                                  <div class="input-group-prepend">
                                    <button class="btn btn-primary">
                                      COPY
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <img
                                  v-if="$store.state.theme"
                                  src="img/qr-code-dark.svg"
                                  alt="qr-code"
                                />
                                <img
                                  v-else
                                  src="img/qr-code-light.svg"
                                  alt="qr-code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Latest Transactions</h5>
                            <div class="wallet-history">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>25-04-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>4.5454334</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>25-05-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>0.5484468</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-06-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>25-07-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>1.45894147</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-08-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="coinBNB" role="tabpanel">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Balances</h5>
                            <ul>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-cash"></i>
                                  <h2>Total Equity</h2>
                                </div>
                                <div>
                                  <h3>7.342 BNB</h3>
                                </div>
                              </li>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-checkmark"></i>
                                  <h2>Available Margin</h2>
                                </div>
                                <div>
                                  <h3>0.332 BNB</h3>
                                </div>
                              </li>
                            </ul>
                            <button class="btn green">Deposit</button>
                            <button class="btn red">Withdraw</button>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Wallet Deposit Address</h5>
                            <div class="row wallet-address">
                              <div class="col-md-8">
                                <p>
                                  Deposits to this address are unlimited. Note
                                  that you may not be able to withdraw all of
                                  your funds at once if you deposit more than
                                  your daily withdrawal limit.
                                </p>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                  />
                                  <div class="input-group-prepend">
                                    <button class="btn btn-primary">
                                      COPY
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <img
                                  v-if="$store.state.theme"
                                  src="img/qr-code-dark.svg"
                                  alt="qr-code"
                                />
                                <img
                                  v-else
                                  src="img/qr-code-light.svg"
                                  alt="qr-code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Latest Transactions</h5>
                            <div class="wallet-history">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>25-04-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>4.5454334</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>25-05-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>0.5484468</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-06-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>25-07-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>1.45894147</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-08-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="coinTRX" role="tabpanel">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Balances</h5>
                            <ul>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-cash"></i>
                                  <h2>Total Equity</h2>
                                </div>
                                <div>
                                  <h3>4.3344 TRX</h3>
                                </div>
                              </li>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-checkmark"></i>
                                  <h2>Available Margin</h2>
                                </div>
                                <div>
                                  <h3>1.453 TRX</h3>
                                </div>
                              </li>
                            </ul>
                            <button class="btn green">Deposit</button>
                            <button class="btn red">Withdraw</button>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Wallet Deposit Address</h5>
                            <div class="row wallet-address">
                              <div class="col-md-8">
                                <p>
                                  Deposits to this address are unlimited. Note
                                  that you may not be able to withdraw all of
                                  your funds at once if you deposit more than
                                  your daily withdrawal limit.
                                </p>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                  />
                                  <div class="input-group-prepend">
                                    <button class="btn btn-primary">
                                      COPY
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <img
                                  v-if="$store.state.theme"
                                  src="img/qr-code-dark.svg"
                                  alt="qr-code"
                                />
                                <img
                                  v-else
                                  src="img/qr-code-light.svg"
                                  alt="qr-code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Latest Transactions</h5>
                            <div class="wallet-history">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>25-04-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>4.5454334</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>25-05-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>0.5484468</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-06-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>25-07-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>1.45894147</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-08-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="coinEOS" role="tabpanel">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Balances</h5>
                            <ul>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-cash"></i>
                                  <h2>Total Equity</h2>
                                </div>
                                <div>
                                  <h3>33.35 EOS</h3>
                                </div>
                              </li>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-checkmark"></i>
                                  <h2>Available Margin</h2>
                                </div>
                                <div>
                                  <h3>4.445 EOS</h3>
                                </div>
                              </li>
                            </ul>
                            <button class="btn green">Deposit</button>
                            <button class="btn red">Withdraw</button>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Wallet Deposit Address</h5>
                            <div class="row wallet-address">
                              <div class="col-md-8">
                                <p>
                                  Deposits to this address are unlimited. Note
                                  that you may not be able to withdraw all of
                                  your funds at once if you deposit more than
                                  your daily withdrawal limit.
                                </p>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                  />
                                  <div class="input-group-prepend">
                                    <button class="btn btn-primary">
                                      COPY
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <img
                                  v-if="$store.state.theme"
                                  src="img/qr-code-dark.svg"
                                  alt="qr-code"
                                />
                                <img
                                  v-else
                                  src="img/qr-code-light.svg"
                                  alt="qr-code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Latest Transactions</h5>
                            <div class="wallet-history">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>25-04-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>4.5454334</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>25-05-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>0.5484468</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-06-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>25-07-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>1.45894147</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-08-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="coinXMR" role="tabpanel">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Balances</h5>
                            <ul>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-cash"></i>
                                  <h2>Total Equity</h2>
                                </div>
                                <div>
                                  <h3>34.333 XMR</h3>
                                </div>
                              </li>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-checkmark"></i>
                                  <h2>Available Margin</h2>
                                </div>
                                <div>
                                  <h3>2.354 XMR</h3>
                                </div>
                              </li>
                            </ul>
                            <button class="btn green">Deposit</button>
                            <button class="btn red">Withdraw</button>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Wallet Deposit Address</h5>
                            <div class="row wallet-address">
                              <div class="col-md-8">
                                <p>
                                  Deposits to this address are unlimited. Note
                                  that you may not be able to withdraw all of
                                  your funds at once if you deposit more than
                                  your daily withdrawal limit.
                                </p>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                  />
                                  <div class="input-group-prepend">
                                    <button class="btn btn-primary">
                                      COPY
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <img
                                  v-if="$store.state.theme"
                                  src="img/qr-code-dark.svg"
                                  alt="qr-code"
                                />
                                <img
                                  v-else
                                  src="img/qr-code-light.svg"
                                  alt="qr-code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Latest Transactions</h5>
                            <div class="wallet-history">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>25-04-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>4.5454334</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>25-05-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>0.5484468</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-06-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>25-07-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>1.45894147</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-08-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="tab-pane fade" id="coinKCS" role="tabpanel">
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Balances</h5>
                            <ul>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-cash"></i>
                                  <h2>Total Equity</h2>
                                </div>
                                <div>
                                  <h3>86.577 KCS</h3>
                                </div>
                              </li>
                              <li
                                class="
                                  d-flex
                                  justify-content-between
                                  align-items-center
                                "
                              >
                                <div class="d-flex align-items-center">
                                  <i class="icon ion-md-checkmark"></i>
                                  <h2>Available Margin</h2>
                                </div>
                                <div>
                                  <h3>5.78 KCS</h3>
                                </div>
                              </li>
                            </ul>
                            <button class="btn green">Deposit</button>
                            <button class="btn red">Withdraw</button>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Wallet Deposit Address</h5>
                            <div class="row wallet-address">
                              <div class="col-md-8">
                                <p>
                                  Deposits to this address are unlimited. Note
                                  that you may not be able to withdraw all of
                                  your funds at once if you deposit more than
                                  your daily withdrawal limit.
                                </p>
                                <div class="input-group">
                                  <input
                                    type="text"
                                    class="form-control"
                                    value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                  />
                                  <div class="input-group-prepend">
                                    <button class="btn btn-primary">
                                      COPY
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-4">
                                <img
                                  v-if="$store.state.theme"
                                  src="img/qr-code-dark.svg"
                                  alt="qr-code"
                                />
                                <img
                                  v-else
                                  src="img/qr-code-light.svg"
                                  alt="qr-code"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card">
                          <div class="card-body">
                            <h5 class="card-title">Latest Transactions</h5>
                            <div class="wallet-history">
                              <table class="table">
                                <thead>
                                  <tr>
                                    <th>No.</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>1</td>
                                    <td>25-04-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>4.5454334</td>
                                  </tr>
                                  <tr>
                                    <td>2</td>
                                    <td>25-05-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>0.5484468</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-06-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                  <tr>
                                    <td>4</td>
                                    <td>25-07-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-checkmark-circle-outline
                                          green
                                        "
                                      ></i>
                                    </td>
                                    <td>1.45894147</td>
                                  </tr>
                                  <tr>
                                    <td>3</td>
                                    <td>25-08-2019</td>
                                    <td>
                                      <i
                                        class="
                                          icon
                                          ion-md-close-circle-outline
                                          red
                                        "
                                      ></i>
                                    </td>
                                    <td>2.5454545</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="Settings"
              role="tabpanel"
              aria-labelledby="Settings-tab"
            >
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Notifications</h5>
                  <div class="settings-notification">
                    <ul>
                      <li>
                        <div class="notification-info">
                          <p>Update price</p>
                          <span> Get the update price in your dashboard </span>
                        </div>
                        <div class="custom-control form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="notification1"
                          />
                          <label
                            class="form-check-label"
                            htmlFor="notification1"
                          ></label>
                        </div>
                      </li>
                      <li>
                        <div class="notification-info">
                          <p>2FA</p>
                          <span>
                            Unable two factor authentication service
                          </span>
                        </div>
                        <div class="custom-control form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="notification2"
                            checked
                          />
                          <label
                            class="form-check-label"
                            htmlFor="notification2"
                          ></label>
                        </div>
                      </li>
                      <li>
                        <div class="notification-info">
                          <p>Latest news</p>
                          <span>Get the latest news in your mail</span>
                        </div>
                        <div class="custom-control form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="notification3"
                          />
                          <label
                            class="form-check-label"
                            htmlFor="notification3"
                          ></label>
                        </div>
                      </li>
                      <li>
                        <div class="notification-info">
                          <p>Email Service</p>
                          <span>Get security code in your mail</span>
                        </div>
                        <div class="custom-control form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="notification4"
                            checked
                          />
                          <label
                            class="form-check-label"
                            htmlFor="notification4"
                          ></label>
                        </div>
                      </li>
                      <li>
                        <div class="notification-info">
                          <p>Phone Notify</p>
                          <span>
                            Get transition notification in your phone
                          </span>
                        </div>
                        <div class="custom-control form-check">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            id="notification5"
                            checked
                          />
                          <label
                            class="form-check-label"
                            htmlFor="notification5"
                          ></label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card settings-profile">
                <div class="card-body">
                  <h5 class="card-title">Create API Key</h5>
                  <div class="row">
                    <div class="col-md-6">
                      <label htmlFor="generateKey"> Generate key name </label>
                      <input
                        id="generateKey"
                        type="text"
                        class="form-control"
                        placeholder="Enter your key name"
                      />
                    </div>
                    <div class="col-md-6">
                      <label htmlFor="rewritePassword">
                        Confirm password
                      </label>
                      <input
                        id="rewritePassword"
                        type="password"
                        class="form-control"
                        placeholder="Confirm your password"
                      />
                    </div>
                    <div class="col-md-12">
                      <input type="submit" value="Create API key" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Your API Keys</h5>
                  <div class="wallet-history">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Key</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>zRmWVcrAZ1C0RZkFMu7K5v0KWC9jUJLt</td>
                          <td>
                            <div class="custom-control form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="apiStatus1"
                                checked
                              />
                              <label
                                class="form-check-label"
                                htmlFor="apiStatus1"
                              ></label>
                            </div>
                          </td>
                          <td>
                            <i class="icon ion-md-trash"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Rv5dgnKdmVPyHwxeExBYz8uFwYQz3Jvg</td>
                          <td>
                            <div class="custom-control form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="apiStatus2"
                              />
                              <label
                                class="form-check-label"
                                htmlFor="apiStatus2"
                              ></label>
                            </div>
                          </td>
                          <td>
                            <i class="icon ion-md-trash"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>VxEYIs1HwgmtKTUMA4aknjSEjjePZIWu</td>
                          <td>
                            <div class="custom-control form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="apiStatus3"
                              />
                              <label
                                class="form-check-label"
                                htmlFor="apiStatus3"
                              ></label>
                            </div>
                          </td>
                          <td>
                            <i class="icon ion-md-trash"></i>
                          </td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>M01DueJ4x3awI1SSLGT3CP1EeLSnqt8o</td>
                          <td>
                            <div class="custom-control form-check">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="apiStatus4"
                              />
                              <label
                                class="form-check-label"
                                htmlFor="apiStatus4"
                              ></label>
                            </div>
                          </td>
                          <td>
                            <i class="icon ion-md-trash"></i>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
