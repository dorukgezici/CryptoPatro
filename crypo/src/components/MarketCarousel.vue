<template>
  <carousel :autoplay="2000" :wrapAround="true" :breakpoints="breakpoints">
    <slide v-for="slide in data" :key="slide">
      <router-link to="wallet">
        <div class="carousel__slide_item" v-html="slide"></div>
      </router-link>
    </slide>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
export default {
  data: () => ({
    data: [
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/1.png" alt="" /> <strong>Ethereum</strong> </div> <h2>237394.06 ETH</h2> <p>$12,000</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      '<div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/16.png" alt="" /> <strong>MultiVAC</strong> </div> <h2>626984.06 MTV</h2> <p>$11,020</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/3.png" alt="" /> <strong>Litecoin</strong> </div> <h2>624582.06 LTC</h2> <p>$41,000</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/4.png" alt="" /> <strong>KuCoin Token</strong> </div> <h2>223222.06 KCS</h2> <p>$5,000</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/5.png" alt="" /> <strong>Coti</strong> </div> <h2>267211.06 COTI</h2> <p>$21,000</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/6.png" alt="" /> <strong>Tron</strong> </div> <h2>529922.06 TRX</h2> <p>$12,003</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/7.png" alt="" /> <strong>Monero</strong> </div> <h2>229922.06 XMR</h2> <p>$14,111</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/8.png" alt="" /> <strong>Cardano</strong> </div> <h2>93793.39 ADA</h2> <p>$13,401</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/9.png" alt="" /> <strong>Binance Coin</strong> </div> <h2>328229.32 BNB</h2> <p>$12,402</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
      ' <div class="market-carousel-item"> <div class="market-carousel-item-name"> <img src="img/icon/10.png" alt="" /> <strong>Neo</strong> </div> <h2>33398.32 NEO</h2> <p>$23,202</p> <button class="btn buy">Deposit</button> <button class="btn sell">Withdraw</button> </div>',
    ],
    breakpoints: {
      500: {
        itemsToShow: 1,
      },
      600: {
        itemsToShow: 2,
      },
      1000: {
        itemsToShow: 3,
      },
      1400: {
        itemsToShow: 5,
      },
    },
  }),
  components: {
    Carousel,
    Slide,
  },
};
</script>
