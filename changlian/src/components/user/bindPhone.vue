<template>
  <div>
    <header class="header-poa-white v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">绑定手机</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box">
      <div>
        <div style="width:85%;" class="register-box">
          <div>
            <input type="tel" v-model="body.phone" maxlength="11" placeholder="手机号">
            <span @click="getCode" v-bind:style="{color:getCodeBtn.state===1?'#2eafed':'#bbbbbb'}">{{getCodeBtn.text}}</span>
          </div>
          <input type="tel" v-model="body.identifyCode" maxlength="6" placeholder="验证码" style="margin-bottom:3px;">
          <!-- <input type="password" v-model="body.pwd" maxlength="16" placeholder="密码（请输入6-16位字母+数字的密码组合）"> -->
          <p @click="nextStep" class="btn btn-login v-fcm" :class="{disable:!allowNext}">绑 定</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GLOBAL from "../../GLOBAL";
import axios from "axios";
import regExp from "../../RegExp";
import loader from "../../loading";
import { Toast, MessageBox } from "mint-ui";
import "mint-ui/lib/toast/style.css";
const leftTime = 60;

export default {
  data() {
    return {
      phone: "",
      title: "",
      allowNext: false,
      getCodeBtn: {
        state: 0, //0:不可以点击  1：允许点击  2：倒计时
        leftTime: leftTime,
        text: "发送验证码" //倒计时剩余时间,
      },
      body: {
        phone: "",
				identifyCode: "",
				userId:localStorage.getItem('userId')||''
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    nextStep() {
      if (this.allowNext) {

        loader.show();
        let _this = this;
        let url = GLOBAL.interfacePathToken + "/clyun/bindPhone";
        axios
          .post(url, _this.body)
          .then(function(data) {
            let res = data.data;
            // console.log(res.code);
            loader.hide();
            if (res.code === 200) {
              MessageBox.alert("绑定手机成功！").then(action => {
                //注册成功 跳转到个人主页。
                _this.$router.replace({name: "personalCenter"});
              });
            }else if(res.code === 501){

            } else {
              MessageBox.alert(data.data.msg);
            }
          })
          .catch(function(err) {
            loader.hide();
            console.log(err);
          });
      }
    },
    //获取验证码
    getCode() {
      if (this.getCodeBtn.state === 1) {
        if(regExp.phone.test(this.body.phone)){
          console.log("获取验证码成功！");
        this.getCodeBtn.text = leftTime + "s后重新获取";
        this.countDown();
        this.getIndentifyCode_IF();
        }else{
          MessageBox.alert('手机号输入有误！请重新输入！');
        }
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
          _this.getCodeBtn.leftTime = leftTime;
          _this.getCodeBtn.text = "重新获取";
          if (_this.body.phone.length === 11) {
            _this.getCodeBtn.state = 1;
          } else {
            _this.getCodeBtn.state = 0;
          }
        }
      }, 1000);
    },
    //获取验证码接口
    getIndentifyCode_IF() {
      //params:phone
      let getIndentifyCodeUrl =
        GLOBAL.interfacePath + "/clyun/getIndentifyCodeUrl?phone=" + this.body.phone;
      let _this = this;
      loader.show();
      axios
        .get(getIndentifyCodeUrl)
        .then(function(data) {
          console.log(
            "getIndentifyCodeUrl|返回数据|" + JSON.stringify(data.data)
          );
          loader.hide();
          let res = data.data;
          if (res.code === 200) {
            alert("验证码" + res.body.code);
          } else {
            MessageBox.alert(res.msg);
          }
        })
        .catch(function(err) {
          MessageBox.alert("接口异常");
          loader.hide();
          console.log({
            url: getIndentifyCodeUrl,
            err: JSON.stringify(err)
          });
        });
    }
  },
  watch: {
    body: {
      handler(nv) {
        console.log(JSON.stringify(nv));
        if (this.getCodeBtn.state !== 2) {
          if (nv.phone.length === 11) {
            this.getCodeBtn.state = 1;
            console.log("长度11 允许点击，点击后进行获取验证码操作");
          } else {
            this.getCodeBtn.state = 0;
          }
        }
        if (
          regExp.phone.test(nv.phone) &&
          regExp.identifyCode.test(nv.identifyCode)
        ) {
          this.allowNext = true;
        } else {
          this.allowNext = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/css/common.scss";
.register-box {
  margin: 0.5rem auto 0;
  & > div {
    border-bottom: 1px solid #bbbbbb;
    @include fm;
    & > input {
      @include i1;
      border-bottom: none;
    }
    & > span {
      display: block;
      height: 2rem;
      @include fm;
    }
  }
  input {
    height: 2rem;
    width: 100%;
    border-bottom: 1px solid #bbbbbb;
  }
}

.btn-login {
  margin: 0.8rem 0;
  border-radius: 3px;
  height: 1.6rem;
}
</style>
