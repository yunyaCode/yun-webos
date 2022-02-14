let path = require('path')
let fs = require('fs')
let chalk = require('chalk')

let _path = '',
  file = 'dist';


function delDir(_file) {

  _path = path.join(__dirname, '../../', _file);


  console.log('【delDir】dirUrl =', _file, _path)

  /**
   * 判断文件是否存在
   */
  if (!fs.existsSync(_path)) {
    console.log("对应文件不存在");
    return
  }

  /**
   * 判断文件是否在允许删除内
   */
  let canDelDELDir = ['/dist']
  let canDel = false;
  canDelDELDir.forEach(ex => {
    if (_path.includes(ex)) {
      canDel = true
    }
  })
  if (!canDel) {
    console.log('文件被保护不能删除')
    return
  }

  /**
   * 判断环境是否被允许
   */
  if (process.env.NODE_ENV !== 'development') {
    console.log('只能开发环境删除,process.env.NODE_ENV =', process.env.NODE_ENV)
    return
  }

  let dirNum = 0;
  let fileNum = 0;

  (_delDir = url => {
    fs.readdirSync(url).forEach(file => {
      let curPath = path.join(url, file);
      if (fs.statSync(curPath).isDirectory()) {
        dirNum++;
        _delDir(curPath);
      } else {
        fileNum++;
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(url);
  })(_path)
  console.log(chalk.cyan(` 删除文件夹:${dirNum}个.\n 删除文件:${fileNum}个 \n`))
}


module.exports = class CleanWebpackPlugin {
  constructor(_file = 'dist') {

    console.log('CleanWebpackPlugin.【delDir】dirUrl constructor=', _file)

    file = _file;
  }

  apply(compiler) {

    compiler.plugin('emit', function (compilation, callback) {

      delDir(file);

      callback();
    })
  }
}
