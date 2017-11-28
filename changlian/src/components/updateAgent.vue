<template>
	<div>
		<header class="header-poa v-fcm">
			<div class="v-fcm m-auto h-100" style="width:80%">添加代理商</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<!-- 代理商信息填写 -->
		<div class="scroll-box" style="padding-bottom:2rem;">
			<div class="agent-box" style="padding:0 .5rem;">
				<div class="v-fm">
					<p>代理商名称</p>
					<input type="text" v-bind:readonly="readonly" v-model="postData.agent.name" placeholder="请输入">
				</div>
				<div class="v-fm">
					<p>负责人</p>
					<input type="text" v-model="postData.agent.manager" placeholder="请输入">
				</div>
				<div class="v-fm">
					<p>联系方式</p>
					<input type="text" v-model="postData.agent.phone" placeholder="请输入">
				</div>
				<div class="v-fm">
					<p>联系地址</p>
					<input type="text" v-model="postData.agent.addr" placeholder="请输入">
				</div>
			</div>
			<div class="blank"></div>
			<!-- 代理商绑定设备 -->
			<div style="padding:0 .5rem;">
				<div class="agent-box" style="border-bottom:1px solid #bbbbbb;" v-for="(equipment,index) in postData.bindEquipmentList">
					<p style="color:#3db0bf;">绑定设备</p>
					<p class="v-fb">
						<span>设备{{index+1}}:</span>
						<span>
							<span class="btn-agent" @click="deleteEquipment()">删除</span>
							<span class="btn-agent" @click="updateEquipment()">修改</span>
						</span>
					</p>
					<div class="v-fm">
						<p>设备编号</p>
						<input type="text" v-model="equipment.num" placeholder="请输入">
					</div>
					<div class="v-fm">
						<p>费率</p>
						<input type="text" v-model="equipment.rate" placeholder="请输入">
					</div>
					<div class="v-fm">
						<p>网监账号</p>
						<input type="text" v-model="equipment.networkSupervisorAccount" placeholder="请输入">
					</div>
				</div>
				<div class="v-fm addEquipment-btn-box" @click="addAgent">
					<p class="v-fcm addEquipment-btn">+</p>
					<p>添加设备</p>
				</div>
			</div>
		</div>
		<!-- 提交信息 -->
		<div class="submit-agent-info-btn v-fcm" @click="submitAgentInfo">提交信息</div>
	</div>
</template>

<script>
	import GLOBAL from '../GLOBAL';
	import axios from 'axios';
	export default {
		data() {
			return {
				readonly: true,
				postData: {
					"agent": {
						"name": "",
						"manager": "",
						"phone": "",
						"addr": ""
					},
					"bindEquipmentList": [{
						"num": "",
						"rate": "",
						"networkSupervisorAccount": ""
					}]
				}
			};
		},
		methods: {
			addAgent() {
				console.log('添加设备');
				this.postData.bindEquipmentList.push({
					"num": "",
					"rate": "",
					"networkSupervisorAccount": ""
				});
			},
			submitAgentInfo() {
				console.log('提交发送信息');
				console.log(JSON.stringify(this.postData));
				let _this = this;
				let equipmentsLen = this.postData.bindEquipmentList.length;
				console.log(equipmentsLen);
				let breakOut = false;
				for (let i = 0; i < equipmentsLen; i++) {
					console.log(this.postData.bindEquipmentList[i]);
					if (breakOut) {
						break;
					} else {
						for (let val in this.postData.bindEquipmentList[i]) {
							if (!this.postData.bindEquipmentList[i][val]) {
								console.log('设备' + (i + 1) + '的信息填写不全！');
								breakOut = true;
								break;
							}
						}
					}
				}
			},
			deleteEquipment(id){
				console.log('要删除的设备');
			},
			updateEquipment(id){
				console.log('要修改的设备');
			}
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
							"agentId": "1321312321"
						},
						{
							"agentName": "和被告石家庄代理商2",
							"agentImg": "../../static/img/book.png",
							"agentAddr": "1231321321312",
							"agentId": "321312321312"
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
	.addEquipment-btn-box {
		height: 4rem;
		&>p:first-child {
			border: 1px solid #3db0bf;
			color: #3db0bf;
			font-size: .7rem;
			border-radius: 50rem;
			width: 1.4rem;
			height: 1.4rem;
			margin-right: .2rem;
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
	
	.agent-box>div {
		height: 1.2rem;
		margin: .3rem 0;
		&>p {
			width: 4rem;
		}
		&>input {
			height: 1.2rem;
			border: 1px solid #bbbbbb;
			-webkit-box-flex: 1;
			/* android 2.1-3.0, ios 3.2-4.3 */
			-webkit-flex: 1;
			/* Chrome 21+ */
			-ms-flex: 1;
			/* WP IE 10 */
			flex: 1;
			/* android 4.4 */
		}
	}
	
	.submit-agent-info-btn {
		width: 100%;
		height: 2rem;
		position: absolute;
		bottom: 0;
		background-color: #3db0bf;
		color: #fff;
		z-index: 2;
	}
	.btn-agent{
		border:1px solid #d4d4d4;
		color:#3db0bf;
		text-align: center;
		vertical-align: middle;
		padding:.1rem .2rem;
		margin-right:.4rem;
		&:last-child{
			margin-right:0;
		}
	}
</style>

