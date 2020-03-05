<template>
    <div>
        <topimg :data="bannerData">
            <p class="myslot">{{bannerData.description}}</p>
        </topimg>
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
            bannerData:[]
        }
    },
    components:{
        goodslist,
        topimg
    },
    mounted(){
        axios.get("http://www.mei.com/appapi/silo/eventForH5?categoryId=crossborder&pageIndex=1&timestamp=1583379161257&summary=d03c2896aaa3bc1818a38ce43d7ad4b1&platform_code=H5").then(res=>{
            this.datalist=res.data.eventList
        })
      
        axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000011&platform_code=PLATEFORM_H5").then(res=>{
            this.bannerData=res.data.banners[0]
        })
    }
}
</script>