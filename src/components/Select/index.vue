<template>
    <el-select v-model="data.selectValue">
       <el-option
            v-for="item in data.option"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>                                                                                                                                                     
</template>

<script>
import { onMounted, reactive, ref } from '@vue/composition-api'
export default {
    name:"",
    props:{
        config:{
            type:Array,
            default:() => []
        }
    },
    setup(props,{root}){

        const data = reactive({
            selectValue:"",
            option:[
                { value:"name",label:"姓名"},
                { value:"phone",label:"手机" },
                { value:"email",label:"邮箱"}        
            ]
        });

        let initOption = () => {
            let optionArr = [];
            props.config.forEach(item => {
                let arr = data.option.filter(elem => elem.value == item)[0];
                optionArr.push(arr);
            })
            data.option = optionArr;
            data.selectValue = optionArr[0].value;
        }

        onMounted(() => {
            initOption();
        })

        return {
            // reactive
            data
        }
    }
}
</script>

<style lang="scss" scoped>

</style>