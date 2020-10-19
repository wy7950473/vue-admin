<template>
    <el-dialog title="修改" :visible.sync="dialog_info_flag" @close="close" class="from-wrap" width="580px" @open="openDialog">
        <el-form :model="form" ref="addInfo" label-width="120px">
            <el-form-item label="用户名:" :label-width="formLabelWidth" prop="category">
                <el-input v-model="form.title" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" :label-width="formLabelWidth" prop="title"> 
                <el-input v-model="form.title" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" :label-width="formLabelWidth" prop="content">
                <el-input v-model="form.title" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="地区:" :label-width="formLabelWidth" prop="content">
                <CityPicker />
            </el-form-item>
            <el-form-item label="是否启用:" :label-width="formLabelWidth" prop="content">
                <el-input v-model="form.title" placeholder="请输入手机号"></el-input>
            </el-form-item>
             <el-form-item label="角色:" :label-width="formLabelWidth" prop="content">
                <el-input v-model="form.title" placeholder="请输入手机号"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer footer-text">
            <el-button @click="close">取 消</el-button>
            <el-button type="danger" @click="submit" :loading="submitLoading">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { ref, reactive, watch, watchEffect } from '@vue/composition-api';
import { GetList,EditInfo } from "@/api/news";
import CityPicker from "@/components/CityPicker/index";
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

    setup(props,{emit,root,refs}){

        const dialog_info_flag = ref(false);
        const submitLoading = ref(false);
        const form = reactive({
            category: '',
            title: '',
            content: ''
        });
        const optionCategory = reactive({
            category:[]
        })
        const formLabelWidth = ref('100px');

        watchEffect(() =>{
            dialog_info_flag.value = props.flag;
            // console.log('watch');
        });

        const close = () => {
            dialog_info_flag.value = false;
            // emit("update:flag",false);
            emit('close',false);
            // The decorator(修饰器) cannot be used when the callback requires logical(逻辑) processing(处理) 
            resetForm();
        }

        const openDialog = () => {
            optionCategory.category = props.category;
           getInfo();
        }

        const getInfo = () => {
            let requestData = {
                pageNumber:1,
                pageSize:1,
                id:props.id
            }
            GetList(requestData).then(response => {
                let data = response.data.data.data[0];
                form.category = data.categoryId,
                form.title = data.title,
                form.content = data.content;        
            }).catch(error => {

            })
        }

        const submit = () => {
            let requestData = {
                id:props.id,
                categoryId:form.category,
                title:form.title,
                content:form.content
            };
            submitLoading.value = true;
            EditInfo(requestData).then(response => {
                let data = response.data;
                if (data.resCode === 0){
                    root.$message({
                        message:data.message,
                        type:'success'
                    });
                    submitLoading.value = false;
                    // reset form 
                    // root.$refs['addInfo'].resetFields();
                    resetForm();
                    emit('getList');
                    emit('close',false);
                }
            }).catch(error => {
                submitLoading.value = false;
            });
        }

        const resetForm = () => {
            getInfo();
            // refs.addInfo.resetFields();
        }

        return {
            dialog_info_flag,
            form,
            optionCategory,
            submitLoading,
            formLabelWidth,
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