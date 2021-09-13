<template>
  <div class="market-news mt15">
    <h2 class="heading">Market News</h2>
    <ul>
      <li v-for="newsItem in news" :key="newsItem">
        <a :href="newsItem.url" target="_blank">
          <strong>{{ newsItem.title }}</strong>
          {{ newsItem.source.title }}
          <span>{{ $filters.getHumanDate(newsItem.publishedAt) }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import exchange from '../api/exchange'

export default {
  data() {
    return {
      news: []
    }
  },
  mounted() {
    exchange.getNews(response => {
      this.$data.news = response.results
    })
  },
}
</script>