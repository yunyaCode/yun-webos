import {
  $XINYAOS
} from './index';
import M from '../layout/M'
export function app_window() {

  //创建新桌面
  let create = (M: M) => {

    setTimeout(() => {

      let n = M.mDom.clone(true);
      $XINYAOS.append(n);
      M.mDom.remove()
      M._mDom = n;

      M.app_window = {
        exit: () => {
          exit(M)
        }
      }
    }, 300)

    console.log('app_window.create M=', M);


  }

  //退出即回到桌面
  let exit = (M: M) => {

    console.log('exit-------', M)
    alert('exit')
    delete M.app_window;
  }


  return {
    create,
    exit
  }



}
