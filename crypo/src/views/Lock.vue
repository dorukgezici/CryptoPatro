<template>
  <div class="vh-100 d-flex justify-content-center">
    <div class="form-access my-auto">
      <form>
        <span>Locked</span>
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          required
        />
        <button type="submit" class="btn btn-primary">Unlock</button>
        <h2>No luck? <router-link to="/reset">Reset Password</router-link></h2>
      </form>
    </div>
  </div>
</template>
