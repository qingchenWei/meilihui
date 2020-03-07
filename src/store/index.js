import Vue from 'vue'
import Vuex from 'vuex'
import productdetail from "./module/productdetailModule";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isTabshow: true,
    currn:0
  },
  mutations: {
    show (state) {
      state.isTabshow = true
    },
    hide (state) {
      state.isTabshow = false
    }
  },
  actions: {
  },
  modules: {
    productdetail,
  }
})