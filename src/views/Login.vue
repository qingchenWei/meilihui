<template>
    <div class="login">
        <i class="iconfont icon-close close" @click="backClick()"></i>
       <h3><span>登录</span>/<span>注册</span></h3>
       <p>{{data.tips}}</p>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import axios from 'axios'
export default {
    data(){
        return{
            data:[]
        }
    },
    methods:{
        ...mapMutations(['hide','show']),
        backClick(){
            this.$router.back()
        }
    },
    mounted() {
        this.hide()
        axios.get("http://www.mei.com/appapi/customer/getRegisterTips").then(res=>{
            this.data= res.data
        })
    },
    destroyed(){
        this.show()
    }
}
</script>
<style lang="scss" scope>
.login{
    padding-left:30px 
}
.close{
    font: 600 35px/50px "";
    position: fixed;
    top: 0;
    right: 0;
}
h3{
    margin-top: 100px;
    text-align: left
}
p{
    text-align: left
}
    
</style>