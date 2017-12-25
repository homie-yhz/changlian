<template>
	<div class="cl-mask">
		<div>
			<div class="title">
				<span class="titleName">电站绑定提示</span>
				<i class="icon-close" @click="closeClAlert"></i>
			</div>
			<div class="content">
				&nbsp;&nbsp;&nbsp;&nbsp;需要先绑定任意一个电站后方可充值充电。
			</div>
			<router-link tag="div" :to="{name:'nearbyStation'}" class="btn-box">
				马上绑定
			</router-link>
		</div>
	</div>
</template>
<script>
export default {
	props:['showClAlert'],
	data(){
		return {
				
		}
	},
	methods:{
		closeClAlert(){
			this.$emit('closeClAlert',false);
		}
	}
}
</script>
<style lang="scss">
@import '../../../static/css/common.scss';
.cl-mask{
	position: absolute;
	width:100%;
	height:100%;
	top:0;
	left:0;
	@include fcm;
	&>div{
		position: absolute;
		z-index:10;
		width:80%;
		border:1px solid #ccc;
		background-color: #fff;
	}
	.title{
		@include fcm;
		padding:0 1rem;
		text-overflow: ellipsis;
		overflow: hidden;
		border-bottom:1px solid #ccc;
		height:1.5rem;
	}
	.icon-close{
		width:1rem;
		position: absolute;
		right: 0;
		height: 1rem;
		@include fcm;
		background:url('../../../static/img/star.png') center center no-repeat;
		background-size:100% 100%;
	}
	.content{
		padding:.5rem;
		height: 4rem;
	}
	.btn-box{
		margin:.5rem auto;
		width:70%;
		border:1px solid #2daeec;
		border-radius:4px;
		color:#2daeec;
		@include fcm;
		height:1.8rem;
	}
}
</style>

