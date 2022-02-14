<!--  -->
<template>
  <div class="A desktop">
    <div class="B" :style="`opacity:${bgImage?1:0};background-image:url(${bgImage});`"></div>
    <div class="H aH">
      <u class="icon logo" v-html="svg.xyLogo"></u>
      <i class="txt logo"></i>
      <a class="user" style="background-image:url(https://img3.doubanio.com/icon/ul66191161-2.jpg);">
        <u class="icon" v-html="svg.user"></u></a>
      <a class="search"><u class="icon" v-html="svg.search"></u></a>
      <a class="logout"><u class="icon" v-html="svg.power"></u></a>
    </div>
    <div class="N aN">
      <div class="apc-switch">
        <a class="sw_i c"><i class="txt">概况</i></a>
        <a class="sw_i ss"><i class="txt">数据</i></a>
        <a class="sw_i "><i class="txt">内容</i></a>
        <a class="sw_i ss"><i class="txt">用户</i></a>
        <a class="sw_i "><i class="txt">营销</i></a>
        <a class="sw_i ss"><i class="txt">设置</i></a>
        <a class="sw_i ss"><i class="txt">回收</i></a>
      </div>
    </div>
    <div class="P home">
      <div class="C">
        <div class="U">
          <div class="L">

            <div class="mPanel p1"></div>
            <div class="mPanel p2"></div>

            <div class="mPanel p3">
              <div class="mlist">

                <div class="mApp content" style="position:relative;height:auto" :class="[`c${i+1}`,item.cls]"
                  v-for="(item,i) in mAppList" :key="i">
                  <div class="pic logo">
                    <u class="icon" v-html="item.svg"></u>
                  </div>
                  <div class="name"></div>
                  <a class="shortcut"><u class="icon" v-html="svg.add"></u></a>
                  <a class="to" @click="showMApp(item)"></a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {
    xyLogo,
    user,
    add,
    vote,
    news,
    slideShow,
    test,
    file,
    video,
    camera,
    power,
    search
  } from '@root-apc-ui-svg';
  export default {
    data() {
      return {
        svg: {
          xyLogo,
          user,
          add,
          vote,
          news,
          slideShow,
          test,
          file,
          video,
          camera,
          power,
          search
        },
        appList: [],
        mAppList: [{
            name: '直播',
            key: 'live',
            cls: 'live',
            svg: camera
          },
          {
            name: '点播',
            key: 'video',
            cls: 'video',
            svg: video
          },
          {
            name: '附件',
            key: 'attachment',
            cls: 'video',
            svg: file
          },
          {
            name: '练习',
            key: 'test',
            cls: 'video',
            svg: test
          },
          {
            name: '新闻',
            key: 'slideShow',
            cls: 'video',
            svg: slideShow
          },
          {
            name: '资讯',
            key: 'news',
            cls: 'video',
            svg: news
          },
          {
            name: '问卷',
            key: 'vote',
            cls: 'video',
            svg: vote
          }
        ],
        // bgImage: './static/cover/index.jpg'
      }
    },
    created() {

      console.log('这是桌面的业务，上下文=', this)
      this.$nextTick(() => {

        let list = require('../../../../mock/getAppList.js').default

        this.getAppList(list);


      })


    },

    methods: {

      getAppList(list) {

        let XINYAOS = this.$root.$XINYAOS;

        // let list = [{
        //   container: 'app_M_live',
        //   name: 'live', //不能随便改，需要跟真实应用名称一样
        //   entry: 'http://172.30.14.153:8200/static/js/main.js',
        //   entryApp: 'http://172.30.14.153:8200',
        //   mount: false,
        // }]

        list.map(config => {

          XINYAOS.createApp(config, () => {

            console.log('【桌面加载应用列表】---------------加载成功【', config.name, '】---------------')

          });
        })


        // console.log('【桌面加载应用列表】', WEBOS)


      },

      showMApp(app) {

        let XINYAOS = this.$root.$XINYAOS;
        console.log('【showMApp】。XINYAOS=======', XINYAOS)

        let m = XINYAOS.createM({
          name: app.name,
          id: app.key,
          box: '#app_desktop'
        })

        m.show(XINYAOS.getApp(app.key));

        console.log('【showMApp】。m=======', m)

        // XINYAOS.createApp('live')

      }
    },
    mounted() {

    }
  }

</script>

<style lang="scss">
  @import "@root-scss/apc-ui/apc-ui-mini";
  @import "@root-scss/apc-ui/apc-entry";
  @import "@root-scss/apc-ui/apc-m";
  @import "@scss/app/m-admin";

  .list {

    color: #999;

  }

  /* @import url(); 引入css类 */

</style>
