import { MessageBox } from 'element-ui';
import { ref } from "@vue/composition-api";

export function global(){
    const str = ref('');
    const confirm = () => {
           
    }

    return {
        str,
        confirm
    }
}