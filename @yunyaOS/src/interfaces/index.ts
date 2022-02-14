import { type } from "os"

export interface AppConfig {
  name: string,//应用名称
  container: string,//应用容器【默认设置为id】
  entry: string,//核心入口文件
  entryCss: string,//样式文件
  mount: boolean,//是否直接挂载
  canDestroy: boolean,//是否可以销毁
  entryApp: string //应用入口
}

export interface RenderApp {
  app: App,//挂载后的应用
  createM: Function,//创建弹框方法
  createApp: Function//创建应用方法
}

export interface App {
  config: AppConfig, //应用配置
  app: RenderApp,//渲染后的应用实例
  _app: {
    render: Function,
  },//未渲染的应用实例

  parentDom: JQuery<HTMLElement>,//应用容器父级节点
  canDestroy: boolean,//是否可以销毁
  mounted: boolean,//是否已经挂载
  isDestroy: boolean,//是否已经销毁
  dom: JQuery<HTMLElement>,//当前应用节点

  // set: Function, //不暴露出去
  get: Function,
  mount: Function,
  destroy: Function,
}

export interface MConfig {
  id: string,//应用id
  name: string, // 应用名称标志
  box: string,//应用盒子标志
  move: boolean,//是否可以移动
  x: number,//应用出现对位置-x
  y: number,//应用出现对位置-y
}


export type MApp = {
  id: string,
  opinion: any,
  box: JQuery<HTMLElement>,
  mDom: JQuery<HTMLElement>,
  show: boolean,
  preMax: boolean,
  max: boolean,
  min: boolean,
  x: number,
  y: number,
}


export interface MAppTrack {
  miniDomC: Function,
  set: Function,
  get: Function,
  del: Function,
  zIndex: Function
}

export enum SandBoxType {
  Proxy = 'Proxy',
  Snapshot = 'Snapshot',
  LegacyProxy = 'LegacyProxy',
}

declare type PropertyKey = string | number | symbol;


export type SandBox = {
  /** 沙箱的名字 */
  name: string;
  /** 沙箱的类型 */
  type: SandBoxType;
  /** 沙箱导出的代理实体 */
  proxy: WindowProxy;
  /** 沙箱是否在运行中 */
  sandboxRunning: boolean;
  /** latest set property */
  latestSetProp?: PropertyKey | null;
  /** 启动沙箱 */
  active: () => void;
  /** 关闭沙箱 */
  inactive: () => void;
};
