<template>
  <div class="vh-100 d-flex justify-content-center">
    <div class="form-access my-auto">
      <form>
        <span class="mb-0">OTP Verification</span>
        <p class="text-center mb-4">
          We will send one time code on this number
        </p>
        <input
          type="phone"
          class="form-control"
          placeholder="Enter your phone number"
          required
        />
        <button type="submit" class="btn btn-primary">Send</button>
        <h2>Don't get code? <router-link to="#">Resend</router-link></h2>
      </form>
    </div>
  </div>
</template>
