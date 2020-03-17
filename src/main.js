// 在webpack中使用vue
// 使用 import Vue from 'vue' 导入的函数, 功能不完整, 只提供了runtime-only的方式, 并没提供
// 像网页中vue那样的使用方式
import Vue from 'vue'
import App from './App.vue' //默认, webpack无法打包.vue文件, 需要相关loader
import router from './router'
import vuetify from './plugins/vuetify'

// Vue.use(Vuetify);
const vm = new Vue({
  vuetify,
  router,
  el: '#app',
  components: {App},
  template: '<App/>'
})