import { getCategoryInfo } from "@/api/news";

const state = {
    qiniuUrl:"http://qhxed3to4.hn-bkt.clouddn.com/",
    aaa:"Test"
}

const getters = {
    qiniuUrl: state => state.qiniuUrl
}

const mutations = {
    AAAAA(state,value){
        state.aaa = value;
    }
}

const actions = {
    getInfoCategory(content,requestData){
        return new Promise((resolve,reject) => {
            getCategoryInfo(requestData).then(response => {
                resolve(response);
            }).catch(error => {
                reject(error);
            })
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