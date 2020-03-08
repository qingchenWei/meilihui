<template>
  <div id="app">
    <tab v-show="isTabshow"  v-indextitle="60"></tab>
    <router-view></router-view>
  </div>
</template>
<script>
import tab from '@/components/Tab'
import { mapState,mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['isTabshow'])
  },
  components:{
        tab
  },
  methods:{
    ...mapMutations(['show'])
  },
  mounted(){
    this.show()
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

