<template>
    <div class="box">
        <div class="title">
            <i class="iconfont icon-back btn" @click="handleClick()"></i>
        </div>
        <div class="login-form">
            <h1>
                <p>账号密码登录</p>
                <span>{{loginTips}}</span>
            </h1>
            <div class="login-box">
                <van-form @submit="onSubmit" >
                    <div class="input-box">
                        <van-field
                        v-model="username"
                        name="username"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                        />
                        <van-field
                            v-model="password"
                            type="password"
                            name="password"
                            label="密码"
                            placeholder="密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                        />
                        <van-field
                            v-model="repassword"
                            type="password"
                            name="repassword"
                            label="重复密码"
                            placeholder="重复密码"
                            :rules="[{ required: true, message: '请填写密码' }]"
                        />
                    </div>
                    <div style="margin: 50px 16px;">
                        <van-button block color="#555" type="info" plain native-type="submit" icon="arrow"></van-button>
                    </div>
                </van-form>
            </div>
        </div>
        <div class="aside-tips">
            <router-link to="/getpassword" class="getPassword">忘记密码？</router-link>
            <router-link to="/login" class="getPassword" trigger='onBlur'>去登陆</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import { Form, Toast, Field, Button, Icon} from 'vant'
import {mapMutations} from 'vuex'
Vue.use(Form)
Vue.use(Toast)
Vue.use(Field)
Vue.use(Button)
Vue.use(Icon)
export default {
    data () {
        return {
            loginTips:'',
            username: '',
            password: '',
            repassword: ''
        }
    },
    beforeMount () {
     Toast.loading({
        mask: true,
        message: '加载中...'
        });
    },
    mounted(){
        axios.get(`http://www.mei.com/appapi/customer/getRegisterTips`).then(res=>{
            this.loginTips=res.data.tips;
            Toast.clear()
        })
    },
    methods:{
        ...mapMutations('productdetail',["setcategoryId"]),
        goProductdetail(productId){
            this.setcategoryId(this.$route.params.id)
            this.$router.push(`/productdetail/${productId}`)
        },
        handleClick () {
            this.$router.back()
        },
        onSubmit(values) {
            if( this.password !== this.repassword){
                Toast.fail('密码不一致');
            }else{
                console.log('submit', values);
                Toast.loading({
                    mask: true,
                    message: '加载中...'
                });
                delete values.repassword;
                console.log(values);
                axios.post(`http://localhost:3001/api/reg`, values).then(res=>{
                    console.log(res);
                    Toast.clear()
                })
                alert("注册成功")
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.box{
    padding: 0 20px;
    .title{
        i{
            display: block;
            margin-top: 10px;
            margin-left: 10px;
        }
    }
    .login-form{
        h1{
            padding: 10px 16px;
            margin-top: 50px;
            p{
                font-size: 24px;
                font-weight: 100;
            }
            span{
                font-size: 20px;
                font-weight: 100;
                color: #666;
            }
        }
        .login-box{
            .input-box{
                margin: 15px;
                box-shadow: 0 0.08rem 0.133333rem rgba(0,0,0,.15), 0 -0.013333rem 0.133333rem rgba(0,0,0,.05);;
            }
        }
    }
    .aside-tips{
        display: flex;
        justify-content: space-between;
        margin: 0 16px;
        a{
            color: #555;
        }
    }
}
</style>
