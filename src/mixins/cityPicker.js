import { GetCityPicker } from "@/api/common";
import {  reactive } from '@vue/composition-api';

export function cityPicker() {

    const  data = reactive({
        provinceValue:"",
        cityValue:"",
        areaValue:"",
        streetValue:"",
        provinceData:[],
        cityData:[],
        areaData:[],
        streetData:[]
    });
    
    const getProvince = () => {
        let requestData = {
            type:"province"
        }
        GetCityPicker(requestData).then(response => {
            let responseData = response.data.data.data;
            data.provinceData = responseData;
        }).catch(error => {

        })
    }

    const handlerProvince = (val) => {
        let requestData = {
            type:"city",
            province_code:val
        }
        GetCityPicker(requestData).then(response => {
            let responseData = response.data.data.data;
            data.cityData = responseData;
        }).catch(error => {

        })
    }

    const handlerCity = (val) => {
        let requestData = {
          type:"area",
          city_code:val
        }
        GetCityPicker(requestData).then(response => {
            let responseData = response.data.data.data;
            data.areaData = responseData;
        }).catch(error => {

        })
    }

    const handlerStreet = (val) => {
      let requestData = {
          type:"street",
          area_code:val
        }
        GetCityPicker(requestData).then(response => {
            let responseData = response.data.data.data;
            data.streetData = responseData;
        }).catch(error => {

        })
    }

    return {
        // ...toRefs(data),
        data,
        getProvince,
        handlerProvince,
        handlerCity,
        handlerStreet
    }
}