<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">{{title}}</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div style="width:85%;" class="m-auto login-box mt-5">
        <input type="tel" v-model="phone" maxlength="11" class="mt-5" placeholder="手机号">
        <p @click="nextStep" class="btn-login v-fcm">下一步</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone:'',
      title:''
    };
  },
  methods:{
    nextStep(){
      this.$router.push({name:'pwdInput'})
    }
  },
  created(){
    console.log(this.$route.params.title);
    this.title = (this.$route.params.title==='register')?'注册':'找回密码';
  }
};
</script>
<style>

</style>
