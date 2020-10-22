<template>
    <div>
        <el-row>
            <el-col :span="22">
                <div class="label-wrap">
                    <label for>关键字:</label>
                    <div class="wrap-content">
                         <el-col :span="3" style="padding-right:15px">
                            <SelectVue :config="data.configOption" :search_key.sync="data.search_key"/>
                        </el-col>
                        <el-col :span="4" style="padding-right:15px">
                            <el-input v-model="data.search_keyWord" placeholder="请输入搜索的关键字"></el-input>
                        </el-col>
                        <el-col :span="16">
                            <el-button type="danger" size="small" @click="search">搜索</el-button>
                        </el-col>
                    </div>
                </div>
            </el-col>
            <el-col :span="2" class="pull-right">
                <el-button type="danger" size="small" @click="data.dialog_add = true">添加用户</el-button>
            </el-col>
        </el-row>
        <div style="padding-top:20px">
            <TableVue ref="userTable" :config.sync="data.configTable" :tableRow.sync="data.tableRow">
                <template v-slot:status="slotData">
                    <el-switch v-model="slotData.myData.status" 
                        active-value="2" 
                        inactive-value="1" 
                        active-color="#13ce66" 
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
                <template v-slot:operation="slotData">
                    <el-button size="small" type="success" @click="edit(slotData.myData)">编辑</el-button>
                    <el-button size="small" type="danger" @click="deleteUserInfo(slotData.myData)">删除</el-button>
                </template>
                <template v-slot:tableFooterLeft>
                    <el-button size="small" type="danger" @click="batchDel">批量删除</el-button>
                </template>
            </TableVue>
        </div>
        <DialogAdd :flag.sync="data.dialog_add"/>
        <!-- <Mixin /> -->
    </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import SelectVue from "@/components/Select/index";
import TableVue from "@/components/Table/index";
import DialogAdd from "./dialog/add";
import Mixin from "./Mixin";
import { DeleteUser } from "@/api/user";
export default {
    name:"userIndex",
    components:{
        SelectVue,
        TableVue,
        DialogAdd,
        Mixin
    },
    setup(props,{root,refs}){

        const data = reactive({
            dialog_add:false,
            configOption:["name","phone"],
            search_key:"",
            search_keyWord:"",
            tableRow:{},
            configTable:{
                // selection
                selection:true,
                // table header
                recordCheckbox:true,
                tHead:[
                    { label:"邮箱/用户名称",field:"username",width:150},
                    { label:"真实姓名",field:"truename",width:100},
                    { label:"手机号",field:"phone",width:150},
                    { label:"地区",field:"region",width:300},
                    { label:"角色",field:"role"},
                    { label:"禁启用状态",field:"status",columnType:"slot",slotName:"status"},
                    { label:"操作",columnType:"slot",slotName:"operation"}
                ],
                requestData:{
                    url:"getUserList",
                    method:"post",
                    data:{
                        pageNumber:1,
                        pageSize:5
                    }
                },
                pagination:{
                    show:true,
                    layout:"total, sizes, prev, pager, next, jumper"
                }
            }
            
        });


        const search = () => {
            // console.log(`+++++++++++${data.search_key}`);
        }

        const edit = (data) => {
            console.log(data);
        }

        const batchDel = () => {
            let userId = data.tableRow.idItem;
            if(!userId || userId.length == 0){
                root.$message({
                    message:"请选择要删除的用户!",
                    type:"error"
                });
                return false;
            }
            root.confirm({
                content: "确认删除当前信息，确认后将无法恢复!",
                tip: "警告",
                fn: userDelete,
                id: userId
            });
        }

        const deleteUserInfo = (params) => {
            data.tableRow.idItem = [params.id];
            root.confirm({
                content: "确认删除当前信息，确认后将无法恢复!",
                tip: "警告",
                fn: userDelete,
                id: data.tableRow.idItem
            });
        }

        const userDelete = (params) => {

            DeleteUser({id:params}).then(response => {
                let responseData = response.data;
                if(responseData.resCode == 0){
                    root.$message({
                        message:responseData.message ,
                        type:"success"
                    });
                    refs.userTable.refreshData();
                }
            }).catch(error => {

            });
        }

        return {
            // reactive
            data,
            // method
            search,
            edit,
            deleteUserInfo,
            batchDel
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.label-wrap {
    @include labelDom(left, 60, 65, 40);
}
</style>
<!--
v-slot插槽:父组件传值到子组件显示

1.匿名插槽
2.具名插槽：指定插槽显示内容
3.作用域插槽：可以进行数据绑定，父子组件通讯

-->