process.env.NODE_ENV = 'development'
const utils = require('./utils');
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.conf');
const CleanWebpackPlugin = require('./plugins/CleanWebpackPlugin');

// const config = require('../config');
const path = require('path');
// console.log('> devServer.target>>>>>', config.dev.proxyTable["/edu"].target)
console.log('>')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 8300,
    progress: false, // 显示打包的进度条
    contentBase: path.join(__dirname, '../dist'), // 根目录
    host: "127.0.0.1",
    inline: true,
    open: false, // 自动打开浏览器
    hot: true, //热替换
    compress: true, // 启动 gzip 压缩
    proxy: {

    }, //配置跨域服务代理
    writeToDisk: true, //是否写入磁盘
    useLocalIp: true, //是否使用本地ip
    disableHostCheck: true
  },
  module: {
    rules: [{
      test: /\.(css|scss)$/,
      use: ['css-loader', 'postcss-loader', 'sass-loader']
    }]
  },
  plugins: [
    //定义全局常量【一般用于环境判断】
    new webpack.DefinePlugin({
      'process.env': 'development'
    }),
    new CleanWebpackPlugin()

  ]
});
