<template>
	<div>
		<header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">充电</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
		<div class="equitment-box v-fb v-fm">
			<div class="">
				<!-- 设备地址 -->
				<p>{{equipment.addr}}</p>
				<!-- 设备编号 -->
				<p>设备编号：{{equipment.num}}</p>
			</div>
			<div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
		</div>
		<div class="blank"></div>
		<div class="pd-80">
			<p>选择充电方式</p>
			<div class="method-box">
				<div :class="{'checked':postData.methodId === method.ID}" @click="chooseChargeMethod(method)" class="v-fcm" v-for="method in methods">
					{{method.name}}
					<i v-if="postData.methodId === method.ID"></i>
				</div>
			</div>
		</div>
		<div class="v-fb v-fm" style="margin-top:1rem;margin-bottom:.5rem;padding:0 .8rem;">
			<span>余额：<span style="color:#e51c23">{{balance}} 元</span></span>
			<p style="width:2rem;border:1px solid #19d64e;color:#19d64e;border-radius:3px;" class="v-fcm">充值</p>
		</div>
		<div style="padding:.2rem .8rem;height:4rem;">
			<div @click="startCharge" class="btn">开始充电</div>
		</div>
	</div>
</template>
<script>
import GLOBAL from "../GLOBAL";
import axios from "axios";
import { Toast } from 'mint-ui'
import 'mint-ui/lib/toast/style.css';
export default {
  data() {
    return {
      equipment: {
        addr: "龙锦苑东五区充电站",
				num: "3213213213123",
				index:"2",
				ID:"123"
      },
      methods: [
        { name: "充满自停", ID: "full" },
        { name: "1小时", ID: "1" },
        { name: "2小时", ID: "2" },
        { name: "3小时", ID: "3" },
        { name: "5小时", ID: "5" },
        { name: "8小时", ID: "8" }
      ],
			methodId: "",
			balance:"100.00",
			postData:{
				methodId:""
			}
    };
  },
  methods: {
		// 选择充电模式
    chooseChargeMethod(method) {
			console.log(method.ID);
			// 充电模式存入postData
      this.postData.methodId = method.ID;
		},
		// 开始充电
		startCharge(){
			//设备ID存入postData
			this.postData.equipmentId = this.equipment.ID;
			console.log(JSON.stringify(this.postData));
			if(!this.postData.methodId){
				Toast('请选择充电模式！');
			}
			else if(this.balance <= 0){
				Toast('余额不足！')
			}
			else{
				let startChargeUrl = GLOBAL.interfacePath + "";
				axios
					.get(startChargeUrl)
					.then(function(data) {
						console.log("equipmentInfoUrl|返回数据|" + JSON.stringify(data.data));
					})
					.catch(function(err) {
						console.log({ url: startChargeUrl, err: JSON.stringify(err) });
					});
			}
		}
  },

  created() {
    let equipmentInfoUrl = GLOBAL.interfacePath + "";
    axios
      .get(equipmentInfoUrl)
      .then(function(data) {
        console.log("equipmentInfoUrl|返回数据|" + JSON.stringify(data.data));
      })
      .catch(function(err) {
        console.log({ url: equipmentInfoUrl, err: JSON.stringify(err) });
      });
  }
};
</script>
<style lang="scss">
@import "../../static/css/common.scss";
.method-box {
  display: flex;
  flex-wrap: wrap;
  & > div {
    position: relative;
    border: 1px solid #8a8a8a;
    border-radius: 4px;
    width: 28%;
    height: 1.6rem;
    margin-right: 8%;
    margin-top: .8rem;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.checked {
      border: 1px solid #19d64e;
      color: #19d64e;
    }
    i {
      position: absolute;
      right: 0;
      bottom: 0;
      display: block;
      width: 1rem;
      height: 0.5rem;
      background-color: red;
    }
  }
}
.equitment-box {
  padding: 0.5rem 0.8rem;
  & > div>p:first-child {
    margin-bottom: 0.4rem;
  }
}
.icon-equipment-num{
	border-radius:100rem;
	height: 2rem;
	width:2rem;
	background-color: #ff9800;
	color:#fff;
	font-size:.9rem;
}
</style>
