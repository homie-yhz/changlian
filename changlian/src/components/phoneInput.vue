<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">登录</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div style="width:85%;" class="m-auto login-box">
        <input type="text" v-model="loginInfo.phone" placeholder="手机号">
        <input type="text" v-model="loginInfo.pwd" placeholder="密码">
        <p class="v-fb register-or-backpwd">
          <router-link :to="'phoneInput'" class="v-fm td-u">新用户注册>></router-link>
          <router-link :to="'pwdInput'" class="v-fm td-u">找回密码</router-link>
        </p>
        <p @click="login" class="btn-login v-fcm">登录</p>
        <p class="tac agreement">登录即表示同意《畅联通用户协议》</p>
        <div class="v-fm other-login-method">
          <p class="v-i1"></p>
          <p>其它方式登录</p>
          <p class="v-i1"></p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {}
  }
}
</script>
<style>
  
</style>
