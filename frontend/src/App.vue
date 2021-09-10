<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from "../src/components/Header.vue"
import axios from "axios"

export default {
  mounted() {
    const token = localStorage.getItem('token')
    if (token !== null) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`
    } else {
      this.$router.push('/login')
    }
  },
  components: {Header},
}
</script>
