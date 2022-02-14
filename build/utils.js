let path = require('path')
let fs = require('fs')
let shell = require('shelljs');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = 'static'
  return path.posix.join(assetsSubDirectory, _path)
}

exports.getRootDir = function () {
  return `v_${new Date().getFullYear()}_${new Date().getMonth() + 1}_${new Date().getDate()}_${new Date().getHours()}`;
}

exports.resolve = function (_path) {
  return path.join(__dirname, '..', _path);
}

exports.killPort = function (port) {

  var order = `lsof -i :${port}`;
  shell.exec(order, function (err, stdout, stderr) {
    if (err) {
      return console.log(err);
    }
    stdout.split('\n').filter(function (line) {
      var p = line.trim().split(/\s+/);
      var address = p[1];
      if (address != undefined && address != "PID") {
        shell.exec('kill ' + address, function (err, stdout, stderr) {
          console.log('\n');
          if (err) {
            return console.log('释放指定端口失败！！');
          }
          console.log('占用指定端口的程序被成功杀掉！');
        });
      }
    });
  });
}
