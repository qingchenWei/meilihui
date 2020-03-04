<template>
    <div>
        <div class="topImg" >
            <img :src="bannerData.main_image" />
            <h3>{{bannerData.main_title}}</h3>
            <p>{{bannerData.sub_title}}</p>
        </div>
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
export default {
    data(){
        return {
            bannerData:[],
            newDay:[],
            newGoods:[]
        }
    },
    components:{
        goodslist
    },
    mounted() {
        axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000008&platform_code=PLATEFORM_H5").then(res=>{
            this.bannerData=res.data.banners[0]
        })
        axios.get("http://www.mei.com/appapi/home/eventForH5?params=%7B%7D&timestamp=1583305321418&summary=6b29229d95b3bb61cfd2e9d2d1b4a140&platform_code=H5").then(res=>{
            this.newDay=res.data.lists
        })
       
        axios.get("http://www.mei.com/appapi/ninenew/operational/v1?credential=").then(res=>{
        this.newGoods=res.data.show2
        console.log(this.newGoods)
        })
    },
    
}
</script>
<style lang="scss">
*{
    margin: 0;
    padding: 0;
}
.topImg{
    position: relative;
    height: 450px;
    img{
        width: 100%;
        height: 450px;
    }
    h3{
        position: absolute;
        left: 0;
        right: 0;
        bottom:100px;
        color: white;
        font: 600 30px/40px "";
    }
    p{
        position: absolute;
        left: 0;
        right: 0;
        bottom:80px;
        color: white;
    }
    
}
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