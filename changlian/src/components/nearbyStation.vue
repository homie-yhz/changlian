<template>
  <div style="padding:.2rem .4rem;border:1px solid red;">
    <div>
    <div class="v-fm">
      <input type="text" placeholder="fdsaf" style="border:1px solid black;border-radius:3px;" v-model="searchInfo">
      <p class="v-fcm">
        <i class="icon-star">常用</i>
        <span>常用</span>
      </p>
    </div>
    <ul>
      <li class="v-f">
        <div>
          <p>龙锦苑东</p>
          <p>
            <span>现金</span>
            <span>APP支付+</span>
          </p>
          <p>
            <span>
              <span>共</span><span>10</span>
            </span>
            <span>
              <span>闲</span><span>2</span>
            </span>
          </p>
        </div>
        <div>快充</div>
        <div>300m</div>
      </li>
      <li class="v-f">
        <div>
          <p>龙锦苑东</p>
          <p>
            <span>现金</span>
            <span>APP支付</span>
          </p>
          <p>
            <span>
              <span>共</span><span>10</span>
            </span>
            <span>
              <span>闲</span><span>2</span>
            </span>
          </p>
        </div>
        <div>快充</div>
        <div>300m</div>
      </li>
      <li class="v-fcm">附近4公里范围内没有更多站点了</li>
    </ul>
    </div>
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      searchInfo:''
    }
  }
}
</script>
<style>

</style>
