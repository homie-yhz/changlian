<template>
	<div>
		<header class="header-poa v-fcm">
			<div class="v-fcm m-auto h-100" style="width:80%">IC卡充值</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<div class="scroll-box">
			<div class="ICCard-charge">
				<ul>
					<li v-for="ICCard in ICCardList">
						<router-link :to="{name: 'ICCardRecharge',params:{ICCardId:ICCard.ID}}" class="v-fm">
							<span>IC卡</span> <span class="v-i1">{{ICCard.num}}</span>
						</router-link>
					</li>
					<li class="add-ICCard v-fm">
						<router-link class="v-fm" :to="{name:'bindIC'}">
							<span>＋</span>
							<span class="v-i1">添加IC卡</span>
							<span class="icon-right"></span>
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import GLOBAL from '../GLOBAL';
	import axios from 'axios';
	export default {
		data() {
			return {
				ICCardList: [{
						num: "1231232131",
						ID: "fdsafadsf"
					},
					{
						num: "2",
						ID: "fdsafadsf"
					},
					{
						num: "3",
						ID: "fdsafadsf"
					},
					{
						num: "3",
						ID: "fdsafadsf"
					}
				]
			};
		},
		created() {
			let ICCardListUrl = GLOBAL.interfacePath + "";
			axios
				.get(ICCardListUrl)
				.then(function(data) {
					console.log("ICCardListUrl|返回数据|" + JSON.stringify(data.data));
				})
				.catch(function(err) {
					console.log({
						url: ICCardListUrl,
						err: JSON.stringify(err)
					});
				});
		}
	};
</script>

<style lang="scss">
	@import "../../static/css/common.scss";
	.ICCard-charge {
		padding: 0.7rem 1rem;
		&>ul>li {
			margin-bottom: 0.6rem;
			background-color: #faf355;
			box-shadow: 0 0 5px #994e09;
			border-radius: 5px;
			&>a {
				height: 4rem;
				width: 100%;
				padding: 0 .4rem;
				color: #bd6c0d;
				font-size: .8rem;
				&>span:last-child {
					display: block;
					margin-left: 1rem;
					word-wrap: break-word;
					word-break: break-all;
				}
			}
			&:last-child {
				height: 1.5rem;
				width: 100%;
				background-color: #fff;
				box-shadow: 0 0 0;
				border: 1px solid #bbb;
				&>a:last-child{
					height: 100%;
					color: #adadad!important;
					padding:0;
				}
				span {
					&:first-child {
						margin: 0 .3rem 0 .2rem;
						font-size: 1rem;
					}
					&:last-child {
						margin-right: .4rem!important;
					}
				}
			}
		}
	}
</style>

