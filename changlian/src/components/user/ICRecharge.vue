<template>
  <div style="background-color:#f7f7f7;height:100%;">
    <header class="header v-fcm por">
      <div class="v-fcm m-auto h-100" style="width:80%">IC卡绑定</div>
      <div @click="back()" class="poa lt-0 v-fcm h-100" style="width:10%;">
        <span class="arrow-back"></span>
      </div>
    </header>
    <div class="bind-IC-box">
      <div>
        <div class="">
          <div class="v-fm">
            <span>卡号</span><span class="w-100 v-fm" v-text="ICCardInfo.num"></span>
          </div>
          <div class="v-fm">
            <span>余额</span><span class="w-100 v-fm" v-text="(ICCardInfo.balance||'')+'元'"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "Vue";
import axios from "axios";

export default {
  data() {
    return {
      ICCardInfo:{}
    };
  },
  created() {
    let ICCareInfoUro = "";
    let _this = this;
    axios
      .get(ICCareInfoUro)
      .then(function(data) {
        let data1= {
          "num":"321321321312321",
          "balance":"200.00"
        }
        _this.ICCardInfo = data1;
      })
      .catch(function(data) {});
  }
};
</script>
<style lang="scss">
.header {
  height: 2rem;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;
}
.arrow-back {
  width: 0.4rem;
  height: 0.4rem;
  border-left: 2px solid #616161;
  border-top: 2px solid #616161;
  transform: rotate(-45deg);
  margin-left: 0.5rem;
}
.bind-IC-box {
  padding: 0.5rem 0.6rem 1rem;
  & > div {
    & > div {
      border: 1px solid #e3e3e3;
      border-radius: 2px;
      margin-bottom: 1.5rem;
      & > div {
        background-color: #fff;
        height: 2rem;
        & > span {
          width: 3rem;
          text-align: center;
        }
        & input {
          width: 100%;
        }
        &:last-child {
          border-top: 1px solid #e3e3e3;
        }
      }
    }
  }
}
.btn-bind {
  width: 100%;
  height: 1.8rem;
  background-color: #ffc700;
  color: #fff;
  border-radius: 5px;
  font-size: 0.7rem;
}
</style>
