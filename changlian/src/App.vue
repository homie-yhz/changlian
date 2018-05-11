<template>
  <div id="app">
    <!-- <transition :name="transitionName">
    </transition> -->
      <router-view class="child-view"></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import GLOBAL from './GLOBAL';
  import store from './store';
import { setInterval } from 'timers';
  VueRouter.prototype.goBack = function(){
    this.isBack = true
　　 window.history.go(-1)
  };
  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-right',
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log('--------------');
      console.log(this.$router.isBack);
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
      next();
    },
    created(){
      let _this = this;
    let websocket = null;
    if ('WebSocket' in window) {
        websocket = new WebSocket("ws://" + GLOBAL.interfacePath + "/websocket/" + 'test1' );
    } else {
        alert('当前浏览器 Not support websocket');
    }
    //连接发生错误的回调方法
    websocket.onerror = function() {
      setMessageInnerHTML("WebSocket连接发生错误");
    };

    //连接成功建立的回调方法
    websocket.onopen = function() {
      setMessageInnerHTML("WebSocket连接成功");
    }

    //接收到消息的回调方法
    websocket.onmessage = function(event) {
      setMessageInnerHTML(event.data);
      let res = {
        state:'update',
      }
      setInterval(()=>{
        let num = Math.round(Math.random());
        console.log('num:'+num);
        if(num === 0){
          store.commit('increment');
          console.log('发生更新！');
          console.log(store.state.update);
        }
      },5000);
    }

    //连接关闭的回调方法
    websocket.onclose = function() {
    setMessageInnerHTML("WebSocket连接关闭");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
    closeWebSocket();
    }

    //关闭WebSocket连接
    function closeWebSocket() {
    websocket.close();
    }

    //将消息显示在网页上
    function setMessageInnerHTML(innerHTML) {
      console.log(innerHTML);
    }

    //发送消息
    function send(){
        websocket.send(message);
    }
    }
  }
</script>
<style>
  #app {
    width: 100%;
    height: 100%;
    font-size: .6rem;
  }
  #app>div{
    width:100%;
    height:100%;
  }
  .child-view {
  position: absolute;
  width:100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
  }
  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
