<template>
  <header class="light-bb">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link class="navbar-brand" to="/">
        <img v-if="$store.state.theme" src="img/logo-dark.svg" alt="" />
        <img v-else src="img/logo-light.svg" alt="" />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#headerNav"
        aria-controls="headerNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="headerNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/"
              >Exchange</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="markets">Markets</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown1"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dashboard
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown1"
            >
              <li>
                <router-link class="dropdown-item" to="profile"
                  >Profile</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="wallet"
                  >Wallet</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="settings"
                  >Settings</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown2"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Pages
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown2"
            >
              <li>
                <router-link class="dropdown-item" to="login"
                  >Login</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="sign-up"
                  >Sign up</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="lock">Lock</router-link>
              </li>
              <li>
                <router-link class="dropdown-item" to="otp-number"
                  >OTP Number</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="otp-verify"
                  >OTP Verify</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="reset"
                  >Reset</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="404">404</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item header-custom-icon">
            <a href="#" class="nav-link" @click="toggleDark">
              <i v-if="$store.state.theme" class="icon ion-md-moon"></i>
              <i v-else class="icon ion-md-sunny"></i>
            </a>
          </li>
          <li class="nav-item dropdown header-custom-icon">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown4"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="icon ion-md-notifications"></i>
              <span class="circle-pulse"></span>
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown4"
            >
              <div
                class="
                  dropdown-header
                  d-flex
                  align-items-center
                  justify-content-between
                "
              >
                <p class="mb-0 font-weight-medium">6 New Notifications</p>
                <a href="#!" class="text-muted">Clear all</a>
              </div>
              <div class="dropdown-body">
                <a href="#!" class="dropdown-item">
                  <div class="icon">
                    <i class="icon ion-md-lock"></i>
                  </div>
                  <div class="content">
                    <p>Account password change</p>
                    <p class="sub-text text-muted">5 sec ago</p>
                  </div>
                </a>
                <a href="#!" class="dropdown-item">
                  <div class="icon">
                    <i class="icon ion-md-alert"></i>
                  </div>
                  <div class="content">
                    <p>Solve the security issue</p>
                    <p class="sub-text text-muted">10 min ago</p>
                  </div>
                </a>
                <a href="#!" class="dropdown-item">
                  <div class="icon">
                    <i class="icon ion-logo-android"></i>
                  </div>
                  <div class="content">
                    <p>Download android app</p>
                    <p class="sub-text text-muted">1 hrs ago</p>
                  </div>
                </a>
                <a href="#!" class="dropdown-item">
                  <div class="icon">
                    <i class="icon ion-logo-bitcoin"></i>
                  </div>
                  <div class="content">
                    <p>Bitcoin price is high now</p>
                    <p class="sub-text text-muted">2 hrs ago</p>
                  </div>
                </a>
                <a href="#!" class="dropdown-item">
                  <div class="icon">
                    <i class="icon ion-logo-usd"></i>
                  </div>
                  <div class="content">
                    <p>Payment completed</p>
                    <p class="sub-text text-muted">4 hrs ago</p>
                  </div>
                </a>
              </div>
              <div
                class="
                  dropdown-footer
                  d-flex
                  align-items-center
                  justify-content-center
                "
              >
                <a href="#!">View all</a>
              </div>
            </ul>
          </li>
          <li class="nav-item dropdown header-img-icon">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown5"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="img/avatar.svg"
                class="header-avatar-image"
                alt="avatar"
              />
            </a>
            <ul
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="navbarDropdown5"
            >
              <router-link to="profile">
                <div
                  class="dropdown-header d-flex flex-column align-items-center"
                >
                  <div class="figure mb-3">
                    <img src="img/avatar.svg" alt="" />
                  </div>
                  <div class="info text-center">
                    <p class="name font-weight-bold mb-0">Tony Stark</p>
                    <p class="email text-muted mb-3">tonystark@gmail.com</p>
                  </div>
                </div>
              </router-link>
              <div class="dropdown-body">
                <ul class="profile-nav">
                  <li class="nav-item">
                    <router-link to="/profile" class="nav-link">
                      <i class="icon ion-md-person"></i>
                      <span>Profile</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="wallet" class="nav-link">
                      <i class="icon ion-md-wallet"></i>
                      <span>My Wallet</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="settings" class="nav-link">
                      <i class="icon ion-md-settings"></i>
                      <span>Settings</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/" class="nav-link red">
                      <i class="icon ion-md-power"></i>
                      <span>Log Out</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    toggleDark: function () {
      this.$store.commit("changeTheme");
      document.body.classList.toggle("dark");
    },
  },
};
</script>
