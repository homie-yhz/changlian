<template>
    <router-link tag="div" :to="{name:'chargingList'}" v-tap class="circle-box" :class="{'circle-box-shine':shine}" v-if='show' ref="circleDom">
      <p class="v-fcm">{{num}}</p>
      <p>充电中</p>
    </router-link>
</template>

<script>
  import Vue from "vue";
  import "../../clTouch";
  export default {
    data() {
      return {
        shine: false
      };
    },
    props: ["num", "show"],
    methods: {},
    mounted() {
      let _this = this;
      this.$nextTick(() => {
        let circle = _this.$refs.circleDom;
        // circle.addEventListener("touchmove", function(event) {
        //   circle.style.left = event.touches[0].pageX + "px";
        //   circle.style.top = event.touches[0].pageY + "px";
        // });
      });
    },
    created() {
      let _this = this;
      setInterval(() => {
        _this.shine = !_this.shine;
      }, 1000);
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  .circle-box {
    position: absolute;
    top: 9.5rem;
    right: 0.5rem;
    width: 2.5rem!important;
    height: 2.5rem!important;
    background-color: #e51c23;
    color: #fff;
    border-radius: 50%;
    z-index: 3;
    box-shadow: 0 0 10px #e51c23;
    transition: box-shadow 1s linear;
    &>p:first-child {
      width: 1rem!important;
      height: 1rem!important;
      border-radius: 50%;
      background-color: #fff;
      margin: 0 auto;
      color: #e51c23;
      margin-top: 0.2rem;
      @include fcm;
    }
    &>p:last-child {
      @include fcm;
    }
  }
  
  .circle-box-shine {
    box-shadow: 0 0 23px #e51c23;
  }
</style>
