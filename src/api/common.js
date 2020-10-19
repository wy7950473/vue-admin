import { getCategoryInfo,GetCategoryAll } from "@/api/news";
import { reactive } from "@vue/composition-api";
import service from "@/utils/request";

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

export function QiniuToken(data) {
    return service.request({
        method:"post",
        url:"/uploadImgToken/",
        data
    })
}

export function loadTableData(params){
    return service.request({
        method:params.method || "post",
        url:params.url,
        data:params.data || {}
    });
}

export function GetCityPicker(data){
    return service.request({
        method:"post",
        url:"/cityPicker/",
        data
    });
}