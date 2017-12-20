<template>
	<div>
		<header class="header v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">管理平台</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="operator-main-box">
			<router-link :to="{name:'agentList'}">
				<i class="icon-star"></i>
				<div>代理商管理</div>
			</router-link>
			<router-link :to="{name:'updateAgent'}">
				<i class="icon-star"></i>
				<div>绑定设备</div>
			</router-link>
			<router-link :to="{name:'agentList'}">
				<i class="icon-star"></i>
				<div>充值</div>
			</router-link>
			<router-link :to="{name:'agentList'}">
				<i class="icon-star"></i>
				<div>设备供电管理</div>
			</router-link>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import GLOBAL from '../GLOBAL';
	import RegExp from "../RegExp";
	import {
		Toast
	} from 'mint-ui'
	import 'mint-ui/lib/toast/style.css';
	export default {
		data() {
			return {
				operatorLoginInfo: {}
			};
		},
		methods: {
			
		}
	};
</script>

<style lang="scss">
	@import "../../static/css/common.scss";
	.operator-main-box {
		background-color: #f7f7f7;
		a {
			width: 44%;
			float: left;
			border: 1px solid #bbb;
			border-radius: 5px;
			margin-left: 4%;
			margin-top: .5rem;
			&>i {
				display: block;
				border-radius: 10rem;
				height: 2.5rem;
				width: 2.5rem;
				margin: .5rem auto .3rem;
				background-color: red;
			}
			&>div {
				text-align: center;
				margin-bottom:.2rem;
			}
		}
	}
</style>

