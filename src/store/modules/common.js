import { getCategoryInfo } from "@/api/news";

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
    actions
}