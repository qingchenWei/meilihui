<template>
  <div class="title">
    <i class="iconfont icon-back btn" @click="goBack"></i>
    <div class="name">
      <slot></slot>
    </div>
    <i class="iconfont icon-category more" @click="moreClick()"></i>
    <ul class="morelist" v-if="isShow">
      <router-link
        v-for="(item) in moreArr"
        :key="item.name"
        tag="li"
        :to="item.path"
      >{{item.name}}</router-link>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      moreArr: [
        { name: "首页", path: "/index" },
        { name: "购物袋", path: "/cart" },
        { name: "个人中心", path: "/center" }
      ],
      isShow: false
    };
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    moreClick() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
//   font: 700 20px/44px "";
  color: #000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  padding: 0 10px;
  height: 44px;
  z-index: 50;
  background: rgba(255, 255, 255, 0.9);
  .name {
    width: 100%;
    text-align: center;
    padding-top: 8px;
    font: 700 16px/44px "";
    h3 {
      font: 700 18px/1 "";
    }
    span {
    position: fixed;;
      font: 500 16px/1 "";
      top: 24px;
      left: 0;
      right:  0;
      color: red;
    }
  }
  .btn {
    position: absolute;
    left: 0px;
    top: 0px;
    font: 600 30px "";
    margin-top: 5px;
  }
    .more {
    position: fixed;
    width: 40px;
    right: 0;
    top: 0px;
    font: 600 25px "";
    margin-top: 5px;
  }
  .morelist{
    border: 1px solid rgb(224, 222, 222);
    height: 150px;
    width: 120px;
    background: rgb(245,245,245);
    position: fixed;
    top: 40px;
    right: 0;
    z-index: 100;
    li{
        height: 50px;
        text-align: center;
        line-height: 50px;
    }
}
}
</style>