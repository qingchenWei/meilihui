<template>
    <div class="good">
        <ul>
            <li v-for="item in data" :key="item.eventId">
                <img :src="item.imageUrl">
                <div>
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
}
</script>
<style lang="scss">
*{margin: 0;padding: 0}
.good{
    ul{
        li{
            position: relative;
            margin-top: 10px;
            img{
                width: 345px;
                height: 207px;
            }
            div{
                position: absolute;
                left: 30px;
                bottom: 20px;
                color: white;
                text-align: left
            }
        }
    }
}
</style>