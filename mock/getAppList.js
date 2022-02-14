export default [{
    container: 'app_M_live',
    name: 'live', //不能随便改，需要跟真实应用名称一样
    entry: 'http://127.0.0.1:8200/static/js/main.js',
    entryCss: 'http://127.0.0.1:8200/static/css/main.css',
    entryApp: 'http://127.0.0.1:8200',
  },
  {
    container: 'app_M_video',
    name: 'video', //不能随便改，需要跟真实应用名称一样
    entry: 'http://127.0.0.1:8300/static/js/main.js',
    entryCss: 'http://127.0.0.1:8300/static/css/main.css',
    entryApp: 'http://127.0.0.1:8300',
  }
]
