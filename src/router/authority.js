import router from "./index";
import { getToken,removeToken,removeUsername } from "@/utils/app";
import store from "@/store/index";

// 
const whiteRouter = ['/login','/register'];

/**
 * to : next page
 * from : previous page
 * next : 
 */
router.beforeEach((to,from,next) => {

    if (getToken()) {
        if (to.path === '/login') {
            removeToken();
            removeUsername();
            store.commit('app/SET_TOKEN','');
            store.commit('app/SET_USERNAME','');
            next();
        } else {
            if (store.getters['permission/roles'].length === 0) {
                store.dispatch("permission/getRole").then(response => {
                    store.dispatch("permission/createRouter",response).then(response => {
                        let addRouters = store.getters['permission/addRouters'];
                        let allRouters = store.getters['permission/allRouter'];
                        router.addRoutes(addRouters);
                        router.options.routes = allRouters;
                        // console.log(router.options.routes)
                        next({...to,replace:true});
                    })
                });
            } else {
                next();
            }
        }
    } else {
        if (whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next('/login');
        }
    }
  })