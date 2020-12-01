<template>
  <div class="shopcar">
    <!-- 头部 -->
    <m-title>
      <h3>购物车</h3>
    </m-title>
    <div class="mytitle">
    </div>
    <div class="car">
        <van-card
        v-for="data in shopcar"
        :key="data.goodsId"
        :num="data.num"
        :price="data.price"
        :desc="data.name"
        :title="data.brand"
        :thumb="data.img"
        />
    </div>
    <div>master</div>
  </div>
</template>
<script>
import Axios from "axios";
import Vue from "vue";
import { Card } from "vant";
Vue.use(Card);
export default {
  data() {
    return {
        shopcar:[]
    };
  },
  mounted() {
    Axios.post("https://localhost:3001/api/shopcar", {
      userId: sessionStorage.getItem("mlh_id"),
      oprate: "find"
    }).then(res => {
        this.shopcar = JSON.parse(res.data.msg.myshopcar)
        console.log(this.shopcar);
    });
  }
};
</script>
<style lang="scss" scoped>
.shopcar {
  .title {
    h3 {
      margin-top: 15px;
    }
  }
  .mytitle{
      height: 60px;
  }
}
</style>