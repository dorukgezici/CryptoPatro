<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <MarketCarousel />
      </div>
    </div>
  </div>
  <MarketsList />
</template>

<script lang="ts">
import MarketCarousel from "../components/MarketCarousel.vue";
import MarketsList from "../components/MarketsList.vue";
export default {
  components: {
    MarketCarousel,
    MarketsList,
  },
};
</script>
