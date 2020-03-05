<template>
    <div class="box">
            <div class="detailtitle" v-title="100">
                <i class="iconfont icon-back btn" @click="handleClick()"></i>
                <span>{{datalist.eventName}}</span>
                <ul class="toplist">
                    <li v-for="(item,index) in topArr" :key="item" @click="showClick(item)" :class="now===index?'active':''">{{item}}</li>
                </ul>
            </div> 
        <div class="content" :style="{height:scrollHeight}">
        <ul class="goodslist">
            <li v-for="data in datalist.products" :key="data.productId" style="width:50%;float:left;list-style:none;heigth:315px;">
                <div style="padding:10px;">
                    <img style="display:block;width:165px;heigth:220px;" :src="data.imageUrl" alt="">
                    <!-- <span style="border:1px solid black;font-size:16px;margin-left:-100px;" v-if="data.tagListDto.length">{{data.tagListDto[0].tag}}</span>
                    <span v-else style="border:1px solid black"></span> -->
                    <h3 style="text-align:left;font:600 16px/1 '';white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{data.brandName}}</h3>
                    <p style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font:600 16px/20px '';">{{data.productName}}</p>
                    <span style="color:red;font:600 16px/20px '';margin-left:-20px;">￥{{data.price}}</span>
                    <span style="text-decoration:line-through;font:600 16px/20px '';margin-left:10px;">￥{{data.marketPrice}}</span>
                    <span style="color:#333;font:600 14px/18px '';margin-left:10px;">{{data.discount}}折</span>
                </div>
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import vue from 'vue'
import { Toast } from 'vant'
import 'vant/lib/index.css'
import BetterScroll from 'better-scroll'
vue.use(Toast)
vue.directive('title', {
  inserted (el, bind) {
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > bind.value) {
        el.style.display = 'none'
        console.log(el.className)
      } else {
        el.style.display = 'block'
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
export default {
    data () {
        return {
            datalist:[],
            topArr:["人气","折扣","价格"],
            now:0,
            myindex:0,
            scrollHeight: '0px'
        }
    },
    beforeMount () {
     Toast.loading({
        mask: true,
        message: '加载中...'
        });
    },
    mounted(){
        axios.get(`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1583347289449&summary=d8505c94658d53cfbba6daae46368abd&platform_code=H5`).then(res=>{
            this.datalist=res.data;
            Toast.clear()
        })
        // this.scrollHeight = document.documentElement.clientHeight - 80 + 'px'
        //  new BetterScroll('.content', {
        //     scrollbar: {
        //     fade: true,
        //     interactive: false 
        // },
        //     click: true 
        // })
    },
    methods:{
        handleClick () {
            this.$router.back()
        },
        showClick(data){
            if(data=="折扣"){
                axios.get(`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=1&sort=ASC&timestamp=1583354967282&summary=ea6a830066155e77de2343e86739dcbb&platform_code=H5`).then(res=>{
                    this.datalist=res.data;
                    this.now=1
                    Toast.clear()
                })
            }else if(data=="人气"){
                axios.get(`http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1583347289449&summary=d8505c94658d53cfbba6daae46368abd&platform_code=H5`).then(res=>{
                    this.datalist=res.data;
                    this.now=0
                    Toast.clear()
                })
            }else{
                if(this.myindex){
                    this.datalist.products.sort((a,b)=>a.price-b.price)
                    this.myindex=0
                }else{
                    this.datalist.products.sort((a,b)=>b.price-a.price)
                     this.myindex=1
                }
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.active{
    color: red
}
  .detailtitle{
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  height: 40px;
  text-align:center;
  line-height: 40px;
  background: white;
  i{
    position: absolute;
    left:0px;
    top:0px;
    font: 600 30px "";
    margin-top: 5px;
  }
  span{
      font: 600 16px/2 "";
  }
  .toplist{
    display: flex;
    background: white;
    li{
        flex: 1;
        list-style: none;
    }
}

}
.btn{
  width: 40px;
  height: 40px;
  position: fixed;
  top: 10px;
  left: 10px;
}

.goodslist{
    margin-top: 50px;
}
</style>
