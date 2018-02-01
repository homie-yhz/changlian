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
				<div class="cl-box">
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
					<p>fdsanfdsanfdans nfnsjkadn fjdnas fnsadj </p>
				</div>
				<div class="tac" style="position:absolute;bottom:.5rem;width:100%;color:#666;font-size:.5rem;">Copyright@t2017 畅联电子科技平台</div>
			</div>
		</div>
	</div>
</template>

<script>
	import GLOBAL, {
		getUserInfo
	} from '../../GLOBAL';
	export default {
		data() {
			return {
				level: ''
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			}
		},
		created() {
			this.level = GLOBAL.level;
		}
	};
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	@import "../../../static/css/iconfont.css";
</style>

