import {
  isBoolean,
  isObject,
  isNumber,
  isString,
  isSymbol,
  isFunction,
  getClientInfo,
  rnd
} from '../utils/shared'

import MOVE from '../utils/move';

import {
  $XINYAOS,
  $XINYAOS_MINAPPS
} from '../dom';

import { mAppTrack } from '../app/mAppTrack';


import __WEBOS_KEY from '../utils/Symbol'

const __WEBOS_KEY__MINIAPPS__ = __WEBOS_KEY.__MINAPPS__;
const __WEBOS_KEY__MAPPS__ = __WEBOS_KEY.__MAPPS__;
const __WEBOS_KEY__MAXAPPS__ = __WEBOS_KEY.__MAXAPPS__;

window[__WEBOS_KEY__MAPPS__] = {};
window[__WEBOS_KEY__MINIAPPS__] = [];
window[__WEBOS_KEY__MAXAPPS__] = [];

const KEY_B = 'B',
  KEY_BH = 'BH',
  KEY_MIN = 'min',
  KEY_MAX = 'max',
  KEY_CLOSE = 'close',
  KEY_BTN_MIN = 'btn-min',
  KEY_BTN_MAX = 'btn-max',
  KEY_BTN_CLOSE = 'btn-close',
  KEY_MOVE_KEY = 'move-drop',
  KEY_MMAPS = 'mMaps';

import { MConfig, MApp, MAppTrack as MAppTrackConfig } from '../interfaces'

import { app as App } from '../app'

class M {

  readonly opinion: MConfig;
  readonly id: string;
  readonly name: string;
  readonly parentApp: App;
  readonly mAppTrack: MAppTrackConfig;

  private APP: App;

  mApp: MApp;
  mDom: JQuery<HTMLElement>;
  _mDom: JQuery<HTMLElement>;
  box: JQuery<HTMLElement>;
  app_window: any;

  private $miniDom: JQuery<HTMLElement>;

  __MAPP_Z_Index_: number;
  __MAPPS_MAX_Z_Index_: number;
  __MAPPS__ID_: string;

  constructor(option: MConfig, parentApp: App) {

    let _option = {
      id: `m_${new Date().getTime()}`,
      box: '',
    }

    this.opinion = Object.assign(_option, option)
    this.id = `M_${this.opinion.id}`;
    this.name = option.name;
    this.parentApp = parentApp;

    let mMaps = this.parentApp[KEY_MMAPS] || {};

    console.log('constructor......', parentApp, this, mMaps)
    if (mMaps[this.id]) {
      this.mApp = mMaps[this.id]
      this.box = this.mApp.box;
      this.mDom = this.mApp.mDom;
    } else {
      this.createM();
      this.mAppTrack = mAppTrack()
    }
  }

  //弹出模式【M】
  createM() {

    // this.mApp = null;

    const id = this.id;


    let mDom = $(`
    <div id='${id}' class="M oI ">
    <div class="B b1 action-drop">
    <div class="action-mini"></div>
    <div id='${id}_${KEY_MOVE_KEY}' class="pH ${KEY_BH} action-drop">
    <a class="fr btn btn-close">关闭</a>
    <a class="fr btn btn-max">最大</a>
    <a class="fr btn btn-min">最小</a>
  </div>
  <div id="app_${id}">
    <div class="P">
      <div class="C">
        <div class="U">
          <div class="L">${id}</div>
        </div>
      </div>
    </div>
    </div>
  </div>`)

    if (!mDom) {
      return
    }

    this.mDom = mDom;

    this.box = $(this.opinion.box);
  }




