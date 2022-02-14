import {
  isBoolean,
  isFunction
} from '../utils/shared';
import { importEntry, ImportEntryOpts } from 'import-html-entry';
import SYMBOLKEYS from '../utils/Symbol';

import { createM } from '../layout/M';

import { $XINYAOS } from '../dom';

import { AppConfig, AppConfig as Config, RenderApp } from '../interfaces'

import { ruleStyle } from '../sandbox/css';

import { createElement } from '../sandbox/loader';

type nameKey = { name: string };

// type style = {
//   url: string,
//   code: string,
//   parent: app
// };

// type styleList = Set<style>;
// type styletStrack = Map<any, styleList>;

let targetMap = new WeakMap<nameKey, app>();
// let styleMap = new WeakMap<nameKey, styletStrack>();

let styleMap = new Map();

const namespaceMap = {};

export const nameKeyMap = {};

//注册子应用
let namespace = null;

//获取应用模块
function getModule(name: string) {
  console.log('getModule....', name, window[namespace])
  return namespaceMap[name] //window[namespace][name];
}

//设置应用模块
function defineModule(name: string, exports: object) {
  // window[namespace][name] = exports;
  namespaceMap[name] = exports
}

//加载应用模块
function loadModule(currentConfig: Config, call: Function) {

  const {
    name,
    entry,
    entryCss,
    container
  } = currentConfig;

  if (getModule(name)) {

    call(getModule(name))

    return;

  }

  let addJs = (src) => {

    const scriptEle = document.createElement('script');
    scriptEle.src = src;

    scriptEle.onload = (r) => {
      const module = getModule(name);
      if (!module) return
      call(module)
    };

    document.body.appendChild(scriptEle);

  }



  let addCss = (href: string) => {


    fetch(href, {
      method: 'GET',
      'mode': 'cors'
    })
      .then(function (response) {
        //open  -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir  /Users/apple/Documents/ChormConfig
        return response.text();
      })
      .then(function (data) {

        let containerCss = ruleStyle(data, `#${container}`)
        let style = document.createElement('style');
        style.innerHTML = containerCss;
        style.setAttribute('data-url', href);
        style.setAttribute('id', `style_${href}`);
        document.head.appendChild(style);
      });

    return
    const cssEle = document.createElement('link');
    cssEle.rel = 'stylesheet';
    cssEle.href = href;

    document.head.appendChild(cssEle);
  }

  if (entryCss) addCss(entryCss);

  addJs(entry);



}

//初始化模块命名空间
function initNamespace(space: symbol) {

  namespace = space || SYMBOLKEYS.__XINYAOSNAMESPACE__;

  window['defineModule'] = defineModule;

}

//创建app
function createApp(config: Config, call: Function) { return new app(config, null, call) }
//获取app
function getApp(key: string) { return targetMap.get(nameKeyMap[key]); }

export class app {

  readonly APPKEY: nameKey;//应用的唯一标志
  readonly isRoot: boolean = false;//是否容器应用
  readonly config: AppConfig; //应用配置
  readonly canDestroy: boolean;//是否可以销毁

  private app: RenderApp;//渲染后的应用实例
  private mounted: boolean;//是否已经挂载

  public _app: { render: Function };//未渲染的应用实例
  public parentDom: JQuery<HTMLElement>;//应用容器父级节点
  public isDestroy: boolean;//是否已经销毁
  public dom: JQuery<HTMLElement>;//当前应用节点

  constructor(config: Config, _namespace: symbol, call: Function) {

    if (!this.APPKEY && config.name) {
      this.APPKEY = { name: config.name }
      nameKeyMap[config.name] = this.APPKEY;
    }

    if (_namespace && !namespace) {
      //标志核心应用
      this.isRoot = true;
      initNamespace(_namespace);
    }

    this.config = config;

    this.canDestroy = isBoolean(config.canDestroy) ? config.canDestroy : true

    this.set(config, call);

    return this;
  }


  get() { return targetMap.get(this.APPKEY); }

  private set(config: AppConfig, call: Function) {

    let {
      canDestroy,
      container,
      name,
      entry,
      mount,
      entryApp
    } = config;

    if (entry && name && container) {

      loadModule(config, (app: any) => {

        this._app = app;
        this.mount = this.mount;
        this.destroy = this.destroy;

        targetMap.set(this.APPKEY, this)

        if (isBoolean(mount) && mount) {
          this.mount();
        }

        if (isFunction(call)) call(this);

        console.log('【loadModule======】', this)
      })
    }

  }

  mount() {

    console.log('【app.mount】domID=', this)
    if (!this.config) {

      console.error('【app.mount】无效挂载！')

      return this
    };

    if (this.mounted) {

      console.warn('【app.mount】已经挂载！')

      return this
    };


    let domID = this.config.container;


    if (!this.config.container) {

      console.error('【无有效容器标志】config=', this.config);

      return
    }

    let domMainID = `${this.config.container}_main`










    let initialAppWrapperElement: HTMLElement | null = createElement(
      `<div id="${domMainID}"><div>测试</div></div>`,
      true,
      this.config.name,
    );

    console.log('initialAppWrapperElement==', initialAppWrapperElement)

    if (document.querySelector(`#${domID}`)) {
      let dom = $(`#${domID}`);
      dom.html(initialAppWrapperElement)
    } else {
      $XINYAOS.append(`<div id="${domID}">${initialAppWrapperElement}</div<>`)
    }




    // if (document.querySelector(`#${domID}`)) {
    //   let dom = $(`#${domID}`);
    //   dom.html(`<div id="${domMainID}"></div<>`)
    // } else {
    //   $XINYAOS.append(`<div id="${domID}"><div id="${domMainID}"></div<></div<>`)
    // }


    this.parentDom = $(`#${domID}`);
    this.dom = $(`#${domMainID}`);
    this.mounted = true;
    this.isDestroy = false;
    // let app = this._app.render(document.getElementById(domMainID).shadowRoot.querySelector('div'))
    let app = this._app.render(document.getElementById(domMainID))
    app.$XINYAOS = {
      app: this,
      createM,
    };

    if (this.isRoot) {
      app.$XINYAOS.createApp = createApp
      app.$XINYAOS.getApp = getApp
    }

    this.app = app


    return this
  }

  destroy() {

    console.log(`【destroy======】`, this, targetMap, nameKeyMap)

    if (!this.mounted) return this;

    if (!this.canDestroy) {

      console.error('该应用不允许删除')

      return
    }

    this.mounted = false;
    this.isDestroy = true;

    delete this.dom;
    delete this.parentDom;

  }
}


export function init(config: Config, call: Function) {

  if (namespace) {

    //宿主应用已经存在，无法二次创建
    console.error('【@xinya-init】宿主应用已经存在，无法二次创建')
    return
  }

  return new app(config, Symbol('namespace'), call);

}



