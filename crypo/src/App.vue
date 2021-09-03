<template>
  <Header />
  <router-view />
</template>

<script lang="ts">
import Header from "../src/components/Header.vue";
export default {
  components: { Header },
};
</script>
