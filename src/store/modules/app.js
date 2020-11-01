import { Login } from "@/api/login";
import { setToken,setUsername,getUsername,removeToken,removeUsername } from "@/utils/app";

const state = {
  isCollapse: JSON.parse(window.sessionStorage.getItem("isCollapse")) || false,
  token:'',
  username: getUsername() || ''
}

const getters = {
  
}

const mutations = {
  SET_COLLPASE(state){
    state.isCollapse = !state.isCollapse;
    // HTML5 local storage
    window.sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state,value){
    state.token = value;
  },
  SET_USERNAME(state,value){
    state.username = value;
  }
}

const actions = {
  setMenuStatus(content,data){
    content.commit('SET_COLLPASE');
  },
  login(content,data){
    return new Promise((resolve,reject) => {
      Login(data).then(response => {
        let data = response.data.data;
        content.commit('SET_TOKEN',data.token);
        content.commit('SET_USERNAME',data.username);
        setToken(data.token);
        setUsername(data.username);
        resolve(response);
      }).catch(error => {
        reject(error);
      });
    })
  },
  exit(content){
    return new Promise((resolve,reject) => {
      removeToken();
      removeUsername();
      content.commit('SET_TOKEN','');
      content.commit('SET_USERNAME','');
      resolve();
    });
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions}
;