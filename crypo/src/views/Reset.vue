<template>
  <div class="vh-100 d-flex justify-content-center">
    <div class="form-access my-auto">
      <form>
        <span>Reset password</span>
        <input
          type="email"
          class="form-control"
          placeholder="Enter Your Email Address"
        />
        <button type="submit" class="btn btn-primary">Reset</button>
        <h2>
          Remember Password?
          <router-link to="/login"> Sign in here</router-link>
        </h2>
      </form>
    </div>
  </div>
</template>
