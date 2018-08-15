<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">{{title}}</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div>
      <!-- 输入验证码 -->
      <div class="identif-box" style="padding:0 1.6rem;">
        <div class="v-fb">
          <span>验证码已发送</span><span @click="getCode"  style="color:#e65300">{{getCodeBtn.text}}</span>
          <!-- :class="{}" -->
        </div>
        <div class="v-f identifycode-box" refs="inputBox">
          <input v-for="index in [0,1,2,3]" type="tel" class="v-i1" maxlength="1" v-model="inputs[index]" :key="input[index]">
        </div>
      </div>
      <!-- 下一步按钮 -->
      <div class="btn btn-next" @click="nextStep" :class="{disable:nextStepBtn.state===0}">下一步</div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import axios from 'axios';
import GLOBAL from '../../GLOBAL';
//倒计时时间设定
export default {
  data() {
    return {
      title:'',
      getCodeBtn: {
        state: 0,                    //0:不可以点击  1：允许点击  2：倒计时
        leftTime: GLOBAL.leftTime,
        text: GLOBAL.leftTime + "s后重新获取" //倒计时剩余时间,
      },
      nextStepBtn:{
        state:0,                     //0:不可以点击 1：允许点击
      },
      inputs:['','','',''],
    };
  },
  methods: {
    //点击下一步
    nextStep(){
      if(this.nextStepBtn.state === 1){
        console.log('点击下一步');
        this.$router.push({name:'pwdInput',params:{title:this.$route.params.title,phone:this.$route.params.phone,indentifyCode:'22222'}});
      }
    },
    //获取验证码
    getCode() {
      if(this.getCodeBtn.state === 1){
        console.log('允许点击');
        this.getCodeBtn.text = GLOBAL.leftTime + "s后重新获取";
        this.countDown();
        this.getIndentifyCode_IF();
      }
    },
    //倒计时
    countDown() {
      this.getCodeBtn.state = 2;
      let _this = this;
      setTimeout(() => {
        _this.getCodeBtn.text = --_this.getCodeBtn.leftTime + "s后重新获取";
        if (_this.getCodeBtn.leftTime > 0) {
          _this.countDown();
        } else {
          // 重置数据
          _this.getCodeBtn = {
            state: 1,           //0:不可以点击  1：允许点击  2：倒计时
            leftTime: GLOBAL.leftTime,
            text:"重新获取"      //倒计时剩余时间,
          }
        }
      }, 1000);
    },
    //获取验证码接口
    getIndentifyCode_IF(){
        //params:phone
        let getIndentifyCodeUrl = GLOBAL.interfacePath + '/clyun/getIndentifyCodeUrl?phone=';
        axios
          .get(getIndentifyCodeUrl)
          .then(function(data){
            console.log('getIndentifyCodeUrl|返回数据|'+JSON.stringify(data.data));
            if(!!data.data){
              alert('验证码'+data.data);
            }
          })
          .catch(function(err){
            console.log({'url':getIndentifyCodeUrl,'err':JSON.stringify(err)});
          });
    }
  },
  created() {

    console.log(this.$route.params.title);
    this.title = this.$route.params.title === "register" ? "注册" : "找回密码";

    this.countDown();
    this.getIndentifyCode_IF();
    // 监听验证码输入框
    this.$nextTick(function() {
      $("input")
        .eq(0)
        .focus();
      $("input").bind("input propertychange", function() {
        if (!!$(this).val()) {
          $(this).next().focus();
        }
      });
    });
  },
  watch:{
    inputs:function(nv){
      for(var i = 0;i<nv.length;i++){
        if(!nv[i]){
          this.nextStepBtn.state = 0;
          return false;
        }
      }
      this.nextStepBtn.state = 1; 
    }
  }
};
</script>
<style lang="scss">
@import "../../../static/css/common.scss";
.identifycode-box {
  & > input {
    width: 1rem;
    height: 2.2rem;
    display: block;
    border: 1px solid #bbb;
    text-align: center;
    margin-right: 1.4rem;
    font-size: 1rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
.identif-box > div:first-child {
  margin: 0.5rem 0;
}
.btn-next {
  width: 90%;
  margin: 1rem auto;
}
</style>
