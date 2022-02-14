import {
  init as xinyaInit
} from '@yunyaOS';

//初始化宿主应用【默认为桌面应用】
xinyaInit({
  container: 'app_desktop',
  name: 'desktop',
  entry: 'http://127.0.0.1:8100/static/js/main.js',
  entryCss: 'http://127.0.0.17:8100/static/css/main.css',
  entryApp: 'http://127.0.0.1:8100',
  mount: true, //宿主应用直接挂载
  canDestroy: false //宿主应用是无法删除的
})
