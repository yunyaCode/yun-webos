const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');
const webpackDevServer = require('webpack-dev-server');

const utils = require('./utils');

// utils.delDir('../dist');

utils.killPort(webpackConfig.devServer.port)


const compiler = webpack(webpackConfig)

const devServer = new webpackDevServer(compiler, webpackConfig.devServer)

devServer.listen(webpackConfig.devServer.port)
