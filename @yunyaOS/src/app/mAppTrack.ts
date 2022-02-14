import __WEBOS_KEY from '../utils/Symbol'

import M from '../layout/M'

const __WEBOS_KEY__MINIAPPS__ = __WEBOS_KEY.__MINAPPS__;
const __WEBOS_KEY__MAPPS__ = __WEBOS_KEY.__MAPPS__;
const __WEBOS_KEY__MAXAPPS__ = __WEBOS_KEY.__MAXAPPS__;


export function mAppTrack() {

  let _id_key_ = '%';
  let mapps = window[__WEBOS_KEY__MAPPS__] || {};
  let miniapps = window[__WEBOS_KEY__MINIAPPS__] || [];
  let maxapps = window[__WEBOS_KEY__MAXAPPS__] || [];

  let miniDomC = () => {

    let max = null;
    Object.values(mapps).map((m: any) => {
      m.$miniDom.removeClass('c');
      if (!max) {
        max = m;
      }
      if (m.__MAPP_Z_Index_ > max.__MAPP_Z_Index_ || m.__MAPP_Z_Index_ && !max.__MAPP_Z_Index_) {
        max = m;
      }

    })
    if (max) max.$miniDom.addClass('c');

  }

  let zIndex = (M: M) => {


    console.log('zIndex.....', M, mapps)
    let firstMapp = Object.values(mapps)[0] as M;

    //最基础值
    const baseZ_Index = 510;

    let thisZ_Index = M.__MAPP_Z_Index_ || 0;
    let maxZ_Index = M.__MAPPS_MAX_Z_Index_ || firstMapp && firstMapp.__MAPPS_MAX_Z_Index_ || 0;

    //这里处理应用获取焦点是置顶显示处理
    if ((thisZ_Index < maxZ_Index || maxZ_Index == 0) && Object.keys(mapps).length > 1) {
      thisZ_Index = maxZ_Index + 1;
      M.mDom.css('z-index', baseZ_Index + thisZ_Index);
      M.__MAPP_Z_Index_ = thisZ_Index;
      Object.values(mapps).map((m: any) => {
        m.__MAPPS_MAX_Z_Index_ = thisZ_Index;
      })
    }
    miniDomC()

  };

  let getId = (id: string) => {

    let size = Object.keys(mapps).length;
    let hasId = '';
    Object.keys(mapps).map(_id => {
      if (_id.includes(id)) {
        hasId = _id;
      }
    })
    if (hasId.length > 1) return hasId
    return `${size}${_id_key_}${id}`;
  };

  let set = (M: M) => {

    if (!M) return

    if (!M.mApp) return
    let _id = getId(M.__MAPPS__ID_ || M.mApp.id);

    M.mApp['__MAPPS__ID_'] = _id;
    M['__MAPPS__ID_'] = _id;
    mapps[_id] = M;
    init();
    return {
      mapps,
      miniapps,
      maxapps
    }
  };

  let get = (id: string) => {
    let _id = getId(id);
    return mapps[_id] || null
  };

  let del = (id: string) => {
    let _id = getId(id);
    delete mapps[_id]
    init();
  };

  let init = () => {
    miniapps = [];
    maxapps = [];
    Object.values(mapps).map((m: any) => {
      let mApp = m.mApp;
      if (mApp.min) {
        miniapps.push(m);
      } else if (mApp.max) {
        maxapps.push(m);
      }
    })


    window[__WEBOS_KEY__MAPPS__] = mapps;
    window[__WEBOS_KEY__MINIAPPS__] = miniapps;
    window[__WEBOS_KEY__MAXAPPS__] = maxapps;


    console.log(' window[__WEBOS_KEY__MAPPS__]=', window[__WEBOS_KEY__MAPPS__])
    console.log(' window[__WEBOS_KEY__MINIAPPS__]=', window[__WEBOS_KEY__MINIAPPS__])
    console.log(' window[__WEBOS_KEY__MAXAPPS__]=', window[__WEBOS_KEY__MAXAPPS__])

  };

  return {
    miniDomC,
    set,
    get,
    del,
    zIndex
  }

}
