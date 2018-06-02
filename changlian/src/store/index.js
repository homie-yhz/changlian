import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    update:0,
    chargingData:{}
  },
  mutations: {
    increment (state) {
			state.update++;
			console.log('改变：'+state.update);
    },
    getWSData(state,WSData){
      state.chargingData = WSData; 
    }
  }
})