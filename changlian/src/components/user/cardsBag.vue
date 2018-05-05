<template>
  <div>
    <!-- 卡包 -->
    <header class="header-poa-white v-fcm">
      <div class="v-fcm m-auto h-100 header-title" style="width:80%">卡包</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
      <router-link tag="div" :to="{name:'rechargeLog',params:{userId:userInfo.userId}}" @click="detail()" class="poa rt-0 v-fcm h-100" style="width:10%;color:#2daeec;">
        明细
      </router-link>
    </header>
    <div class="scroll-box">
      <div>
        <!-- 账户信息 -->
        <div class="v-fb cl-box" style="border-bottom:1px solid #d9d9d9;">
          <span>账户余额：<span class="cl-red">{{userInfo.balance}} 元</span></span>
          <span>赠送余额：<span class="cl-red">{{userInfo.giveMoney}} 元</span></span>
        </div>
        <!-- 卡片列表 -->
        <ul class="cards-list">
          <li v-for="card in rechargeCardsList" :key="card.ID">
            <p>{{card.buyCardTime}} 购卡</p>
            <div class="v-fb">
              <div>
                <p><span>充</span>&nbsp;<span><span>￥</span>{{card.cardPrice}}</span>
                </p>
                <p><span>余</span>&nbsp;<span><span>￥</span>{{card.cardBalance}}</span>
                </p>
              </div>
              <div class="book-mark v-fm">
                <ul>
                  <li>
                    <span></span>
                    <div></div>
                    <span></span>
                  </li>
                  <li>
                    <span></span>
                    <div></div>
                    <span></span>
                  </li>
                  <li>
                    <span></span>
                    <div></div>
                    <span></span>
                  </li>
                </ul>
              </div>
              <div>
                <p>
                  赠 <span>￥ {{card.cardGiveMoney}}</span>&nbsp;&nbsp;&nbsp;&nbsp;余
                  <span> ￥ {{card.cardGiveMoneyBalance}}</span>
                </p>
                <p style="font-size:.4rem;text-align:right;">限{{card.allowUseAddr}}充电站使用</p>
                <p class="tar" style="font-size:.4rem;text-align:right;">有效期至：{{card.giveMoneyEndTime}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import GLOBAL, {
    getUserInfo
  } from '../../GLOBAL';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userInfo: {},
        rechargeCardsList: []
      };
    },
    methods:{
      back(){
        this.$router.go(-1);
      }
    },
    created() {

      let _this = this;
			let getRechargeCardsList = GLOBAL.interfacePath + '/getRechargeCardsList?userId=' + sessionStorage.getItem('userId');
      axios
        .get(getRechargeCardsList)
        .then(function(data) {
          let res = data.data;
          if(res.code===200){
            console.log('getRechargeCardsList|返回数据|' + JSON.stringify(res.body));
						_this.rechargeCardsList = JSON.parse(res.body);
          }else{
            console.log(res.msg);
          }
          // data.data = [{
          //     ID: '001',
          //     buyCardTime: '2017-01-02 10:30',
          //     cardPrice: '100.00',
          //     cardBalance: '100.00',
          //     cardGiveMoney: '20.00',
          //     cardGiveMoneyBalance: '11.11',
          //     allowUseAddr: '石家庄天天家园小区',
          //     giveMoneyEndTime: '2017-01-01'
          //   },
          //   {
          //     ID: '001',
          //     buyCardTime: '2017-01-02 10:30',
          //     cardPrice: '100.00',
          //     cardBalance: '100.00',
          //     cardGiveMoney: '20.00',
          //     cardGiveMoneyBalance: '11.11',
          //     allowUseAddr: '石家庄天天家园小区',
          //     giveMoneyEndTime: '2017-01-01'
          //   }
          // ];
        })
        .catch(function(err) {
          console.log({
            'url': getRechargeCardsList,
            'err': JSON.stringify(err)
          });
        });
      // 获取用户信息
      getUserInfo().then(function(userInfo) {
        _this.userInfo = userInfo;
      });
    }
  };
</script>

<style lang="scss">
  @import "../../../static/css/common.scss";
  .cards-list {
    padding: 0rem .8rem;
    &>li {
      &>p {
        color: #666;
        margin-bottom: .1rem;
        font-size:.7rem;
      }
      margin-top: .8rem;
      &>div {
        position: relative;
        .book-mark {
          width: 1.2rem;
          height: 100%;
          margin-left: 34%;
          @include fm;
          position: absolute;
          top: 0;
          ul {
            width: 100%;
            height: 70%;
            li {
              height: 33.3%;
              @include fm;
              div {
                height: 4px;
                width: 100%;
                background-color: #fff;
                border-radius: 2px;
              }
              span {
                width: 6px;
                height: 6px;
                border-radius: 10px;
                background: rgba(66, 66, 66, 0.66);
                display: block;
              }
            }
          }
        }
        color: #fff;
        //卡片
        &>div:first-child {
          //左侧
          padding: .4rem 0 0 .5rem;
          width: 39%;
          font-size: .8rem;
          background-color: #fa8416;
          &>p {
            @include fm;
          }
          &>p {
            span:nth-child(1) {
              font-size: .7rem;
            }
            &:first-child {
              span:nth-child(2) {
                color: #d4d4d4;
              }
            }
          }
        }
        &>div:last-child {
          //右侧
          padding: .5rem 0 .2rem .7rem;
          width: 61%;
          background-color: #9940b8;
          &>p:first-child {
            border-bottom: 1px solid #bbb;
            span:first-child {
              color: #dedede;
            }
          }
          &>p:nth-child(2) {
            margin-top: .2rem;
          }
        }
      }
    }
  }
</style>

