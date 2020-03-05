<template>
  <div class="box">
    <div class="detailtitle" v-title="100">
      <i class="iconfont icon-back btn" @click="handleClick()"></i>
      <span>{{datalist.eventName || datalist.categroyTwoName}}</span>
      <i class="iconfont icon-category more" @click="moreClick()"></i>
        <ul class="morelist" v-if="isShow">
            <router-link v-for="item in moreArr" :key="item.name" tag="li" :to="item.path">{{item.name}}</router-link>
        </ul>
      <ul class="toplist">
        <li
          v-for="(item,index) in topArr"
          :key="item"
          @click="showClick(index)"
          :class="now===index?'active':''"
        >{{item}}</li>
      </ul>
    </div>
    <div class="content" :style="{height:scrollHeight}">
      <ul class="goodslist">
        <li
          v-for="data in datalist.products"
          :key="data.productId"
          style="width:50%;float:left;list-style:none;heigth:315px;"
        >
          <div style="padding:10px;">
            <img style="display:block;width:165px;heigth:220px;" :src="data.imageUrl" alt />
            <!-- <span style="border:1px solid black;font-size:16px;margin-left:-100px;" v-if="data.tagListDto">{{data.tagListDto[1].tag}}</span>
            <span v-else style="border:1px solid white;color:white;" >1111</span>-->
            <h3
              style="text-align:left;font:600 16px/1 '';white-space: nowrap;text-overflow: ellipsis;overflow: hidden;"
              v-if="data.brandName"
            >{{data.brandName}}</h3>
            <h3 v-else style="color:white">111</h3>
            <p
              style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font:600 16px/20px '';"
            >{{data.productName}}</p>
            <span style="color:red;font:600 16px/20px '';margin-left:-20px;">￥{{data.price}}</span>
            <span
              style="text-decoration:line-through;font:600 16px/20px '';margin-left:10px;"
            >￥{{data.marketPrice}}</span>
            <span style="color:#333;font:600 14px/18px '';margin-left:10px;">{{data.discount}}折</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import vue from "vue";
import { Toast } from "vant";
import "vant/lib/index.css";
import BetterScroll from "better-scroll";
vue.use(Toast);
vue.directive("title", {
  inserted(el, bind) {
    window.onscroll = () => {
      if (
        (document.documentElement.scrollTop || document.body.scrollTop) >
        bind.value
      ) {
        el.style.display = "none";
        console.log(el.className);
      } else {
        el.style.display = "block";
      }
    };
  },
  unbind() {
    window.onscroll = null;
  }
});
export default {
  data() {
    return {
      datalist: [],
      topArr: ["人气", "折扣", "价格"],
      moreArr:[{name:"首页",path:"/index"},{name:"购物袋",path:"/cart"},{name:"个人中心",path:"/center"}],
      now: 0,
      myindex: 0,
      scrollHeight: "0px",
      isShow:false
    };
  },
  beforeMount() {
    Toast.loading({
      mask: true,
      message: "加载中..."
    });
  },
  mounted() {
    if (this.$route.query.siloId) {
      axios
        .get(
          `http://www.mei.com/appapi/secondcategory/search/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=${this.$route.query.categoryOneId}&siloId=${this.$route.query.siloId}&thirdCategories=${this.$route.query.thirdCategories}&key=&sort=&timestamp=1583390744750&summary=6363753a2fbe614816d69e2030d97b4e&platform_code=H5`
        )
        .then(res => {
          this.datalist = res.data;
          this.datalist.categroyTwoName = this.$route.query.categroyTwoName;
          Toast.clear();
        });
    } else {
      axios
        .get(
          `http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1583347289449&summary=d8505c94658d53cfbba6daae46368abd&platform_code=H5`
        )
        .then(res => {
          this.datalist = res.data;
          Toast.clear();
        });
    }

    // this.scrollHeight = document.documentElement.clientHeight - 80 + 'px'
    //  new BetterScroll('.content', {
    //     scrollbar: {
    //     fade: true,
    //     interactive: false
    // },
    //     click: true
    // })
  },
  methods: {
    moreClick() {   
        this.isShow=!this.isShow
    },
    handleClick() {
      this.$router.back();
    },
    showClick(data) {
      if (data == 1) {
        if (!this.$route.query.siloId) {
          axios
            .get(
              `http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=1&sort=ASC&timestamp=1583354967282&summary=ea6a830066155e77de2343e86739dcbb&platform_code=H5`
            )
            .then(res => {
              this.datalist = res.data;
              this.now = 1;
              console.log(this.datalist);
              Toast.clear();
            });
        } else {
          axios
            .get(
              `http://www.mei.com/appapi/secondcategory/search/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=${this.$route.query.categoryOneId}&siloId=${this.$route.query.siloId}&thirdCategories=${this.$route.query.thirdCategories}&key=1&sort=ASC&timestamp=1583394746711&summary=04e0e24ce216f493a21a5f169438de64&platform_code=H5`
            )
            .then(res => {
              this.datalist = res.data;
              this.datalist.categroyTwoName = this.$route.query.categroyTwoName;
              console.log(this.datalist);
              this.now = 1;
              Toast.clear();
            });
        }
      } else if (data == 0) {
        console.log("111");
        if (!this.$route.query.siloId) {
          axios
            .get(
              `http://www.mei.com/appapi/event/product/v3?pageIndex=1&categoryId=${this.$route.params.id}&key=&sort=&timestamp=1583347289449&summary=d8505c94658d53cfbba6daae46368abd&platform_code=H5`
            )
            .then(res => {
              this.datalist = res.data;
              this.now = 0;
              console.log(this.datalist);
              Toast.clear();
            });
        } else {
          axios
            .get(
              `http://www.mei.com/appapi/secondcategory/search/v3?brandNames=&chineseCodes=&pageIndex=1&categoryId=${this.$route.query.categoryOneId}&siloId=${this.$route.query.siloId}&thirdCategories=${this.$route.query.thirdCategories}&key=&sort=&timestamp=1583395299154&summary=88dea33f0977277eca43a054c4e04a35&platform_code=H5`
            )
            .then(res => {
              this.datalist = res.data;
              this.datalist.categroyTwoName = this.$route.query.categroyTwoName;
              this.now = 0;
              Toast.clear();
            });
        }
      } else {
        if (this.myindex) {
          this.datalist.products.sort((a, b) => a.price - b.price);
          this.myindex = 0;
        } else {
          this.datalist.products.sort((a, b) => b.price - a.price);
          this.myindex = 1;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.active {
  color: red;
}
.detailtitle {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: white;
  .btn{
    position: absolute;
    left: 0px;
    top: 0px;
    font: 600 30px "";
    margin-top: 5px;
  }
  .more {
    position: fixed;
    width: 40px;
    right: 0;
    top: 0px;
    font: 600 25px "";
    margin-top: 5px;
  }
  span {
    font: 600 16px/2 "";
  }
  .toplist {
    display: flex;
    background: white;
    li {
      flex: 1;
      list-style: none;
    }
  }
}
.btn {
  width: 40px;
  height: 40px;
  position: fixed;
  top: 10px;
  left: 10px;
}

.goodslist {
  margin-top: 50px;
}
.morelist{
    border: 1px solid rgb(224, 222, 222);
    height: 150px;
    width: 120px;
    background: rgb(245,245,245);
    position: fixed;
    top: 40px;
    right: 0;
    z-index: 100;
    li{
        height: 50px;
    }
}
</style>
