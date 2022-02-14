const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf');
const webpackDevServer = require('webpack-dev-server');

const utils = require('./utils');

utils.killPort(webpackConfig.devServer.port)


new webpackDevServer(webpack(webpackConfig), webpackConfig.devServer).listen(webpackConfig.devServer.port)

const isAll = process.argv.includes('all');

if (isAll) {
  initAllApp();
}


function initAllApp() {

  var fs = require('fs')
  const shell = require('shelljs');
  let chalk = require('chalk')

  let appsPath = utils.resolve('/src/apps');

  shell.cd(appsPath);

  let appFiles = [];

  shell.ls('').forEach(function (file) {

    appFiles.push(`${appsPath}/${file}`);

    console.log(chalk.cyan('\n.发现应用:', `${appsPath}/${file}`))

  })

  function runApp(file) {

    console.log('\n.runApp.file====', file)
    if (!file) return;

    console.log('\n')
    if (!fs.existsSync(file)) {
      console.log("【runApp】对应文件不存在");
      return
    }
    shell.cd(file);

    shell.exec(`npm run dev`, function (code, stdout, stderr) {

    });

  }

  appFiles.map(file => {
    runApp(file)
  })

}
