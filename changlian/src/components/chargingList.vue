<template>
	<div>
		<header class="header-poa-white v-fcm" style="background-color:#fff;">
			<div class="v-fcm m-auto h-100 header-title" style="width:80%">充电中</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
			<!-- <div @click="back()" class="poa rt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div> -->
		</header>
		<div class="scroll-box" style="padding-bottom:2rem">
			<ul>
				<router-link tag="li" :to="{name:'charging',params:{chargingId:'001'}}">
					<div class="equitment-box v-fb v-fm" style="background-color: #2daeec;">
						<div class="">
							<!-- 设备地址 -->
							<p>{{equipment.addr}}</p>
							<!-- 设备编号 -->
							<p>设备编号：{{equipment.num}}</p>
						</div>
						<div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
					</div>
					<div class="v-fm handle-method">
						<div v-if="userInfo.chargeSource === 'APP'" class="v-fm">
							<i class="icon-app"></i>APP
						</div>
						<div v-if="userInfo.chargeSource === 'IDCard'" class="v-fm">
							<i class="icon-IDCard"></i>ID卡
						</div>
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				equipment: {},
				userInfo: {},
			}
		},
		methods:{
			back(){
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="scss">
	@import '../../static/css/common.scss';
	.equitment-box {
		padding: 0.5rem 0.8rem 0.2rem;
		background-color: #2daeec;
		&>div>p:first-child {
			margin-bottom: 0.2rem;
			min-height: 0.5rem;
		}
		.icon-equipment-num {
			border-radius: 100rem;
			height: 2rem;
			width: 2rem;
			background-color: #ff9800;
			color: #fff;
			font-size: 0.9rem;
		}
	}
	
	.handle-method {
		margin: 0 0 0.5rem 0.8rem;
		font-size: 0.5rem;
		&>div {
			@include fm;
			background: rgba(255, 255, 255, 0.7);
			color: #666;
			border-radius: 3px;
			padding: 0.1rem 0.2rem;
		}
	}
</style>

