import Vue from 'vue';
import App from './app.vue';

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

const render = (root) => {

  return new Vue({
    el: root,
    render: h => h(App),
  });

}


if (window.defineModule) {
  window.defineModule('live', {
    render,
  })
} else {
  render('#main');
}
