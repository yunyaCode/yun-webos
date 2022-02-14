import {
  isFunction
} from './shared'


let MOVE = function (dropDom: JQuery<HTMLElement>, moveDom: JQuery<HTMLElement>, call: Function) {


  console.log('dropDom, moveDom,call==', dropDom, moveDom, call)

  let x = 0;
  let y = 0;
  let l = 0;
  let t = 0;
  let isDown = false;
  //鼠标按下事件
  dropDom.off('mousedown').on('mousedown',
    function (e: any) {
      //获取x坐标和y坐标
      x = e.clientX;
      y = e.clientY;

      //获取左部和顶部的偏移量
      l = moveDom.offset().left;
      t = moveDom.offset().top;
      console.log('onmousedown.....', x, y, l, t)
      //开关打开
      isDown = true;
      //设置样式
      dropDom.css('cursor', 'move')
      moveDom.css('transition', 'none')

    })

  //鼠标移动
  dropDom.off('mousemove').on('mousemove',
    function (e) {
      e.preventDefault();
      if (isDown == false) {
        return;
      }
      //获取x和y
      let nx = e.clientX;
      let ny = e.clientY;
      //计算移动后的左偏移量和顶部的偏移量
      let nl = nx - (x - l);
      let nt = ny - (y - t);

      //不允许超出
      if (nl < 1 || nt < 1) return

      moveDom.css({
        left: nl + 'px',
        top: nt + 'px'
      })

    })
  //鼠标抬起事件
  dropDom.off('mouseup').on('mouseup',
    function (e) {
      //开关关闭
      isDown = false;
      if (isFunction(call)) call({
        left: moveDom.offset().left,
        top: moveDom.offset().top
      })
      dropDom.css('cursor', 'default')
      moveDom.css('transition', 'all .4s,background 0s')
    })

}

export default MOVE
