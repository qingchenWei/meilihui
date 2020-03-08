<template>
    <div class="good">
        <ul>
            <li v-for="item in data" :key="item.eventId" @click="handleClick(item.eventId)">
                <img :src="item.imageUrl">
                <div class="lay">
                    <p>{{item.englishName}}</p>
                    <p>{{item.chineseName}}</p>
                    <p>{{item.discountText}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:["data"],
    methods: {
        handleClick(id){
            this.$router.push('/productlist/' + id)
        }
    },
}
</script>
<style lang="scss" scope>
*{margin: 0;padding: 0}
.good{
    ul{
        li{
            position: relative;
            margin-top: 10px;
            img{
                width: 92%;
                height: 207px;
            }
            div{
                position: absolute;
                left: 30px;
                bottom: 20px;
                color: rgb(255, 255, 255);
                text-align: left;
            }
        }
    }
}
</style>