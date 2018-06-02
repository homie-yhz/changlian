<template>
	<div>
		<header class="header-poa-white v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">关于我们</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="scroll-box">
			<div>
				<!-- 图标 -->
				<div class="v-fcm">
					<div style="margin:1rem 0;">
						<div class="icon-changlian-logo"></div>
						<div>畅联通，共享用</div>
						<div style="color:#999;text-align:center;">V{{level}}</div>
					</div>
				</div>
				<div style="position:relative;">
					<input type="text">
					<ul style="position:absolute;top:30px;">
						<li>1</li>
						<li>2</li>
						<li>3</li>
					</ul>
				</div>
				<div class="cl-box">
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
				</div>
				<div @click="showLoading" class="tac" style="position:absolute;bottom:.5rem;width:100%;color:#666;font-size:.5rem;">Copyright@t2017 畅联电子科技平台</div>
			</div>
		</div>
	</div>
</template>

<script>
import GLOBAL, { getUserInfo } from "../../GLOBAL";
import loading from '../../loading';

export default {
  data() {
    return {
      level: ""
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
		},
		showLoading(){
			console.log('showLoading');
			console.log(loading);
			// loading.show();
		}
  },
  created() {
    this.level = GLOBAL.level;
  }
};
</script>

<style>
@import "../../../static/css/common.scss";
@import "../../../static/css/iconfont.css";
</style>

