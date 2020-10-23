<template>
    <el-dialog title="修改" :visible.sync="data.dialog_info_flag" @close="close" class="from-wrap" width="580px" @open="openDialog">
        <el-form :model="data.form" ref="addInfo" label-width="120px">
            <el-form-item label="用户名:" :label-width="data.formLabelWidth" prop="username">
                <el-input v-model="data.form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码:" :label-width="data.formLabelWidth" prop="password"> 
                <el-input type="password" v-model="data.form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" :label-width="data.formLabelWidth" prop="truename"> 
                <el-input v-model="data.form.truename" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" :label-width="data.formLabelWidth" prop="phone">
                <el-input type="number" v-model="data.form.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="地区:" :label-width="data.formLabelWidth" prop="region">
                <CityPicker :cityPickerLavel="['province','city','area','street']" :cityPickerData.sync="data.cityPickerData" />
            </el-form-item>
            <el-form-item label="是否启用:" :label-width="data.formLabelWidth" prop="status">
                <el-radio v-model="data.form.status" label="1" style="padding-right:30px">禁用</el-radio>
                <el-radio v-model="data.form.status" label="2">启用</el-radio>
            </el-form-item>
             <el-form-item label="角色:" :label-width="data.formLabelWidth" prop="role">
                <el-checkbox-group v-model="data.form.role">
                    <el-checkbox v-for="item in data.roleItem" :key="item.role" :label="item.role">{{ item.name }}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer footer-text">
            <el-button @click="close">取 消</el-button>
            <el-button type="danger" @click="submit" :loading="data.submitLoading">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import sha1 from "js-sha1";
import { ref, reactive, watch, watchEffect, onBeforeMount } from '@vue/composition-api';
import CityPicker from "@/components/CityPicker/index";
import { GetRole,AddUser } from "@/api/user";
import EventBus from "@/utils/bus";
export default {
    name:"dialogEditInfo",
    components:{
        CityPicker
    },
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        category:{
            type:Array,
            default: () => []
        },
        id:{
            type:String,
            default:''
        }
    },

    setup(props,{emit,root,refs,parent}){

        const data = reactive({
            cityPickerData:{},
            roleStatus:"1",
            roleCode:['A','B','C'],
            roleItem:[],
            submitLoading:false,
            formLabelWidth:"100px",
            dialog_info_flag:false,
            form:{
                username:"",
                truename:"",
                password:"",
                phone:"",
                region:"",
                status:"2",
                role:[]
            }
        });

        EventBus.$on('showFun',(data) => {
            console.log(data);
        });

        watchEffect(() =>{
            data.dialog_info_flag = props.flag;
        });

        const getRole = () => {
            GetRole({}).then(response => {
                let responseData = response.data.data;
                data.roleItem = responseData;
            }).catch(error => {

            });
        }

        const close = () => {
            data.dialog_info_flag = false;
            emit("update:flag",false);
            // emit('update:flag',false);
            // The decorator(修饰器) cannot be used when the callback requires logical(逻辑) processing(处理) 
            resetForm();
        }

        const openDialog = () => {
            // optionCategory.category = props.category;
            getRole();
        }

        const submit = () => {
            if (!data.form.username){
                root.$message({
                    message:"用户名不能为空!",
                    type:"error"
                });
                return false;
            }
            if (!data.form.password){
                root.$message({
                    message:"密码不能为空!",
                    type:"error"
                });
                return false;
            }
            if(data.form.role.length === 0){
                root.$message({
                    message:"请选择角色",
                    type:"error"
                });
                return false;
            }
            let requestData = JSON.parse(JSON.stringify(data.form));
            requestData.password = sha1(requestData.password);
            // join : array to string
            requestData.role = requestData.role.join();
            requestData.region = JSON.stringify(data.cityPickerData);
            AddUser(requestData).then(response => {
                let responseData = response.data;
                root.$message({
                    message:responseData.message,
                    type:"success"
                });
                resetForm();
                parent.refreshTableData();
                emit("update:flag",false);
            }).catch(error => {

            });
        }

        const resetForm = () => {
            // getInfo();
            data.cityPickerData = {};
            refs.addInfo.resetFields();
        }

        return {
            data,
            close,
            openDialog,
            submit
        }
    }
}
</script>

<style lang="scss" scoped>
.from-wrap{
    .el-form{
        margin: 5px 10px !important;
    }
}
.el-form{
    .el-form-item:last-child{
        margin-bottom: 0 !important;
    }
}
.footer-text{
    text-align: center;
    padding-bottom:30px;
    .el-button{
        width: 150px;
        margin: 0 11px !important;
    }
}
.form-item-wrap{
    padding-bottom: 30px;
}
</style>