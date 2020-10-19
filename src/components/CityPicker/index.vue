<template>
  <div class="overflow-h">
    <el-row :gutter="8">
      <el-col :span="6">
        <el-select v-model="data.provinceValue" @change="handlerProvince">
            <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"/>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.cityValue" @change="handlerCity">
          <el-option v-for="item in data.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"/>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.areaValue" @change="handlerStreet">
          <el-option v-for="item in data.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"/>
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-select v-model="data.streetValue">
           <el-option v-for="item in data.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"/>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetCityPicker } from "@/api/common";
import { onBeforeMount, reactive } from '@vue/composition-api';
import { cityPicker } from "@/mixins/cityPicker";
export default {
  name: "cityPicker",
  props:{
    cityPickerData:{
      type:Object,
      default:() => {}
    }
  },
  setup(props, { root,emit }) {

    const {data,getProvince,handlerProvince,handlerCity,handlerStreet } = cityPicker();

    onBeforeMount(() => {
        getProvince();
    }); 

    return {
        // reactive
        data,
        // method
        handlerProvince,
        handlerCity,
        handlerStreet,
    };
  }
};
</script>

<style lang="scss" scoped>
</style>