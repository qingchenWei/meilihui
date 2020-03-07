<template>
    <div class="title">
        <i class="iconfont icon-back" @click="goBack"></i>
        <div class="name">
            <slot></slot>
        </div>
        <i class="iconfont icon-category"></i>
    </div>
</template>
<script>
export default {
    methods:{
        goBack(){
            this.$router.back();
        }
    }
}
</script>
<style lang="scss" scoped>
       .title{
        display: flex;justify-content: space-between;font:700 20px/44px "";color: #000;position:fixed;top:0;left: 0;right: 0;margin:auto;padding:0 10px;height: 44px;z-index:50;background:rgba(255,255,255,.9);
        i{font-weight: 700;}
        .name{
            text-align: center;padding-top:8px;font:700 16px/44px "";
            h3{font:700 16px/0 "";}
            span{font:700 12px/0px "";color: red;}
        }
    }

</style>