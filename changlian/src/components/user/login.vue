<template>
  <div>
    <header class="header-poa-white v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">常用电站</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="scroll-box">
      <div>
        <!-- 图标 -->
        <div class="v-fcm">
          <div style="margin:2rem 0;">
            <div class="icon-changlian-logo"></div>
            <div>畅联通，共享用</div>
          </div>
        </div>
        <!-- 登录输入框 -->
        <div style="width:85%;" class="m-auto login-box">
          <input type="text" v-model="body.phone" placeholder="手机号" maxlength="11" style="margin-bottom:3px;">
          <input type="password" v-model="body.pwd" placeholder="密码" maxlength="16">
          <p class="v-fb register-or-backpwd">
            <router-link :to="{name:'register'}" class="v-fm">新用户注册</router-link>
            <router-link :to="{name:'getBackPwd'}" class="v-fm">找回密码?</router-link>
          </p>
          <p @click="login" class="btn-login v-fcm">登录</p>
          <p class="tac agreement">登录即表示同意
            <router-link :to="{name:'userAgreement'}">《畅联通用户协议》</router-link>
            </p>
          <div class="v-fm other-login-method">
            <p class="v-i1"></p>
            <p>其它方式登录</p>
            <p class="v-i1"></p>
          </div>
          <div class="icon-wx-logo" @click="showLoading" style="margin-top:.3rem;"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GLOBAL,{ws,getOpenId, getUserInfo} from "../../GLOBAL";
import regExp from "../../RegExp";
import { Toast,MessageBox } from "mint-ui";
import loader from '../../loading';
import "mint-ui/lib/toast/style.css";
export default {
  data() {
    return {
      body: {},
    };
  },
  methods: {
    showLoading(){
      console.log(loader.show());
    },
    back() {
      this.$router.go(-1);
    },
    login() {
      let _this = this;
      console.log("提交登录信息");
      console.log(JSON.stringify(this.body));
      // let url = GLOBAL.interfacePath + "";
      if (!regExp.phone.test(this.body.phone)) {
        Toast('手机号输入有误！')
      }else if(!regExp.pwd.test(this.body.pwd)){
        Toast('密码格式有误！')
      }else{
        loader.show();
        let _this = this;
        let url = GLOBAL.interfacePath + '/clyun/postUserLoginUrl';
      axios
        .post(url,this.body)
        .then(function(data) {
          loader.hide();
          console.log(">>>登录接口|返回数据|" ,data.data);
          let res = data.data;
          if (res.code === 200) {
              sessionStorage.setItem('userId',(res.body.userId||''));
              localStorage.setItem('userId',res.body.userId||'');
              MessageBox.alert("登录成功！").then(action => {
              //设置userId 以及 登录状态 
              sessionStorage.setItem('userId',(res.body.userId||''));
              getUserInfo();
              ws();
              // getOpenId();
              _this.$router.replace({name:'personalCenter'});
              });
              //用户不存在，前去注册？
            } else if(res.code === 607){  
              MessageBox.confirm('用户不存在，前去注册？').then(action=>{
						    _this.$router.push({name:'register'});
              });
            }else {
              MessageBox.alert(res.msg);
            }
        })
        .catch(function(err) {
          loader.hide();
          MessageBox.alert('接口异常！');
          console.log({
            url: url,
            err: JSON.stringify(err)
          });
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "../../../static/css/common.scss";
@import "../../../static/css/iconfont.css";
.header {
  height: 2rem;
  border-bottom: 1px solid #d9d9d9;
}

.arrow-back {
  width: 0.4rem;
  height: 0.4rem;
  border-left: 2px solid #616161;
  border-top: 2px solid #616161;
  transform: rotate(-45deg);
  margin-left: 0.5rem;
}

.login-box {
  & > input {
    height: 1.8rem;
    width: 100%;
    border-bottom: 1px solid #bbbbbb;
    &:last-child {
      margin-top: 0.5rem;
    }
  }
}

.btn-login {
  background-color: #2eafed;
  color: #fff;
  margin: 0.8rem 0;
  border-radius: 3px;
  height: 1.6rem;
}

.other-login-method {
  margin-top: 2rem;
  color: #999;
  font-size: 0.5rem;
  & > p:nth-child(2) {
    margin: 0 0.5rem;
  }
  & > :first-child,
  :last-child {
    border-top: 1px solid #dbdbdb;
  }
}

.register-or-backpwd > a {
  margin-top: 0.4rem;
  color: #2eafed;
  font-size: 0.55rem;
}

.agreement {
  color: #5c5c5c;
  font-size: 0.55rem;
  a {
    color: #2eafed;
  }
}
</style>
