var utils = require('../../../../build/utils');
let path = require('path')

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

exports.killPort = utils.killPort;
