<template>
    <div>
        <topimg :data="bannerData">
            <p class="myslot">{{bannerData.description}}</p>
        </topimg>
        <ul class="mynav">
            <li v-for="(item,index) in navData" :key="index" @click="handleClick(item)">
                <img :src="item.categoryImgStr" alt="">
                <p>{{item.name}}</p>
            </li>
        </ul>
        <goodslist :data="datalist"></goodslist>
    </div>
</template>
<script>
import goodslist from '@/components/GoodsList'
import topimg from '@/components/TopImg'
import axios from 'axios'
export default {
    data(){
        return {
            datalist:[],
            bannerData:[],
            navData:[]
        }
    },
    components:{
        goodslist,
        topimg
    },
    mounted(){
        axios.get("http://www.mei.com/appapi/silo/eventForH5?categoryId=cosmetics&pageIndex=1&timestamp=1583384922666&summary=50b124522bac65df3b8527b86be6f786&platform_code=H5").then(res=>{
            this.datalist=res.data.eventList
        })
      
        axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000003&platform_code=PLATEFORM_H5").then(res=>{
            this.bannerData=res.data.banners[0]
        })
       
        axios.get(" http://www.mei.com/appapi/cms/cmsDetail/v3?silo=2013000100000000003&ids=2042000100000000431&timestamp=1583384922846&summary=4ee3768b6675d97529d026f53283f41e&platform_code=H5").then(res=>{
            this.navData=res.data.resultList[0].data
        })
    },
    methods:{
        handleClick(data){
            this.$router.push({path:'/productlist/',query:{categoryOneId: data.categoryOneId,categroyTwoName:data.categroyTwoName,siloId:data.siloId,thirdCategories:encodeURIComponent(data.categroyTwoName)}})
        }
    }
}
</script>
<style lang="scss" scope>
div{
    .mynav{
        margin-top: 10px;
        display: flex;
        li{
            flex:1;
            img{
                width: 61px;
                height: 82px;
            }
        }
    }
}
    
</style>