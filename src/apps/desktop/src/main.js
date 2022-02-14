// import app from './index';

// alert(2)
// console.log(app.render)

// app.render('#app');
import Vue from 'vue';

import App from './app.vue'

// let app = createApp(App);

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

let app = null;

const render = (root) => {
  // app.mount(root);
  return new Vue({
    el: root,
    _f: function name(params) {

    },
    render: h => h(App),

  });

}



window.defineModule && window.defineModule('desktop', {
  render,
});




if (document.querySelector('#desktop')) {


  let app = render('#desktop')


  app.$WEBOS = {
    createApp: function (config, call) {

      if (window.defineModule) {

        return this.createApp;

      }

      if (typeof call === 'function') {
        call(config);
      }

      if (!this._createApp_config) {
        this._createApp_config = config;
      }

      return {
        mount: () => {
          console.warn('没有容器加载该应用,将会通过新开窗口形式打开')
          window.open(this._createApp_config.entryApp)
          return this._createApp_config
        }
      }
    }
  }
}
