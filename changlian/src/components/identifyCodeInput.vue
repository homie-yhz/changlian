<template>
  <div>
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">找回密码</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div>
      <!-- 输入验证码 -->
      <div class="identif-box" style="padding:0 1.6rem;">
        <div class="v-fb">
          <span>验证码已发送</span><span style="color:#e65300">57s后重新发送</span>
        </div>
        <div class="v-f identifycode-box">
          <input type="tel" class="v-i1" maxlength="1">
          <input type="tel" class="v-i1" maxlength="1">
          <input type="tel" class="v-i1" maxlength="1">
          <input type="tel" class="v-i1" maxlength="1">
        </div>
      </div>
      <!-- 下一步按钮 -->
      <div class="btn btn-next">下一步</div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {};
  },
  created() {
    this.$nextTick(function() {
      $("input").eq(0).focus();
      $("input").bind("input propertychange", function() {
        //进行相关操作
        console.log('3');
        console.log($(this).index());
        if(!!$(this).val()){
          $(this).next().focus();
        }

      });
    });
  }
};
</script>
<style lang="scss">
@import "../../static/css/common.scss";
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
