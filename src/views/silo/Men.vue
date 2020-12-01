<template>
    <div>
        <img src="https://img.alicdn.com/tfs/TB1WQ91o4z1gK0jSZSgXXavwpXa-750-900.jpg" alt="">
        <goodslist :data="datalist"></goodslist>
    </div>
</template>
<script>
import goodslist from '@/components/GoodsList'
import axios from 'axios'
export default {
    data(){
        return {
            datalist:[],
        }
    },
    components:{
        goodslist
    },
    mounted(){
        axios.get("https://www.mei.com/appapi/silo/eventForH5?categoryId=men&pageIndex=1&timestamp=1583382501882&summary=f9d3d4b3ac896b4cf30f06f8d98a111c&platform_code=H5").then(res=>{
            this.datalist=res.data.eventList
        })
    }
}

</script>
<style lang="scss" scope>
div{
    img{
        width: 100%;
        height: 450px;
    }
}
    
</style>