import { getCategoryInfo,GetCategoryAll } from "@/api/news";
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

    const getInfoCategoryAll = () => {
        GetCategoryAll({}).then(response => {
            categoryInfo.item = response.data.data;
        }).catch(error => {

        });
    }

    return {
        getInfoCategory,
        getInfoCategoryAll,
        categoryInfo
    }
}