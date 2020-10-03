import { getCategoryInfo } from "@/api/news";
import { reactive } from "@vue/composition-api";

export function common() {

    const categoryInfo = reactive({
        item:[]
    });

    const getInfoCategory = () => {
        getCategoryInfo({}).then(response => {
            categoryInfo.item = response.data.data.data;
        }).catch(error => {

        });
    }

    return {
        getInfoCategory,
        categoryInfo
    }
}