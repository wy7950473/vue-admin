import { MessageBox } from 'element-ui';
import { ref } from "@vue/composition-api";

export function global(){
    const str = ref('');
    const confirm = (params) => {
        MessageBox.confirm(params.content,params.tip || '提示',{
            confirmButtonText:"确认",
            cancelButtonText:"取消",
            type:params.style || "warning",
            center:true
        }).then(() => {
            str.value = params.id || '';
            params.fn && params.fn(params.id);
        }).catch(() => {
            params.catchFn && params.catchFn();
        })
    }

    return {
        str,
        confirm
    }
}