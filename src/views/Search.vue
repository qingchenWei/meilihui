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
    <div class="search-list showhide" v-show="text">
      <ul>
        <li v-for="data in searchList" :key="data.name" @click="changeText(data.name)"><span style="font:600 16px/1 ''">{{data.name}}</span></li>
      </ul>
    </div>

    <!-- 搜索提示 -->
    <div class="search-find" v-show="!text">
      <h3>搜索发现</h3>
      <ul>
        <li v-for="data in findList" :key="data.findKeyWord" @click="changeText(data.findKeyWord)">{{data.findKeyWord}}</li>
      </ul>
    </div>
       
    <div class="searchlist" v-if="datalist">
      <ul class="toplist" style="display:none">
          <li v-for="(item,index) in topArr" :key="item" @click="showClick(index)" :class="now===index?'active':''">{{item}}</li>
      </ul>
      <ul class="goodslist">
            <li v-for="data in datalist.products" :key="data.productId" style="width:50%;float:left;list-style:none;height:315px;" @click="goProductdetail(data.productId)"> 
                <div style="padding:10px;">
                    <img style="display:block;width:165px;height:220px;" :src="data.imageUrl" alt="">
                    <!-- <span style="border:1px solid black;font-size:16px;margin-left:-100px;" v-if="data.tagListDto.length">{{data.tagListDto[0].tag}}</span>
                    <span v-else style="border:1px solid black"></span> -->
                    <h3 style="text-align:left;font:600 16px/1 '';white-space: nowrap;text-overflow: ellipsis;overflow: hidden;" v-if="data.brandName">{{data.brandName}}</h3>
                     <h3 v-else style="color:white">111</h3>
                    <p style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font:600 16px/20px '';">{{data.productName}}</p>
                    <span style="color:red;font:600 16px/20px '';margin-left:-20px;">￥{{data.price}}</span>
                    <span style="text-decoration:line-through;font:600 16px/20px '';margin-left:10px;">￥{{data.marketPrice}}</span>
                    <span style="color:#333;font:600 14px/18px '';margin-left:10px;">{{data.itemPriceDto.discount}}折</span>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { Search } from 'vant'
import { mapMutations } from 'vuex'
import { Toast } from 'vant'
Vue.use(Search,Toast)

export default {
  data () {
    return {
      text: '',
      topArr:["人气","折扣","价格"],
      findList: [],
      searchList: [],
      datalist:[],
      now: 0,
      myindex:0,
    }
  },
  methods: {
    ...mapMutations(['hide','show']),
    ...mapMutations('productdetail',["setcategoryId"]),
    // 切换搜索内容
    changeText (name) {
      console.log()
       Toast.loading({
        mask: true,
        message: '加载中...'
        });
      let top = document.querySelector(".toplist")
      top.style.display="block";
      top.style.display="flex"
      let to = document.querySelector(".showhide")
      to.style.display="none"
      this.text = name
      axios.get(`https://www.mei.com/appapi/search/searchKey/v3?pageIndex=1&q=${encodeURIComponent(this.text)}&sort=&key=&searchKeyWord=${encodeURIComponent(this.text)}`).then(res=>{
        this.datalist=res.data
        console.log(this.datalist)
             Toast.clear();
      })
    },
    goProductdetail(productId){
          this.setcategoryId(this.$route.params.id)
          this.$router.push(`/productdetail/${productId}`)
    },
    // 返回
    onCancel () {
      this.$router.back()
    },
    // 搜索商品
    searchGoods () {
      axios.request({
        url: `https://www.mei.com/appapi/search/searchSuggest/v3?text=${encodeURIComponent(this.text)}`
      }).then(res => {
        this.searchList = res.data.result
      })
      if(this.searchList){
        this.datalist=[]
        let top = document.querySelector(".toplist")
        top.style.display="none"
      }
    },
    showClick(data) {
      let to = document.querySelector(".showhide")
      to.style.display="none"
      //人气
      if(data==0){
        axios.get(`https://www.mei.com/appapi/search/searchKey/v3?pageIndex=1&q=${encodeURIComponent(this.text)}&sort=&key=&searchKeyWord=${encodeURIComponent(this.text)}`).then(res=>{
        this.datalist=res.data
      })
      this.now=0
      }
      //价格排序
      if(data==2){
        if (this.myindex) {
          this.now = 2;
          this.datalist.products.sort((a, b) => a.price - b.price);
          this.myindex = 0;
        } else {
          this.datalist.products.sort((a, b) => b.price - a.price);
          this.myindex = 1;
          this.now = 2;
        }
      }
      //折扣排序
      if(data==1){
        if (this.myindex) {
          this.datalist.products.sort((a, b) => a. itemPriceDto.discount - b. itemPriceDto.discount);
          this.now = 1;
          this.myindex = 0;
        } else {
          this.datalist.products.sort((a, b) => b. itemPriceDto.discount - a. itemPriceDto.discount);
          this.now = 1;
          this.myindex = 1;
        }
      }
  },
  },
  mounted () {
    this.hide();
    // 搜索提示列表
    axios.request({
      url: 'https://www.mei.com/appapi/search/searchFind/v3'
    }).then(res => {
      this.findList = res.data.searchFindList
    }),
     axios.get(`https://www.mei.com/appapi/search/searchKey/v3?pageIndex=1&q=${encodeURIComponent(this.text)}&sort=&key=&searchKeyWord=${encodeURIComponent(this.text)}`).then(res=>{
        this.datalisted=res.data
      })
  },
  
  destroyed(){
    this.show();
  }

}
</script>
<style lang="scss" scoped>
.active{
    color: red
}
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
   .toplist{
    display: flex;
    background: white;
    li{
        flex: 1;
        list-style: none;
    }}
</style>
