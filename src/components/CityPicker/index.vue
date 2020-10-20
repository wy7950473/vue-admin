<template>
  <div class="overflow-h">
    <el-row :gutter="8">
      <el-col :span="6" v-if="init.province">
        <el-select v-model="data.provinceValue" @change="handlerProvince">
            <el-option v-for="item in data.provinceData" :key="item.PROVINCE_CODE" :value="item.PROVINCE_CODE" :label="item.PROVINCE_NAME"/>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.city">
        <el-select v-model="data.cityValue" @change="handlerCity">
          <el-option v-for="item in data.cityData" :key="item.CITY_CODE" :value="item.CITY_CODE" :label="item.CITY_NAME"/>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.area">
        <el-select v-model="data.areaValue" @change="handlerArea">
          <el-option v-for="item in data.areaData" :key="item.AREA_CODE" :value="item.AREA_CODE" :label="item.AREA_NAME"/>
        </el-select>
      </el-col>
      <el-col :span="6" v-if="init.street">
        <el-select v-model="data.streetValue" @change="handlerStreet">
           <el-option v-for="item in data.streetData" :key="item.STREET_CODE" :value="item.STREET_CODE" :label="item.STREET_NAME"/>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { onBeforeMount, reactive, watch } from '@vue/composition-api';
import { cityPicker } from "@/mixins/cityPicker";
export default {
  name: "cityPicker",
  props:{
    cityPickerData:{
      type:Object,
      default:() => {}
    },
    cityPickerLavel:{
      type:Array,
      default:() => []
    }
  },
  setup(props, { root,emit }) {

    const {
      data,
      resultData,
      getProvince,
      handlerProvince,
      handlerCity,
      handlerArea,
      handlerStreet
    } = cityPicker();

    const init = reactive({
      province:false,
      city:false,
      area:false,
      street:false
    })

    watch(() => [resultData.provinceValue,resultData.cityValue,resultData.areaValue,resultData.streetValue],
          ([provinceValue,cityValue,areaValue,streetValue]) => {
        emit("update:cityPickerData",resultData)
    });

    const initCityPicker = () => {
      let initData = props.cityPickerLavel;
      if (initData.length == 0){
        for(let key in initData){
          init[key] = true;
        }
      } else {
        initData.forEach(item => {
          init[item] = true;
        })
      }
    }

    onBeforeMount(() => {
        getProvince();
        initCityPicker();
    }); 

    return {
        // reactive
        data,
        init,
        // method
        handlerProvince,
        handlerCity,
        handlerArea,
        handlerStreet
    };
  }
};
</script>

<style lang="scss" scoped>
</style>