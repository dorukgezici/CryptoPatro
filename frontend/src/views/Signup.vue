<template>
  <div class="vh-100 d-flex justify-content-center">
    <div class="form-access my-auto">
      <form>
        <span>Create Account</span>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Full Name"
            required
          />
        </div>
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
        <div class="form-group">
          <input
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
          <label class="form-check-label" htmlFor="form-checkbox">
            I agree to the
            <router-link to="/terms-and-conditions"
              >Terms & Conditions</router-link
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
