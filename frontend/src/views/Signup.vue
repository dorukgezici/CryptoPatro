<template>
  <div class="vh-100 d-flex justify-content-center">
    <div class="form-access my-auto">
      <form @submit.prevent="signUp">
        <span>Create Account</span>
        <div class="form-group">
          <div class="form-group">
            <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email Address"
                required
            />
          </div>
          <div class="form-group">
            <input
                v-model="username"
                type="text"
                class="form-control"
                placeholder="Username"
                required
            />
          </div>
          <input
              v-model="firstName"
              type="text"
              class="form-control"
              placeholder="First Name"
              required
          />
        </div>
        <div class="form-group">
          <input
              v-model="lastName"
              type="text"
              class="form-control"
              placeholder="Last Name"
              required
          />
        </div>
        <div class="form-group">
          <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
          />
        </div>
        <div class="form-group">
          <input
              v-model="password2"
              type="password"
              class="form-control"
              placeholder="Confirm Password"
              required
          />
        </div>
        <div class="custom-control form-check">
          <input
              type="checkbox"
              class="form-check-input"
              id="form-checkbox"
              required
          />
          <label class="form-check-label" for="form-checkbox">
            I agree to the
            <router-link to="/terms-and-conditions"
            >Terms & Conditions
            </router-link
            >
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Create Account</button>
      </form>
      <h2>
        Already have an account?
        <router-link to="/login"> Sign in here</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      email: '',
      username: '',
      firstName: '',
      lastName: '',
      password: '',
      password2: '',
    }
  },
  computed: {
    ...mapState('auth', [
      'me',
    ]),
  },
  methods: {
    signUp() {
      this.$store.dispatch("auth/signUp", {
        email: this.email,
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password,
        password2: this.password2,
      })
    }
  }
}
</script>
