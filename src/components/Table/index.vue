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
import { onBeforeMount, reactive } from '@vue/composition-api'
export default {
    name:"tableIndex",
    props:{
        config:{
            type:Object,
            default:() => {}
        }
    },
    setup(props,{root}){

        // console.log(config.tHead);

        const data = reactive({
            tableConfig:{
                selection: true,
                recordCheckbox:true,
                tHead:[]
            },
            tableData:[{
                email: '2016-05-02',
                name: '王小虎',
                phone:"152222",
                address: '上海市普陀区金沙江路 1518 弄',
                role:""
            },
            {
                email: '2016-05-02',
                name: '王小虎',
                phone:"152222",
                address: '上海市普陀区金沙江路 1518 弄',
                role:""
            }]
        });

        const initTableConfig = () => {
            let configData = props.config;
            for (let key in configData){
                if (data.tableConfig[key]) {
                    data.tableConfig[key] = configData[key];
                }
            }
        };  

        onBeforeMount(() => {
            initTableConfig();
        });
        
        return {
            data
        }
    }
}
</script>

<style lang="scss" scoped>

</style>