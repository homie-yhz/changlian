<template>
	<div>
		<header class="header-poa v-fcm">
			<div class="v-fcm m-auto h-100" style="width:80%">代理商</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
			<div class="addAgent" @click="addAgent()">
				<p class="tac">+</p>
				<p class="tac">添加</p>
			</div>
		</header>
		<ul class="scroll-box agentList" style="padding-top:2rem;">
			<li class="v-f" v-for="agent in agentList">
				<router-link :to="{name:'',params:{agentId:agent.agentId}}" class="v-f">
					<img src="../../static/img/book.png" alt="">
					<div class="v-i1">
						<p>{{agent.agentName}}</p>
						<p>{{agent.agentAddr}}</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import GLOBAL from '../GLOBAL';
	import axios from 'axios';
	export default {
		data() {
			return {
				agentList:[]
			};
		},
		methods: {
	
		},
		created() {
			let _this = this;
			//let agentListUrl = GLOBAL.interfacePath + '';
			let agentListUrl = '';
			axios
				.get(agentListUrl)
				.then(function(data) {
					console.log('agentListUrl|返回数据|' + JSON.stringify(data.data));
					data.data = [{
							"agentName": "和被告石家庄代理商",
							"agentImg": "../../static/img/book.png",
							"agentAddr": "fdsafdsafdsafsad",
							"agentId":"1321312321"
						},
						{
							"agentName": "和被告石家庄代理商2",
							"agentImg": "../../static/img/book.png",
							"agentAddr": "1231321321312",
							"agentId":"321312321312"
						}
					];
					_this.agentList = data.data;
				})
				.catch(function(err) {
					console.log({
						'url': agentListUrl,
						'err': JSON.stringify(err)
					});
				});
		}
	};
</script>

<style lang="scss">
	@import "../../static/css/common.scss";
	.addAgent {
		position: absolute;
		right: .5rem;
		z-index: 2;
		&>p:first-child {
			color: #3db0bf;
			font-size: .7rem;
		}
	}
	
	.agentList {
		padding: 0 .5rem;
		&>li {
			border-bottom: 1px solid #e6e6e6;
			padding: .5rem 0;
			&>a {
				width: 100%;
				&>img {
					border: 1px solid #bfbfbf;
					width: 3.5rem;
					height: 2.5rem;
					margin-right: .5rem;
				}
				&>div>p:first-child {
					font-weight: bold;
					margin-bottom: .2rem;
				}
			}
		}
	}
</style>

