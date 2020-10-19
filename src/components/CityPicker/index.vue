<template>
  <div class="overflow-h">
    <el-row :gutter="8">
      <el-col :span="6">
        <el-select v-model="data.provinceValue" @change="handlerProvince">
            <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"/>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select></el-select>
      </el-col>
      <el-col :span="6">
        <el-select></el-select>
      </el-col>
      <el-col :span="6">
        <el-select></el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetCityPicker } from "@/api/common";
import { onBeforeMount, reactive } from '@vue/composition-api';
export default {
  name: "cityPicker",
  setup(props, { root }) {

    const data = reactive({
        provinceValue:"",
        provinceData:[],
        cityData:[]
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
            console.log(data.cityData)
        }).catch(error => {

        })
    }

    onBeforeMount(() => {
        getProvince();
    }); 

    return {
        // reactive
        data,
        // method
        handlerProvince
    };
  }
};
</script>

<style lang="scss" scoped>
</style>