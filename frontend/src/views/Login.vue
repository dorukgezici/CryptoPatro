<template>
  <div class="vh-100 d-flex justify-content-center">
    <div class="form-access my-auto">
      <form @submit.prevent="signIn">
        <span>Sign In</span>
        <div class="form-group">
          <input
              v-model="username"
              type="text"
              class="form-control"
              placeholder="Username"
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
        <div class="text-end">
          <router-link to="/reset">Forgot Password?</router-link>
        </div>
        <div class="custom-control form-check">
          <input type="checkbox" class="form-check-input" id="form-checkbox"/>
          <label class="form-check-label" for="form-checkbox">Remember me</label>
        </div>
        <button type="submit" class="btn btn-primary">Sign In</button>
      </form>
      <h2>
        Don't have an account?
        <router-link to="/sign-up">Sign up here</router-link>
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    signIn() {
      this.$store.dispatch("auth/signIn", {
        username: this.username,
        password: this.password
      }).then(() => this.$router.push('/'))
    }
  }
}
</script>
