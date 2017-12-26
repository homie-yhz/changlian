<template>
	<div>
		<!-- 选择充电方式 -->
		<p class="mt-50">选择充电方式</p>
		<div class="method-box">
			<div :class="{'checked':postData.methodId === method.ID}" 
			class="v-fcm"
			@click="chooseChargeMethod(method)" 
			v-for="method in chargeMethods"
			:key="method.ID"
			>
				{{method.name}}
				<div v-if="postData.methodId === method.ID">
					<i class="icon-triangle"></i>
					<i class="icon-yes"></i>
				</div>
			</div>
		</div>
		<!-- 收费说明块 -->
		<p>收费标准说明</p>
		<ul class="charge-description">
			<li v-for="chargeDescriptionItem in stationDetail.chargeDescripetionList">
				<p>{{chargeDescriptionItem.wRange}}</p>
				<p>{{chargeDescriptionItem.priceRate}}</p>
			</li>
		</ul>
		<!-- 底部开始充电按钮 -->
    <div class="cl-footer v-fb">
      <div class="v-fcm v-i1" style="background-color:#f2f2f2;">
        <span class="v-i1 tac">余额：<span class="cl-red balance">{{userInfo.balance}}</span></span>
        <router-link :to="{name:'recharge'}" @click="recharge"  class="v-fcm btn-recharge">充值</router-link>
      </div>
      <div @click="startCharge" class="v-fcm btn-start-charge">开始充电</div>
    </div>
	</div>
</template>
<script>
export default {
	data(){
		return {
			postData: {
        stationPortId: "",
        chargeMethodId: ""
      },
      chargeMethods: [],
      stationDetail: {},
      userInfo:{}
		}
	},
	methods:{

	},
	created(){

	}
};
</script>
<style lang="scss">

</style>
