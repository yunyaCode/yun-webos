module.exports = class addCssUtf8WebpackPlugin {
  constructor() {

  }

  apply(compiler) {

    compiler.plugin('emit', function (compilation, callback) {

      console.log(`\n****css-UTF-8-webpack-plugin****`);
      compilation.chunks.map(chunk => {
        chunk.files.map(filename => {
          let _value = compilation.assets[filename]._value
          if (filename.includes('.css')) {
            console.log('set-charsetUTF-8_css：', filename);


            // let csss=_value.split('')

            compilation.assets[filename]._value = `@charset "utf-8";${_value}`;


          } else {
            compilation.assets[filename]._value = _value
          }
        })
      })
      console.log(`\n****css-UTF-8-webpack-plugin end****\n`);
      callback();
    })
  }
}
