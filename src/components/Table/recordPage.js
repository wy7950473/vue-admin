import { reactive } from '@vue/composition-api';

export function recordPage(params) {
    
    const pageData = reactive({
        item:[]
    });

    const page = () => {
        console.log(1111);
    };

    return {
        pageData,
        page
    }
}