  show(APP: App, opinion: any) {


    console.log('0-------show.app=,', this, APP)


    if (!this.box || !this.mDom) return

    let initmApp = () => {

      this.mApp = {
        id: this.id,
        opinion: this.opinion,
        box: this.box,
        mDom: mDom,
        show: true,
        max: false,
        min: false,
        preMax: false,
        x: 0,
        y: 0,
      } as MApp;

    }


    //初始化窗口位置
    let initPos = (_x: number, _y: number) => {

      let $B = mDom.find(`.${KEY_B}`);

      // 初始化位置
      let x = getClientInfo(window.document).clientWidth;
      let y = getClientInfo(window.document).clientHeight;

      console.log('$B.....', $B, rnd(10, x), rnd(10, y))

      let pos = {
        left: Number(_x || `${rnd(x / 3, x / 3 * 2)}`), //后续可作为参数记录到数据库
        top: Number(_y || `${rnd(y / 3, y / 3 * 2)}`), //后续可作为参数记录到数据库
      }

      this.mApp.x = pos.left;
      this.mApp.y = pos.top;

      $B.css({
        left: `${pos.left}px`, //后续可作为参数记录到数据库
        top: `${pos.top}px`, //后续可作为参数记录到数据库
      })
    }

    // 初始化事件【最大，最小，关闭】
    let initEvent = () => {
      let $btn_min = mDom.find(`.${KEY_BH} .${KEY_BTN_MIN}`)
      let $btn_max = mDom.find(`.${KEY_BH} .${KEY_BTN_MAX}`)
      let $btn_close = mDom.find(`.${KEY_BH} .${KEY_BTN_CLOSE}`)
      let $actionMini = mDom.find(`.${KEY_B} .action-mini`)

      let M = this;
      $btn_min.off('click').on('click', function () {
        M.min()
      })
      $btn_max.off('click').on('click', function () {
        M.max()
      })

      $btn_close.off('click').on('click', function () {
        M.destroy()
      })

      $actionMini.off('click').on('click', function () {
        M.show(APP, null)
      })

      mDom.off('mousedown').on('mousedown', function () {
        M.mAppTrack.zIndex(M)
      })
    }

    //初始化推拽功能
    let initMove = () => {

      if (isBoolean(this.opinion && this.opinion.move)) {

        if (!this.opinion && this.opinion.move) return

      }

      if (this.mApp.max) return

      MOVE(mDom.find(`#${this.id}_${KEY_MOVE_KEY}`), mDom.find(`.${KEY_B}`), (data) => {
        this.mApp.x = data.left;
        this.mApp.y = data.top;
      });

    }

    //添加最小化应用代理
    let pushMinAppList = () => {

      let $miniDom = $(`<div class="m">${this.name}</div>`)

      $miniDom.off('click').on('click', () => {

        if (this.mApp) {
          let maxapps = window[__WEBOS_KEY__MAXAPPS__] || [];

          //关闭所有最大窗口
          if (maxapps.length > 0) {
            maxapps.map((max: M) => {
              max.min()
            })
          }
          this.show(APP, null)
        }

      })

      //添加最小化应用代理
      $XINYAOS_MINAPPS.append($miniDom)

      this.$miniDom = $miniDom;
    }

    let mDom = this.mDom;

    console.log('show-----', this)

    if (this.mApp) {

      if (this.mApp.show) {
        this.mAppTrack.zIndex(this)

        return;
      };

      this.mApp.max = this.mApp.preMax;
      this.mDom.find(`.${KEY_B}`).removeClass(KEY_MIN).addClass(this.mApp.max ? KEY_MAX : '')
        .css({
          opacity: '1!important'
        });
      this.mApp.show = true;
      this.mApp.min = false;
      this.mApp.mDom = this.mDom;
      initPos(this.mApp.x, this.mApp.y);

      this.mAppTrack.set(this);
      this.mAppTrack.zIndex(this)
      return
    }



    initmApp();
    initPos(opinion && opinion.x, opinion && opinion.y);
    initEvent();
    initMove();
    pushMinAppList();


    let mMaps = this.parentApp[KEY_MMAPS] || {};
    mMaps[this.id] = this.mApp;

    this.parentApp[KEY_MMAPS] = mMaps;

    // 挂载到页面中
    this.box.append(mDom)


    try {
      if (isObject(APP)) {
        //挂载真实应用
        APP.mount()

        this.APP = APP;
      }
    } catch (error) {

    }



    console.log('mApp==show==', this, window[__WEBOS_KEY__MAPPS__])

    //添加全局mapp栈中
    this.mAppTrack.set(this)

    //设置z-index
    this.mAppTrack.zIndex(this)

  }

  // 最大化
  max() {

    this.mApp.min = false;

    if (!this.mApp.max) {
      this.mApp.max = true;
      this.mDom.find(`.${KEY_B}`).removeClass(KEY_MIN).addClass(KEY_MAX)
    } else {
      this.mApp.preMax = false
      this.mApp.max = false;
      this.mDom.find(`.${KEY_B}`).removeClass(KEY_MIN).removeClass(KEY_MAX)
    }

    this.mAppTrack.set(this);

    // 打开新容器【有bug，vue相关多事件绑定完全不能用】
    // app_window().create(this);

  }
  // 最小化
  min() {

    if (!this.$miniDom) return
    if (this.mApp.max) {
      this.mApp.preMax = true
    }

    this.mApp.min = true;
    this.mApp.max = false;
    this.mApp.show = false;

    let domB = this.mDom.find(`.${KEY_B}`);
    domB.removeClass(KEY_MAX).addClass(KEY_MIN).css({
      left: `${this.$miniDom.offset().left}px`,
      top: `${this.$miniDom.offset().top}px`,
    });

    this.mAppTrack.set(this)

  }

  //关闭
  destroy() {

    if (!this.id) return;

    console.log('parentApp==destroy==1', this, this.mApp, this.parentApp)

    if (this.mDom) this.mDom.remove();
    if (this.$miniDom) this.$miniDom.remove();
    this.mAppTrack.del(this.mApp.id)

    delete this.parentApp[KEY_MMAPS][this.id];
    delete this.mApp;

    if (this.APP) {
      //卸载真实app
      this.APP.destroy();
      delete this.APP;
    }

    this.mAppTrack.miniDomC();

    console.log('parentApp==destroy==2', this.id, this.mApp, this.parentApp)

  }

}


function createM(option: MConfig) {

  let mApp = this[KEY_MMAPS] && this[KEY_MMAPS][`M_${option.id}`];

  console.log('createM-------', mApp, option, this, window[__WEBOS_KEY__MAPPS__])

  if (mApp && mApp.__MAPPS__ID_) {
    return window[__WEBOS_KEY__MAPPS__][mApp.__MAPPS__ID_]
  }

  return new M(option, this)

}



export default M

export {
  createM
}

