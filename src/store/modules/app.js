import { Login } from "@/api/login";


const state = {
  isCollapse: JSON.parse(window.sessionStorage.getItem("isCollapse")) || false
}

const getters = {

}

const mutations = {
  SET_COLLPASE(state){
    state.isCollapse = !state.isCollapse;
    // HTML5 local storage
    window.sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
  }
}

const actions = {
  setMenuStatus(content,data){
    content.commit('SET_COLLPASE');
  },
  login(content,data){
      // console.log(content);
    return new Promise((resolve,reject) => {
      Login(data).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    })
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions}
;