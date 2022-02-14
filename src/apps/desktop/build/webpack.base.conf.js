const utils = require('./utils');
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); //资源拷贝插件
// const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-tags-plugin');


let isProduction = process.env.NODE_ENV === 'production'

console.log('@====', utils.resolve('src/static/scss'), '\n')
module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/chunks/[name].[contenthash:7].js')
    // jsonpFunction:'wpJsonpEdu'
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@src': utils.resolve('src'),
      '@src-components': utils.resolve('src/components'),
      '@scss': utils.resolve('src/static/scss'),
      '@root': utils.resolve('../../../'),
      '@root-scss': utils.resolve('../../../apc-ui/scss'),
      '@root-apc-ui-svg': utils.resolve('../../../apc-ui/svg/index'),
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
    // new webpack.IgnorePlugin(/\.\/local/, /jQuery/),
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
