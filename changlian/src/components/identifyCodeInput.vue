<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">找回密码</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div>
      <div>
        <div class="v-fb">
          <span>验证码已发送</span><span>57s后重新发送</span>
        </div>
        <div class="v-f identifycode-box">
          <input type="tel">
          <input type="tel">
          <input type="tel">
          <input type="tel">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.identifycode-box {
  & > input {
    width: 1rem;
    height: 1rem;
    display: block;
    border:1px solid #bbb;
    text-align: center;
  }
}
</style>
