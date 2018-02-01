<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">{{title}}</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div style="width:85%;" class="m-auto login-box mt-5">
      <div class="pwd-box">
        <p class="v-fm">
          <span>密码</span>
          <input type="password" v-model="pwd1" class="v-i1" placeholder="6位以上字母与数字的组合">
        </p>
        <p class="v-fm">
          <span>确认密码</span>
          <input type="password" v-model="pwd2" class="v-i1" placeholder="请再次确认密码">
        </p>
      </div>
        <p @click="nextStep" class="btn btn-login v-fcm mt-10" :class="{disable:nextStepBtnState === 0}">确认</p>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'
import 'mint-ui/lib/toast/style.css';

export default {
  data() {
    return {
      title: '',
      pwd1:'',
      pwd2:''
    };
  },
  computed:{
    nextStepBtnState(){
      if(this.pwd1.length===this.pwd2.length && this.pwd1.length >= 6){
        return 1;
      }else{
        return 0;
      }
    }
  },
  methods:{
    nextStep(){
      if(this.nextStepBtnState === 1){
        console.log('允许点击');
        if(this.pwd1 === this.pwd2){
          this.$router.push({name:'personalCenter'});
        }else{
          Toast('两次输入不一致！');
        }
      }
    }
  },
  created() {
    this.title = this.$route.params.title === "register" ? "注册" : "找回密码";
  }
};
</script>
<style lang="scss">
@import "../../../static/css/common.scss";
.pwd-box {
  & > p {
    border-bottom: 1px solid #bbb;
    height: 2rem;
    margin-top:.5rem;
    span {
      display: block;
      font-weight: bold;
      width: 4rem;
    }
  }
}
</style>
