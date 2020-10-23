import { reactive } from '@vue/composition-api';
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";

export function tableLoadData() {
    
    const tableData = reactive({
        item:[],
        total:0
    });

    const loadThisData = (params) => {
        let requestJson = params;
        // console.log(requestJson);
        let requestData = {
            url:requestUrl[requestJson.url],
            method:requestJson.method,
            data:requestJson.data
        }
        loadTableData(requestData).then(response => {
            let responseData = response.data.data.data;
            // console.log(responseData);
            tableData.item = responseData;
            tableData.total = responseData.length === 0 ? 0 : response.data.data.total;
            // if (responseData && responseData.length){
            //     tableData.item = responseData;
            //     tableData.total = response.data.data.total;
            // }
        }).catch(error => {

        });
    }

    return {
        tableData,
        loadThisData
    }
}