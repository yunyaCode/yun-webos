const utils = require('./utils');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); //资源拷贝插件

let isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/chunks/[name].[contenthash:7].js')
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@src': utils.resolve('src'),
      '@src-components': utils.resolve('src/components'),
      '@root': utils.resolve('../'),
    },
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          utils.resolve('src'),
        ]
      },
    ],
  },
  plugins: [
    //核心入口文件
    new HtmlWebpackPlugin({
      filename: `index.html`,
      template: 'index.html',
      inject: true,
      hash: false,
      // favicon: 'favicon.ico'
    }),


    new VueLoaderPlugin(),

    //深度拷贝【将静态资源拷贝到编译目录下】
    new CopyWebpackPlugin([{
      from: utils.resolve("static"),
      to: 'static',
      ignore: [".*"]
    }]),

  ]
};
