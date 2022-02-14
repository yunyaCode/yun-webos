process.env.NODE_ENV = 'development'
const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.conf');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('./plugins/CleanWebpackPlugin');
const addCssUtf8WebpackPlugin = require('./plugins/AddCssUtf8WebpackPlugin');
const utils = require('./utils');
const path = require('path');

console.log('>')

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/',
  },
  devServer: {
    port: 8100,
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
    rules: [

      {
        test: /\.(css|scss)$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }

      // {
      // test: /\.(css|scss)$/,
      // use: [MiniCssExtractPlugin.loader, 'css-loader', {
      //   loader: 'postcss-loader',
      //   options: {
      //     plugins: [
      //       require('postcss-import')(),
      //       require('autoprefixer')()
      //     ]
      //   }
      // }, 'sass-loader'],
      // },

    ]
  },
  plugins: [
    //定义全局常量【一般用于环境判断】
    new webpack.DefinePlugin({
      'process.env': 'development'
    }),

    new CleanWebpackPlugin(),
    new addCssUtf8WebpackPlugin(),
    // 抽离css到公共文件中
    // new MiniCssExtractPlugin({
    //   filename: utils.assetsPath('css/[name].css'),
    //   chunkFilename: utils.assetsPath('css/chunks/[name].[contenthash:7].chunk.css'),
    //   ignoreOrder: true
    // }),
  ]

});
