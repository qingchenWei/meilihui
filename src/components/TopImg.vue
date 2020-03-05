<template>
  <div class="topImg">
    <img :src="data.main_image" />
    <h3>{{data.main_title}}</h3>
    <p>{{data.sub_title}}</p>
    <slot class="myslot"></slot>
  </div>
</template>
<script>
export default {
    props:["data"]
}
</script>
<style lang="scss" scope>
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
        .myslot{
        position: absolute;
        left: 0;
        right: 0;
        bottom:60px;
        color: white;
    }
    
}
</style>