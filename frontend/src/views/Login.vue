<template>
  <div class="vh-100 d-flex justify-content-center">
    <div class="form-access my-auto">
      <form>
        <span>Sign In</span>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            placeholder="Email Address"
            required
          />
        </div>
        <div class="form-group">
          <input
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
          <input type="checkbox" class="form-check-input" id="form-checkbox" />
          <label class="form-check-label" htmlFor="form-checkbox">
            Remember me
          </label>
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
