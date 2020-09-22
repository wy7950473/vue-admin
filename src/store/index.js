import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(window.sessionStorage.getItem("isCollapse")) || false
  },
  getters:{
    
  },
  mutations: {
    SET_COLLPASE(state){
      state.isCollapse = !state.isCollapse;
      // HTML5 local storage
      window.sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
    }
  },
  actions: {
  },
  modules: {
  }
})
