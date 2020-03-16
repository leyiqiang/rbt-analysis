// 在webpack中使用vue
// 使用 import Vue from 'vue' 导入的函数, 功能不完整, 只提供了runtime-only的方式, 并没提供
// 像网页中vue那样的使用方式
import Vue from 'vue'
import App from './App.vue' //默认, webpack无法打包.vue文件, 需要相关loader
// cnpm i vue-loader vue-template-compiler -D

// 包的查找规则: 
// 1. 找node_modules
// 2. 在node_modules中根据包名, 找对应的vue文件夹
// 3. 在vue文件夹中, 找包配置文件package.json
// 4. 在package.json文件中查找main属性 (main指定了该包被加载后, 包的入口文件)
// vue的node_modules里的main: dist/vue.runtime.common.js, 
// 我们import的Vue就是这个文件module.export的对象, 然而我们需要vue.js
//方法一 import Vue from '../node_modules/vue/dist/vue.js'
// 方法二: 在webpack config里加一个resolve解决该方法

const vm = new Vue({
  el: '#app',
  components: {App},
  template: '<App/>'
})

console.log('hello from console')


// webpack中怎么使用vue:
// 1. 安装vue包
// 2. 在webpack中, 推荐使用.vue这个组件模板文件定义组件, 所以我们需要安装
//   能解析这种文件的loader vue-loader 和vue-template-compiler
// 3. 在main.js中导入vue模块, improt Vue from  'vue'
// 4. 定义一个.vue结尾的组件, 其中, 组件有三个部分: template, script, style
// 5. 使用import 导入这个组件
// 6. 创建vm的实例 var vm = new Vue({el: '#app', render:})