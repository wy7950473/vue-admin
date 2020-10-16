import { reactive } from '@vue/composition-api';
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";

export function tableLoadData() {
    
    const tableData = reactive({
        item:[]
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
            if (responseData && responseData.length){
                tableData.item = responseData;
            }
        }).catch(error => {

        });
    }

    return {
        tableData,
        loadThisData
    }
}