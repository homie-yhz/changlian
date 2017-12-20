<template>
	<router-link 
		tag="div"
		class="circle-box" 
		:class="{'circle-box-shine':shine}"
		:to="{name:'bindIc'}" 
		v-show='show'
		>
		<p class="v-fcm">{{num}}</p>
		<p>充电中</p>
	</router-link>
</template>
<script>
export default {
  data() {
    return {
			shine:false
		};
  },
  props: ["num", "show"],
  created(){
		let _this = this;
		setInterval(()=>{
			_this.shine = !_this.shine;
		},1000);
	}
};
</script>
<style lang="scss">
@import "../../../static/css/common.scss";
.circle-box{
	position: absolute;
	top:9.5rem;
	right: .5rem;
	width:2.5rem;
	height: 2.5rem;
	background-color:#e51c23;
	color:#fff;
	border-radius:50%;
	z-index:3;
	box-shadow: 0 0 10px #e51c23;
	transition: box-shadow 1s linear;
	&>p:first-child{
		width:1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: #fff;
		margin:0 auto;
		color:#e51c23;
		margin-top:.2rem;
		@include fcm;
	}
	&>p:last-child{
		@include fcm;
	}
}
.circle-box-shine{
	box-shadow: 0 0 23px #e51c23;
}
</style>
