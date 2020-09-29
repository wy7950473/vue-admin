import { MessageBox } from 'element-ui';

export default {
    install(Vue,op,any){
        Vue.prototype.confirm = (params) => {
            MessageBox.confirm(params.content, params.tip || "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: params.type || "warning",
                    center: true
                })
                .then(() => {
                    if(params.fn){
                        params.fn(params.id);
                    }
                })
                .catch(() => {
                    
                });
            }
    }
}