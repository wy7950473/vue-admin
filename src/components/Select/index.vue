<template>
    <el-select v-model="data.selectValue">
       <el-option
            v-for="item in data.initOptionValue"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
    </el-select>                                                                                                                                                     
</template>

<script>
import { onMounted, reactive, ref, watch } from '@vue/composition-api'
export default {
    name:"selectIndex",
    props:{
        config:{
            type:Array,
            default:() => []
        },
        search_key:{
            type:String,
            default:""
        }
    },
    setup(props,{root,emit}){

        const data = reactive({
            selectValue:"",
            initOptionValue:[],
            option:[
                { value:"name",label:"姓名"},
                { value:"phone",label:"手机" },
                { value:"email",label:"邮箱"},
                { value:"id",label:"ID"},
                { value:"title",label:"标题"}        
            ]
        });

        watch(() => data.selectValue,(value) => {
            emit("update:search_key",value);
        }); 

        let initOption = () => {
            if (props.config.length === 0) {
                return false;
            }
            let optionArr = [];
            props.config.forEach(item => {
                let arr = data.option.filter(elem => elem.value == item);
                if (arr.length > 0) {
                    optionArr.push(arr[0]);
                }
            });
            if (optionArr.length === 0) {
                return false;
            }
            data.initOptionValue = optionArr;
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