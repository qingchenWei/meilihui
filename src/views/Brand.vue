<template>
    <div v-if="body">
        <m-title>{{body.brandDetail.brandName}}</m-title>
        <div class="brand-top">
            <img :src="body.brandDetail.brandPageImage" alt="">
            <div class="mask">
                <h1>{{body.brandDetail.brandName}}</h1>
                <div class="follow">+关注</div>
                <div class="total">在售商品{{body.onSaleTotal}}件 &nbsp;&nbsp; 上新{{body.newTotal}}件</div>
            </div>
            <div class="story">
                {{body.brandDetail.brandStoryText}}
            </div>
        </div>

        <!-- 精品上新 -->
        <div class="new">
            <h3>精品上新</h3>
            <van-swipe :loop="false" :width="148" >
                <van-swipe-item v-for="data in body.newProductTop10" :key="data.productId" class="new-list">
                    <img :src="data.fileUrl" alt="">
                    <div class="price"><span>￥{{data.price}}</span>&nbsp;&nbsp;<del>￥{{data.marketPrice}}</del></div>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 人气热销 -->
        <div class="hot">
            <h3>人气热销</h3>
             <van-swipe :loop="false" :width="148" >
                <van-swipe-item v-for="data in body.hotProductTop10" :key="data.productId">
                    <img :src="data.fileUrl" alt="">
                    <div class="price"><span>￥{{data.price}}</span>&nbsp;&nbsp;<del>￥{{data.marketPrice}}</del></div>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>
<script>
import Axios from 'axios'
import Vue from 'vue';
import { mapMutations } from 'vuex'
import { Swipe, SwipeItem } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
    data(){
        return {
            body:null,
        }
    },
    methods:{
        ...mapMutations(['hide','show']),
    },
    mounted(){
        this.hide();
        Axios.request({
            url:`https://www.mei.com/appapi/brand/product/hotNew/v3?logoId=${this.$route.params.logoId}`
        }).then(res=>{
            this.body=res.data.body
        })
    },
    destroyed(){
        this.show()
    }
    
}
</script>
<style lang="scss" scoped>
img{width: 100%;}
h3{text-align: left;padding-left: 10px;}
.brand-top{
    position: relative;
    .mask{
        position: absolute;top:200px;left: 0;right: 0;
        h1{color: #fff;}
        .follow{background: #000;color: #fff;width: 80px;font:12px/30px "";margin:0 auto;}
        .total{font:12px/4 "";color: #666;}
    }
    .story{padding:60px 20px 20px 20px;text-align: left;font:14px/2 "";color: #666;}
}
.new{
    padding:20px 0;

}
</style>