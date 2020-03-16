const path = require('path') // path模块, 用于处理文件路径和目录路径的实用工具
//启动热更新第二步
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')


// 入口 entry 出口output
module.exports = {
  entry: path.join(__dirname, './src/main.js'),//入口, 使用webpack要打包哪个文件
  // __dirname表示绝对路径
  output: { // 输出文件相关配置
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js' // 指定输出文件的名称web
  },
  //dev server可以以配置文件的形式出现
  devServer: { // 这是配置dev-server 
    open: true, //自动打开浏览器
    port: 8081, 
    contentBase: 'src', //指定托管的根目录
    hot: true //启用热更新
  },
  plugins: [ // 插件, 除了exports, 所有带s的都是数组
    new webpack.HotModuleReplacementPlugin(), //这是一个构造函数
    new htmlWebpackPlugin({ // 创建一个在内存中生成html页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定模板页面,
      filename: 'index.html'//指定生成页面的名称
    }),
    new VueLoaderPlugin()
  ],
  module: { // 配置所有第三方loader模块
    rules: [
      {
        test: /\.css$/,
        use: [ 'vue-style-loader','style-loader', 'css-loader' ]
      },
      {      
        test: /\.m?js$/, //正则表达式
        exclude: /(node_modules)/, //必须将node_modules排除掉, 否则非常消耗cpu, 也会慢
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test:/\.vue$/, use: 'vue-loader' 
      }
    ] //第三方模块的匹配规则
  },
  resolve: {
    alias: { // 修改vue被导入时候的包的路径
      "vue$": "vue/dist/vue.js"
    }
  },

}