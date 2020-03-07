<template>
    <div>
        <topimg :data="bannerData" @goBrand="clickbrand">
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
        axios.get("http://www.mei.com/appapi/silo/eventForH5?categoryId=lifestyle&pageIndex=1&timestamp=1583382999309&summary=976675c832d25cdeb7fb7e6351168405&platform_code=H5").then(res=>{
            this.datalist=res.data.eventList
        })
      
        axios.get("http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000004&platform_code=PLATEFORM_H5").then(res=>{
            this.bannerData=res.data.banners[0]
        })
    },
    methods:{
        clickbrand(){
            this.$router.push(`/brand/${this.bannerData.link_url.slice(25)}`);
        }
    }
}
</script>