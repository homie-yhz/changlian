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
  VueRouter.prototype.goBack = function(){
    this.isBack = true
　　 window.history.go(-1)
  };
  console.log(VueRouter);
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
      next()
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
