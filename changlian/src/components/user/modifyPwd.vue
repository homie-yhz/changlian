<template>
	<div>
		<header class="header-poa-white v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">设置密码</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="scroll-box">
			<div>
				<div style="width:85%;" class="setPwd-box">
					<div class="v-fb">
						<input type="password" v-model="postData.pwd" placeholder="请输入当前登录密码">
						<router-link :to="{name:'getBackPwd'}" class="v-fm cl-color">找回密码?</router-link>
					</div>
					<div>
						<input type="password" v-model="postData.repeatPwd" placeholder="请输入新密码">
					</div>
					<p @click="confirm" class="btn btn-login v-fcm" :class="{disable:!allowNext}">下一步</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import GLOBAL from "../../GLOBAL";
import axios from "axios";
import regExp from "../../RegExp";
import { Toast } from "mint-ui";
import "mint-ui/lib/toast/style.css";
const leftTime = 60;

export default {
  data() {
    return {
      allowNext: false,
      postData: {
        pwd: "",
        repeatPwd: ""
      }
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    //点击下一步  注册成功
    confirm() {
      //let postPwdUrl = GLOBAL.interfacePath + '';
      let postPwdUrl = "";
      axios
        .get(postPwdUrl)
        .then(function(data) {
          console.log("postPwdUrl|返回数据|" + JSON.stringify(data.data));
          data.data = {
            state: "success"
          };
          if (data.data.state === "success") {
            _this.$router.push({
              name: ""
            });
          }
        })
        .catch(function(err) {
          console.log({
            url: postPwdUrl,
            err: JSON.stringify(err)
          });
        });
    }
  },
  created() {},
  watch: {
    postData: {
      handler(nv) {
        console.log(JSON.stringify(nv));
        if (regExp.pwd.test(nv.pwd) && nv.pwd === nv.repeatPwd) {
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
.setPwd-box {
  margin: 0.5rem auto 0;
  & > div {
    border-bottom: 1px solid #bbbbbb;
    @include fm;
    & > div {
      width: 3.6rem;
    }
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
