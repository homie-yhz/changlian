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
			<ul class="charging-equipment-list">
				<router-link tag="li" v-for="equipment in chargingEquipmentList" :key="equipment.chargingId" :to="{name:'charging',params:{chargingId:'001'}}">
					<div class="equitment-box v-fb v-fm">
						<div class="">
							<!-- 设备地址 -->
							<p>{{equipment.addr}}</p>
							<!-- 设备编号 -->
							<p>设备编号：{{equipment.num}}</p>
						</div>
						<div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
					</div>
					<div class="v-fm handle-method">
							<div v-if="equipment.chargeSource === 'APP'" class="v-fm">
								<i class="icon-app"></i>APP
							</div>
							<div v-if="equipment.chargeSource === 'IDCard'" class="v-fm">
								<i class="icon-IDCard"></i>ID卡
							</div>
						</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import Vue from "vue";
	import axios from 'axios';
	import GLOBAL, {
		getUserInfo
	} from "../../GLOBAL";
	export default {
		data() {
			return {
				chargingEquipmentList: [],
				userInfo: {}
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			}
		},
		created() {
			let _this = this;
			//let chargingEquipmentList = GLOBAL.interfacePath + '';
			let chargingEquipmentList = '';
			axios
				.get(chargingEquipmentList)
				.then(function(data){
					console.log('chargingEquipmentList|返回数据|'+JSON.stringify(data.data));
					data.data = [
                        {
                            addr:'昌平回龙观',
                            num:'132313213123123',
                            index:'1',
                            chargingId:'001',
                            chargeSource:'APP'
                        },
                        {
                            addr:'沙河北大桥',
                            num:'4324321431243214',
                            index:'3',
                            chargingId:'003',
                            chargeSource:'IDCard'
                        }
										]
										console.log(data.data);
					_this.chargingEquipmentList = data.data;
				})
				.catch(function(err){
					console.log({'url':chargingEquipmentList,'err':JSON.stringify(err)});
				});
			// getUserInfo().then(function(userInfo) {
			// 	_this.chargingEquipmentList = userInfo.chargingEquipmentList;
			// 	console.log(_this.equipmentList);
			// });
		}
	};
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	@import "../../../static/css/iconfont.css";
	.charging-equipment-list {
		li {
			border-bottom: 1px solid #d9d9d9;
			background: #f5f5f5;
			.equitment-box {
			background: #f5f5f5;
				padding: 0.5rem 0.8rem 0.2rem;
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
		}
	}
	
	.handle-method {
		margin: 0 0 0.5rem 0.8rem;
		font-size: 0.5rem;
		&>div {
			@include fm;
			// background: rgba(255, 255, 255, 0.7);
			color: #666;
			border-radius: 3px;
			padding: 0.1rem 0.2rem;
		}
	}
</style>

