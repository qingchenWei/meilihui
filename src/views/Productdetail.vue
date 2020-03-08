<template>
    <div class="productdetail" v-if="goodstext">
        <!-- 头部 -->
        <m-title>
            <h3>{{goodstext.brand}}</h3>
            <span>￥{{goodstext.price}}</span>
        </m-title>
        <!-- 头部以下都是腿 -->
        <div class="cont">
            <!-- 轮播 -->
            <div class="swiper">
                <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
                    <van-swipe-item v-for="data in goodstext.images" :key="data.bigImgUrl"><img :src="data.bigImgUrl"></van-swipe-item>
                </van-swipe>
            </div>
            <!-- 名字和价格 -->
            <div class="product-base">
                <h1>{{goodstext.name}}</h1>
                <del>￥{{goodstext.marketPrice}}</del>
                <p>
                    <strong>￥{{goodstext.price}}</strong>
                    <van-tag plain  color="#000" class="center">{{goodstext.discount}}</van-tag>
                    <!-- <van-tag type="danger">{{goodstext.newTagList[1].tag}}</van-tag> -->
                </p>
            </div>
            <!-- 商品介绍 -->
            <div class="other-info-block">
                <ul>
                    <li>
                        <div class="left">服务</div>
                        <div class="right">
                            <span v-for="data in goodstext.service_labels" :key="data.label_title">{{data.label_title}}</span>
                        </div>
                    </li>
                    <li v-if="goodstext.size.length" class="color-size-list">
                        <div class="left">尺码</div>
                        <div class="right">
                            <span v-for="data in goodstext.size" :key="data.productId">{{data.sizeValue}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 商品详情 -->
            <div class="block-desc">
                <h3>商品详情</h3>
                <img :src="data.bigImgUrl" alt="" v-for="data in goodstext.description.product_img1" :key="data.bigImgUrl">
            </div>
        </div>
        <div class="footer" style="height:48px"></div>
        <footer>
            <div class="shop-car" @click="goCar">
                <i class="iconfont icon-cart"></i>
                <span>购物袋</span>
            </div>
            <div class="add-cart" @click="addCar">加入购物车</div>
            <div class="add-checkout" @click="goBuy">立即购买</div>
        </footer>
    </div>
</template>
<script>
import Axios from 'axios'
import {mapState} from 'vuex'
import { mapMutations } from 'vuex'
import Vue from 'vue';
import { Swipe, SwipeItem,Tag} from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Tag);

export default {
    data(){
        return {
            goodstext:null,
        }
    },
    methods:{
        ...mapMutations(['hide','show']),
        goCar(){
            this.$router.push('/shopcar')
            this.hide()
        },
        addCar(){
            Axios.post("http://localhost:3001/api/shopcar", {
                userId: sessionStorage.getItem("mlh_id"),
                oprate: "add",
                goodsId: this.$route.params.productId,
                img: this.goodstext.images[0].smallImgUrl,
                price: this.goodstext.price,
                name: this.goodstext.name,
                brand: this.goodstext.brand
            }).then(res => {
                console.log(res);
            });
        },
        goBuy(){
            console.log("不要买了你又没钱")
        },
        
    },
    computed:{
        ...mapState('productdetail',['categoryId'])
    },
    mounted(){
        this.hide();
        Axios.request({
            url:`http://www.mei.com/appapi/product/detail/v3?categoryId=${this.categoryId}&productId=${this.$route.params.productId}&platform_code=H5&timestamp=1583395183948&summary=56590eaaa28c5282c31c08178b52f397`
        }).then(res=>{
            this.goodstext=res.data.infos
            console.log(res.data.infos)
        })
    }
}
</script>
<style lang="scss" scoped>
.productdetail{
    text-align: left; padding:14px;
    img{display: block;width: 100%;}
    .swiper{
        margin:0 4px;box-shadow: 0 0 5px #ccc;
        // img{height: 300px;}
        .my-swipe .van-swipe-item {
            color: #000;text-align: center;
        }
    }
    .product-base{
        padding: 16px 5px;
        h1{font:16px "";}
        del{color: #ccc;font: 12px "";}
        p{
            strong{color: red;}
            .center{margin:0 10px;}
        };
    }
    .other-info-block{
        ul li{
            padding: 20px 0;border-top:1px solid #eee;display: flex;color:#666;
            &.color-size-list{
                span{
                    font: 12px/2 "";color: #000;background: #f5f5f5;padding: 6px;
                    &:hover{background: #000;color: #fff;}
                }
            }
            .left{flex:1}
            .right{
                flex:5;font-size: 12px;
                span{margin:0 5px;}
                }
        }
    }
    .block-desc{
        border-top:1px solid #eee;
        h3{font:700 20px/3 ""}
    }
    footer{
        position: fixed;bottom: 0;left: 0;right: 0;margin: auto;height: 48px;display: flex;background: #fff;font:700 16px/48px "";
        div{text-align: center;}
        .shop-car{
            flex: 2;font:12px/48px "";
            i{margin-right: 5px;font-weight: 700;}
        }
        .add-cart{flex: 3;border-left: 1px solid #ccc;border-right: 1px solid #ccc;}
        .add-checkout{flex: 3;color: red;}
    }
}
</style>