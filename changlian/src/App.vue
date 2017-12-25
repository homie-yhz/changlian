<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  export default {
    name: 'app',
    data() {
      return {
        transitionName: 'slide-right',
      }
    },
    watch: {
      '$route' (to, from) {
        console.log(to.path.split('/').length);
        console.log(from.path.split('/').length);
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
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
</style>
