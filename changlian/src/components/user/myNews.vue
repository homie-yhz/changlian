<template>
	<div>
		<!-- 充电记录 -->
		<header class="header-poa-white v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">消息中心</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="scroll-box">
			<div class="chargeElecLog-list" style="position:relative;height:100%;">
				<scroller :on-refresh="refresh" :height="height" :is-no-more-data="hasNext" :on-infinite="infinite" ref="scrollDom" :no-data-text="noDataText">
					<ul>
						<li style="background-color:#f5f5f5;" v-if="newsList.length>0" class="" v-for="news in newsList" :key="news.id">
							<div class="v-fb">
								<p style="font-weight:bold;">{{news.title}}</p>
								<p style="color:#666;">{{news.createTime|timestampToEnglishData}}</p>
							</div>
							<div style="color:#666;">{{news.content||'无'}}</div>
						</li>
					</ul>
				</scroller>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue';
	import GLOBAL from '../../GLOBAL';
	import axios from 'axios';
	import 'mint-ui/lib/style.css'
	import {
		Spinner
	} from 'mint-ui';
	import {
		timestampToData,
		SToHM,
		timestampToEnglishData
	} from "../../Filter";
	timestampToEnglishData();
	Vue.component('mt-spinner', Spinner);
	import VueScroller from "vue-scroller";
	Vue.use(VueScroller);
	export default {
		data() {
			return {
				newsList: [],
				hasNext: true,
				postData: {
					currentPage: 0,
					listLen: 10,
					userId:localStorage.getItem('userId')
				},
				scrollState: '',
				height: '100%',
				noDataText: '没有更多数据！'
			};
		},
		methods: {
			back() {
				this.$router.go(-1);
			},
			refresh(done) {
				console.log("refresh-1");
				this.scrollState = "refresh";
				this.postData.currentPage = 0;
				this.hasNext = true;
				let _this = this;
				if (this.hasNext) {
					_this.loadMore(done);
				} else {
					console.log(`没有更多数据`);
					this.$refs.scrollDom.finishInfinite(true);
				}
			},
			infinite(done) {
				if (this.hasNext && this.scrollState === "") {
					console.log("loadmore-1");
					this.loadMore(done);
				} else {
					console.log(`没有更多数据`);
					this.$refs.scrollDom.finishInfinite(true);
				}
			},
			loadMore(done) {
				let _this = this;
				this.postData.currentPage++;
				//let getChargeElecLogListUrl = GLOBAL.interfacePath + '';
				let getNewsCenter = GLOBAL.interfacePath + '/clyun/getNewsCenter?body=' + JSON.stringify(this.postData);
				console.log(getNewsCenter);
				axios
					.get(getNewsCenter)
					.then(function(data) {
						console.log('充电记录列表', data.data);
						let res = data.data;
						if (res.code === 200) {
							let res = data.data;
							if (res.code === 200) {
								console.log('in');
								if (_this.scrollState === "refresh") {
									_this.newsList = [];
								}
								_this.newsList = _this.newsList.concat(
									res.body.newsCenterList
								);
								_this.hasNext = res.body.hasNext;
								_this.scrollState = "";
	
								if (_this.newsList.length === 0) {
									let noDataDom = document.getElementsByClassName("no-data-text")[0];
									let noDataMsgHtml =
										'暂无充电记录！';
									noDataDom.innerHTML = noDataMsgHtml;
								} else {
									_this.noDataText = "没有更多数据！";
								}
								_this.$nextTick(function() {
									_this.$refs.scrollDom.resize();
								});
								done();
							}
						}
					})
					.catch(function(err) {
						console.log({
							'url': getNewsCenter,
							'err': JSON.stringify(err)
						});
					});
			}
		}
	};
</script>

<style lang="scss">
	@import "../../../static/css/common.scss";
	.chargeElecLog-list {
		& ul {
			li {
				padding: .4rem .6rem;
				border-bottom: 1px solid #cfcfcf;
				&>div {
					margin-bottom: .2rem;
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
	
	.icon-time {
		display: block;
		width: .9rem;
		height: .9rem;
		background: url('../../../static/img/clock-blue.png') center center no-repeat;
		background-size: 100% 100%;
	}
	
	.icon-money {
		display: block;
		width: .9rem;
		height: .9rem;
		background: url('../../../static/img/money.png') center center no-repeat;
		background-size: 100% 100%;
	}
</style>

