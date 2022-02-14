const path = require('path');
const utils = require('./utils');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin"); //资源拷贝插件


let isProduction = process.env.NODE_ENV === 'production'

console.log('@yunyaOS===', utils.resolve('@yunyaOS/src'))

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: utils.assetsPath('js/[name].[hash:7].js'),
    chunkFilename: utils.assetsPath('js/chunks/[name].[contenthash:7].js')
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@yunyaOS': utils.resolve('@yunyaOS/src'),
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
    //深度拷贝【将静态资源拷贝到编译目录下】
    new CopyWebpackPlugin([{
      from: resolve("static"),
      to: utils.assetsPath(''),
      ignore: [".*"]
    }]),

    // new webpack.BannerPlugin("⌚author: yunya"), // 会将这段内容插入到打包后的js文件最前面
  ]
};
