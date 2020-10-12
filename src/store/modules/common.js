import { getCategoryInfo } from "@/api/news";

const state = {
    qiniuUrl:"http://qhxed3to4.hn-bkt.clouddn.com/"
}

const getters = {
    qiniuUrl: state => state.qiniuUrl
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
    actions
}