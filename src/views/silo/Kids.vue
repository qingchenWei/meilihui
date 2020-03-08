<template>
  <div>
    <topimg :data="bannerData" @goBrand="clickbrand">
      <p class="myslot">{{bannerData.description}}</p>
    </topimg>
    <ul class="mynav">
      <li v-for="(item,index) in navData" :key="index" @click="handleClick(item)">
        <img :src="item.categoryImgStr" alt />
        <p>{{item.name}}</p>
      </li>
    </ul>
    <goodslist :data="datalist"></goodslist>
  </div>
</template>
<script>
import goodslist from "@/components/GoodsList";
import topimg from "@/components/TopImg";
import axios from "axios";
export default {
  data() {
    return {
      datalist: [],
      bannerData: [],
      navData: [],
      navDatalist: []
    };
  },
  components: {
    goodslist,
    topimg
  },
  mounted() {
    axios
      .get(
        "http://www.mei.com/appapi/silo/eventForH5?categoryId=kids&pageIndex=1&timestamp=1583385363277&summary=a85695038abb416be4db66c22b70bdc8&platform_code=H5"
      )
      .then(res => {
        this.datalist = res.data.eventList;
      });

    axios
      .get(
        "http://www.mei.com/appapi/home/mktBannerApp/v3?silo_id=2013000100000000005&platform_code=PLATEFORM_H5"
      )
      .then(res => {
        this.bannerData = res.data.banners[0];
      });

    axios
      .get(
        "http://www.mei.com/appapi/cms/cmsDetail/v3?silo=2013000100000000005&ids=2120000100000000146&timestamp=1583385363563&summary=526421f761c2a012aafcc07067c03352&platform_code=H5"
      )
      .then(res => {
        this.navData = res.data.resultList[0].data;
      });
  },
  methods: {
    clickbrand() {
      this.$router.push(`/brand/${this.bannerData.link_url.slice(25)}`);
    },
    handleClick(data) {
      this.$router.push({
        path: "/productlist/",
        query: {
          categoryOneId: data.categoryOneId,
          categroyTwoName: data.categroyTwoName,
          siloId: data.siloId,
          thirdCategories: encodeURIComponent(data.categroyTwoName)
        }
      });
    }
  }
};
</script>
<style lang="scss" scope>
div {
  .mynav {
    margin-top: 10px;
    display: flex;
    li {
      flex: 1;
      img {
        width: 61px;
        height: 82px;
      }
    }
  }
}
</style>