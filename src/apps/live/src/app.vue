<!--  -->
<template>
  <div class="live">
    直播应用<br/>
    webos-Vue
    <br>

    <a class="btn" @click="add">测试点击+1</a>
    <div> n: {{n}}</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        n: 0
      }
    },
    created() {

      console.log('这是直播的业务，打开第三方应用', window._createApp, this.$root)


    },
    methods: {
      add() {
        this.n++
      }
    },
    mounted() {

    }
  }

</script>
<style>
  /* @import url(); 引入css类 */

</style>
