<template>
    <nav v-indextitle="60">
        <div class="top" >
            <span @click="loginClick()">登录</span>
            <div @click="searchClick()"><i class="iconfont icon-search"></i>{{tip.words}}</div>
            <i class="iconfont icon-cart cart" @click="goCar"></i>
        </div>
        <ul>
            <router-link v-for="(item,index) in tablist" :key="item.categoryId" tag="li"
            :to="item.path"  @click.native="pageChange(index)"><span :class="curren==index?'active':''">{{item.name}}</span></router-link>
        </ul>
    </nav>
</template>
<script>
import  {Search} from 'vant'
import vue from 'vue'
import Axios from 'axios'
import { mapState,mapMutations } from 'vuex'

vue.use(Search)
export default {
    data () {
        return {
            tablist:[],
            tip:[],
            path:["/index","/silo/Crossborder","/silo/women","/silo/men","/silo/Cosmetics","/silo/lifestyle","/silo/kids"],
            curren:0
        }
    },
    // computed: {
    //     ...mapState(['isTabshow'])
    // },
    methods:{
        ...mapMutations(['hide','show']),
        goCar(){
            this.$router.push("/shopCar")
            this.hide()
        },
        loginClick(){
            this.$router.push("/login")
             this.hide()
        },
        searchClick(){
             this.hide()
            this.$router.push("/search")
        },
        getTablist:function(){
            return Axios.get("http://www.mei.com/appapi/silo/navigationAll/v3?timestamp=1583444359714&summary=f55b8d44faafc051bb9c68ef12493dc0")
        },
        getTip:function(){
            return Axios.get("http://www.mei.com/appapi/search/searchDefault/v3")
        },
        pageChange(index){
            this.curren=index;
            localStorage.setItem("index",index)
            console.log(index)
        }
    },
    mounted(){
        Axios.all([this.getTablist(),this.getTip()]).then(Axios.spread((tablist,tip)=>{
            this.tablist=tablist.data.lists
            this.tablist.unshift({categoryId:"001",urlKey:"",name:"推荐"})
            this.tablist.forEach((val,index)=>val.path=this.path[index])
            this.tip=tip.data
        })
        )
    },
    destroyed(){
        this.show()
    }
}
</script>
<style lang="scss" scope>
.active{
    border-bottom: 3px solid white;
}
nav{
    height: 90px;
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 10;
    color: white;
    .top{
        display: flex;
        div{
            width: 270px;
            height: 36px;
            line-height: 36px;
            background:rgba(255,255,255,.5);
            margin-top: 7px
        }
        span{
            width: 54px;
            height: 48px;
            font:700 16px/3 ""
        }
        .cart{
            height: 48px;
            font:800 20px/55px "";
            margin-left: 15px;
        }
        .search{
            width: 256px;
            height: 34px;
        }
    }
    ul{
        margin-top: 10px;
        display: flex;
        li{
            flex:1;
            span{
                padding: 5px;
            }
        }
    }
}
    
</style>