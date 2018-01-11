<template>
	<div>
		<header class="header-poa-white v-fcm por">
			<div class="v-fcm m-auto h-100" style="width:80%">常用电站</div>
			<div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
				<span class="arrow-back"></span>
			</div>
		</header>
		<!-- 选择充电方式 -->
		<div class="scroll-box">
			<div>
				<!-- 设备相关信息 -->
				<div class="equitment-box v-fb v-fm" style="background-color:#fff;">
					<div class="">
						<!-- 设备地址 -->
						<p>{{equipment.addr}}</p>
						<!-- 设备编号 -->
						<p>设备编号：{{equipment.num}}</p>
					</div>
					<div class="v-fcm icon-equipment-num">{{equipment.index}}</div>
				</div>
				<div class="blank"></div>
				<div class="cl-box">
	
					<!-- 选择充电方式模块 -->
					<p>选择充电方式</p>
					<div class="method-box">
						<div :class="{'checked':postData.chargeMethodId === method.ID}" class="v-fcm" @click="chooseChargeMethod(method)" v-for="method in chargeMethods" :key="method.ID">
							{{method.name}}
							<div v-if="postData.chargeMethodId === method.ID">
								<i class="icon-triangle"></i>
								<i class="icon-yes"></i>
							</div>
						</div>
					</div>
	
					<!-- 收费说明块 -->
					<p class="mt-10">收费标准说明</p>
					<ul class="charge-description">
						<li v-for="chargeDescriptionItem in stationDetail.chargeDescripetionList">
							<p>{{chargeDescriptionItem.wRange}}</p>
							<p>{{chargeDescriptionItem.priceRate}}</p>
						</li>
					</ul>
	
					<!-- 余额  以及  去充值 -->
					<div class="v-fb v-fm v-i1" style="margin-top:1rem;">
						<span class="tac">余额：<span class="cl-red balance">{{userInfo.balance}} 元</span></span>
						<router-link :to="{name:'recharge'}" @click="recharge" class="v-fcm btn-recharge">去充值</router-link>
					</div>
	
					<!-- 开始充电按钮 -->
					<div @click="startCharge" class="v-fcm btn-start-charge">开始充电</div>
	
				</div>
			</div>
		</div>
	
		<!-- 底部开始充电按钮 -->
		<div class="cl-footer v-fb">
		</div>
	</div>
</template>

<script>
import axios from "axios";
import GLOBAL, { getUserInfo } from "../GLOBAL";
import { Toast } from "mint-ui";
import "mint-ui/lib/toast/style.css";
export default {
  data() {
    return {
      postData: {
        stationPortId: "",
        chargeMethodId: ""
      },
      chargeMethods: [],
      stationDetail: {},
      userInfo: {},
      equipment: {}
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 选择充电模式
    chooseChargeMethod(method) {
      console.log(method.ID);
      // 充电模式存入postData
      this.postData.chargeMethodId = method.ID;
    },
    // 开始充电
    startCharge() {
      if (this.userInfo.balance - 0.1 < 0) {
        Toast("余额不足！无法充电！");
      } else if (!this.postData.chargeMethodId) {
        Toast("请选择充电方式");
      } else {
        if (this.userInfo.balance - 1 < 0) {
          Toast("余额过低！请及时充值！");
          setTimeout(() => {
            this.$router.push({
              name: "charging"
            });
          }, 1000);
				}else{
					this.$router.push({
              name: "charging"
            });
				}
				
        console.log(JSON.stringify(this.postData));
      }
    },
    // 充值
    recharge() {
      console.log("点击充值");
    }
  },
  created() {
    this.stationDetail = {
      chargeDescripetionList: [
        {
          wRange: "0<功率≤200瓦",
          priceRate: ".5元/小时"
        },
        {
          wRange: "0<功率≤200瓦",
          priceRate: ".5元/小时"
        },
        {
          wRange: "999<功率≤200瓦",
          priceRate: ".5元/小时"
        },
        {
          wRange: "999<功率≤200瓦",
          priceRate: ".5元/小时"
        }
      ]
    };

    let _this = this;
    // let chargeMethodsUrl = GLOBAL.interfacePath + '';
    let chargeMethodsUrl = "";
    axios
      .get(chargeMethodsUrl)
      .then(function(data) {
        data.data = [
          {
            name: "充满自停",
            ID: "full"
          },
          {
            name: "1小时",
            ID: "1"
          },
          {
            name: "2小时",
            ID: "2"
          },
          {
            name: "3小时",
            ID: "3"
          },
          {
            name: "5小时",
            ID: "5"
          },
          {
            name: "8小时",
            ID: "8"
          }
        ];
        console.log("chargeMethodsUrl|返回数据|" + JSON.stringify(data.data));
        _this.chargeMethods = data.data;
      })
      .catch(function(err) {
        console.log({
          url: chargeMethodsUrl,
          err: JSON.stringify(err)
        });
      });

    getUserInfo().then(function(userInfo) {
      _this.userInfo = userInfo;
    });
  }
};
</script>

<style lang="scss">
@import "../../static/css/common.scss";
.equitment-box {
  padding: 0.5rem 0.8rem;
  background-color: #2daeec;
  & > div > p:first-child {
    margin-bottom: 0.4rem;
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

.method-box {
  display: flex;
  flex-wrap: wrap;
  & > div {
    position: relative;
    border: 1px solid #8a8a8a;
    border-radius: 4px;
    width: 30%;
    height: 1.6rem;
    margin-right: 5%;
    margin-top: 0.5rem;
    overflow: hidden;
    &:nth-child(3n) {
      margin-right: 0;
    }
    &.checked {
      border: 1px solid #2eafed;
      color: #2eafed;
    }
    .icon-triangle {
      position: absolute;
      right: 0;
      bottom: -1rem;
      display: block;
      border: 1rem solid transparent;
      border-right: 1rem solid #2eafed;
    }
    .icon-yes {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0.6rem;
      height: 0.6rem;
      z-index: 2;
      background: url("../../static/img/yes-white.png") top right no-repeat;
      background-size: 100% 100%;
    }
  }
}

// 收费说明
.charge-description {
  margin-bottom: 0.5rem;
  @include fw;
  li {
    width: 30%;
    margin: 0.5rem 5% 0 0;
    height: 2.5rem;
    border: 1px solid #2daeec;
    border-radius: 4px;
    background-color: #f7f7f7;
    p {
      text-align: center;
      font-size: 0.5rem;
      margin-top: 0.3rem;
      &:last-child {
        color: #2daeec;
        font-size: 0.6rem;
        margin-top: 0.2rem;
      }
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

// 去充值按钮
.btn-recharge {
  height: 1.5rem;
  width: 4rem;
  border-radius: 4px;
  color: #2daeec;
  border: 1px solid #2daeec;
  @include fcm;
}

// 开始充电按钮
.btn-start-charge {
  background-color: #2daeec;
  @include fcm;
  width: 100%;
  height: 1.8rem;
  border-radius: 4px;
  margin-top: 1rem;
  color: #fff;
}
</style>
