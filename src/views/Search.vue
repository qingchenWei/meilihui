<template>
  <div class="search">
    <!-- 头部 -->
    <div class="search-top">
      <van-search
          v-model="text"
          show-action
          placeholder="请输入搜索关键词"
          @cancel="onCancel"
          @input="searchGoods"
        />
    </div>

    <!-- 搜索商品列表 -->
    <div class="search-list" v-show="text">
      <ul>
        <li v-for="data in searchList" :key="data.name">{{data.name}}</li>
      </ul>
    </div>

    <!-- 搜索提示 -->
    <div class="search-find" v-show="!text">
      <h3>搜索发现</h3>
      <ul>
        <li v-for="data in findList" :key="data.findKeyWord" @click="changeText(data.findKeyWord)">{{data.findKeyWord}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { Search } from 'vant'
import { mapMutations } from 'vuex'

Vue.use(Search)

export default {
  data () {
    return {
      text: '',
      findList: [],
      searchList: []
    }
  },
  methods: {
    ...mapMutations(['hide','show']),
    // 切换搜索内容
    changeText (name) {
      this.text = name
    },
    // 返回
    onCancel () {
      this.$router.back()
    },
    // 搜索商品
    searchGoods () {
      axios.request({
        url: `http://www.mei.com/appapi/search/searchSuggest/v3?text=${encodeURIComponent(this.text)}`
      }).then(res => {
        this.searchList = res.data.result
      })
    }
  },
  mounted () {
    this.hide();
    // 搜索提示列表
    axios.request({
      url: 'http://www.mei.com/appapi/search/searchFind/v3'
    }).then(res => {
      this.findList = res.data.searchFindList
    })
  },
  destroyed(){
    this.show();
  }

}
</script>
<style lang="scss" scoped>
  .search-find{
    text-align:left; padding:0 10px;
    h3{font:16px/1.5 "";}
    ul{
      li{display: inline-block;width: 27%;height: 30px;background: #f5f5f5;margin:8px;text-align: center;font:14px/30px "";}
    }
  }
  .search-list{padding:10px;
    ul li{margin: 5px;font:14px/30px "";}
  }
</style>
