<template>
  <div id="app">
    <!-- <transition :name="transitionName">
            </transition> -->
    <router-view class="child-view"></router-view>
    <float-circle :num="chargingMechineAmount" :show="userId && !!chargingMechineAmount"></float-circle>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VueRouter from 'vue-router';
  import GLOBAL, {
    ws,getUserInfo
  } from './GLOBAL';
  import store from './store';
  import FloatCircle from "./components/my-cpt/float-circle.vue";
  VueRouter.prototype.goBack = function() {
    this.isBack = true;　　
    window.history.go(-1);
  };
  export default {
    name: 'app',
    components: {
      FloatCircle
    },
    data() {
      return {
        transitionName: 'slide-right',
      }
    },
    computed:{
      userId:function(){
        return !!localStorage.getItem('userId');
      },
      chargingMechineAmount:function(){
        return store.state.chargingMechineAmount;
      }
    },
    beforeRouteEnter(to, from, next) {
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
    created() {
      ws();
      getUserInfo().then(function(userInfo){
        store.commit('setChargingMechineAmount',userInfo.chargingMechineAmount);
      });
    },
    beforeCreate(){
    }
  }
</script>

<style lang="scss">
  #app {
    width: 100%;
    height: 100%;
    font-size: .6rem;
  }
  
  #app>div {
    width: 100%;
    height: 100%;
  }
  
  .child-view {
    position: absolute;
    width: 100%;
    transition: all .8s cubic-bezier(.55, 0, .1, 1);
  }
  
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(50px, 0);
    transform: translate(50px, 0);
  }
  
  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-50px, 0);
    transform: translate(-50px, 0);
  }
</style>
