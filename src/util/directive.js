import Vue from 'vue'
// Vue.directive('title', {
//   inserted (el, bind) {
//     window.onscroll = () => {
//       if ((document.documentElement.scrollTop || document.body.scrollTop) > bind.value) {
//         el.style.display = 'none'
//       } else {
//         el.style.display = 'block'
//       }
//     }
//   },
//   unbind () {
//     window.onscroll = null
//   }
// })

Vue.directive('indextitle', {
  inserted (el, bind) {
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > bind.value) {
        el.style.background = 'white'
        el.style.color="black"
        el.children[0].children[1].style.background="rgba(0,0,0,.1)";
      } else {
        el.style.background = 'rgba(0,0,0,0)'
        el.style.color="white"
      }
    }
  },
  unbind () {
    window.onscroll = null
  }
})
