import { getUserRoles } from "@/api/user";
import { defaultRouterMap,asyncRouterMap} from "@/router/index";
import { rule } from "_postcss@7.0.35@postcss";

const state = {
    roles:[],
    allRouter:defaultRouterMap,
    addRouters:[]
}

const getters = {
    roles:state => state.roles,
    allRouter:state => state.allRouter,
    addRouters:state => state.addRouters
}

const mutations = {
    SET_ROLE(state,value){
        state.roles = value;
    },
    SET_ROUTER(state,value){
        state.addRouters = value;
        state.allRouter = defaultRouterMap.concat(value);
    }
}

const actions = {
    getRole({commit},reauestData){
        return new Promise((resolve,reject) => {
            getUserRoles().then(response => {
                let data = response.data.data;
                commit('SET_ROLE',data);
                resolve(data);
            }).catch(error => {

            })
        })
    },
    createRouter({commit},reauestData){
        return new Promise((resolve,reject) => {
            let role = reauestData;
            let routers = [];
            if (rule.includes('admin')){
                routers = asyncRouterMap;
            } else {
                routers = asyncRouterMap.filter(item => {
                    if (role.includes(item.meta.system)){
                        return item;
                    }
                });
            }
            commit("SET_ROUTER",routers);
            resolve();
        }).catch(error => {

        });
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}