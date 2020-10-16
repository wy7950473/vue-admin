<template>
     <el-table :data="data.tableData" style="width: 100%"  border>
        <el-table-column v-if="data.tableConfig.selection" type="selection" width="40"></el-table-column>
        <template v-for="item in data.tableConfig.tHead" >
            <el-table-column :key="item.field" :prop="item.field" 
                :label="item.label" v-if="item.columnType === 'slot'">
                <template slot-scope="scope">
                    <slot :name="item.slotName" :myData="scope.row"></slot>
                </template>
            </el-table-column>
            <el-table-column
                :key="item.field" 
                :prop="item.field" 
                :label="item.label"
                :width="item.width"
                v-else/>
        </template>
    </el-table>
</template>

<script>
import { onBeforeMount, reactive,watch } from '@vue/composition-api';
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
import { tableLoadData } from "./loadTableData";
import { recordPage } from "./recordPage";
export default {
    name:"tableIndex",
    props:{
        config:{
            type:Object,
            default:() => {}
        }
    },
    setup(props,{root}){

        const { tableData,loadThisData } = tableLoadData();

        const { pageData,page } = recordPage();

        // console.log(config.tHead);

        const data = reactive({
            tableConfig:{
                selection: true,
                recordCheckbox:true,
                requestData:{},
                tHead:[]
            },
            tableData:[]
        });

        watch(() => tableData.item,(value) => {
            data.tableData = value;
        })

        const initTableConfig = () => {
            let configData = props.config;
            let keys = Object.keys(data.tableConfig);
            for (let key in configData){
                if (keys.includes(key)) {
                    data.tableConfig[key] = configData[key];
                }
            }
        };  

        onBeforeMount(() => {
            initTableConfig();
            loadThisData(data.tableConfig.requestData);
            page();
        });
        
        return {
            data
        }
    }
}
</script>

<style lang="scss" scoped>

</style>