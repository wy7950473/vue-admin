import { GetCityPicker } from "@/api/common";
import {  reactive } from '@vue/composition-api';

export function cityPicker() {

    const data = reactive({
        provinceValue:"",
        cityValue:"",
        areaValue:"",
        streetValue:"",
        provinceData:[],
        cityData:[],
        areaData:[],
        streetData:[]
    });

    const resultData = reactive({
        provinceValue:"",
        cityValue:"",
        areaValue:"",
        streetValue:""
    });
    
    const getProvince = () => {
        let requestData = {
            type:"province"
        }
        getData(requestData);
    }

    const handlerProvince = (val) => {
        resetValue({type:"city"});
        let requestData = {
            type:"city",
            province_code:val
        }
        getData(requestData);
    }

    const handlerCity = (val) => {
        resetValue({type:"area"});
        let requestData = {
          type:"area",
          city_code:val
        }
        getData(requestData);
    }

    const handlerArea = (val) => {
        resetValue({type:"street"});
        let requestData = {
            type:"street",
            area_code:val
        }
        getData(requestData);
    }

    const getData = (params) => {
        GetCityPicker(params).then(response => {
            let responseData = response.data.data.data;
            data[`${params.type}Data`] = responseData;
        }).catch(error => {

        })
    }

    const handlerStreet = (val) => {
        resetValue({type:""});
    }

    const resetValue = (params) => {

        const valueJson = {
            city:["cityValue","areaValue","streetValue"],
            area:["areaValue","streetValue"],
            street:["streetValue"]
        }

        const arrObj = valueJson[params.type];

        if (arrObj) {
            arrObj.forEach(item => {
                data[item] = "";
            });
        }
        result();
    }

    const result = () => {
        for(let key in resultData){
            resultData[key] = data[key];
        }
    }

    return {
        // ...toRefs(data),
        data,
        resultData,
        getProvince,
        handlerProvince,
        handlerCity,
        handlerArea,
        handlerStreet
    }
}