<template>
    <div>
        <el-table :data="data.tableData" style="width: 100%"  border @selection-change="thatSelectCheckbox">
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
        <div class="table-footer">
            <el-row>
                <el-col :span="4">
                    <slot name="tableFooterLeft"></slot>
                </el-col>
                <el-col :span="20">
                    <el-pagination
                        class="pull-right"
                        v-if="data.tableConfig.pagination.show"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageData.currentPage"
                        :page-sizes="pageData.pageSizes"
                        :page-size="pageData.pageSize"
                        :layout="data.tableConfig.pagination.layout"
                        :total="pageData.total">
                    </el-pagination>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import { onBeforeMount, reactive,watch } from '@vue/composition-api';
import { requestUrl } from "@/api/requestUrl";
import { loadTableData } from "@/api/common";
import { tableLoadData } from "./loadTableData";
import { pagination } from "./paginationHook";
import { recordPage } from "./recordPage";
export default {
    name:"tableIndex",
    props:{
        config:{
            type:Object,
            default:() => {}
        },
        tableRow:{
            type:Object,
            default:() => {}
        }
    },
    setup(props,{root,emit}){

        const { tableData,loadThisData } = tableLoadData();

        // const { pageData,page } = recordPage();

        const { pageData,handleSizeChange,handleCurrentChange,totalCount} = pagination();

        // console.log(config.tHead);

        const data = reactive({
            tableConfig:{
                selection: true,
                recordCheckbox:true,
                requestData:{},
                tHead:[],
                pagination:{}
            },
            tableData:[]
        });

        watch(() => [tableData.item,tableData.total],([tableData,count]) => {
            data.tableData = tableData;
            totalCount(count);
        });

        watch(() => [pageData.currentPage,pageData.pageSize],([currentPage,pageSize]) => {
            let requestData = data.tableConfig.requestData;
            if (requestData.data){
                requestData.data.pageNumber = currentPage;
                requestData.data.pageSize = pageSize;
                loadThisData(data.tableConfig.requestData);
            }
        });

        const thatSelectCheckbox = (val) => {
            let rowData = {
                idItem:val.map(item => item.id)
            }
            emit("update:tableRow",rowData);
        }

        const refreshData = () => {
            loadThisData(data.tableConfig.requestData);
        }

        const paramsLoadData = (params) => {
            let requestData = Object.assign({},params,{
                pageNumber:1,
                pageSize:10
            });
            data.tableConfig.requestData.data = requestData;
            loadThisData(data.tableConfig.requestData);
        }

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
        });
        
        return {
            data,
            pageData,
            handleSizeChange,
            handleCurrentChange,
            thatSelectCheckbox,
            refreshData,
            paramsLoadData
        }
    }
}
</script>

<style lang="scss" scoped>
.table-footer{
    padding: 15px 0;
}
</style>