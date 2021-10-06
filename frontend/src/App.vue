<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from "../src/components/Header.vue"

export default {
  mounted() {
    this.$store.dispatch('exchange/getAssets')
  },
  components: {Header},
}
</script>
