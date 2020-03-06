<template>
    <div>
        <topimg :data="bannerData"></topimg>
        <div class="count">
            <div v-for="(item,index) in newGoods" :key="index">
                <p>
                    {{item.main_title}}
                    <span>{{item.sub_title}}</span>
                </p>
                <div v-for="(data,index) in item.products" :key="index+1" >
                    <img :src="data.picUrl" alt="">
                    <p>{{data.tag}}</p>
                </div>
            </div>
        </div>
        <div v-for="item in newDay" :key="item.name" class="dayNew">
            <h3>{{item.name}}</h3>
            <goodslist :data="item.events"></goodslist>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import goodslist from '@/components/GoodsList'
import topimg from '@/components/TopImg'
import { Toast } from 'vant'
import 'vant/lib/index.css'
export default {
    data(){
        return {
            bannerData:[],
            newDay:[],
            newGoods:[]
        }
    },
    components:{
        goodslist,
        topimg
    },
    beforeMount () {
     Toast.loading({
        mask: true,
        message: '加载中...'
        });
    },
    mounted() {
        axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5").then(res=>{
            this.bannerData=res.data.banners[0]
        })
        axios.get("http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1583305321418&summary=6b29229d95b3bb61cfd2e9d2d1b4a140&platform_code=H5").then(res=>{
            this.newDay=res.data.lists
            Toast.clear()
        })
       
        axios.get("http://www.mei.com/appapi/ninenew/operational/v1?credential=").then(res=>{
        this.newGoods=res.data.show2
        })
    },
    
}
</script>
<style lang="scss" scope>

.dayNew{
    h3{
        margin-left: 20px;
        text-align: left;
        font: 30px/2 "";
    }
}
.count{
    overflow: hidden;
    div{
        margin-top: 20px;
        float: left;
        margin-left: 10px;
        div{
            img{
                width: 70px;
                height: 90px;
            }
        }
    }
}
    
</style>