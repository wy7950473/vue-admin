<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" class="from-wrap" width="580px" @open="openDialog">
        <el-form :model="form" ref="addInfo">
            <el-form-item label="类型" :label-width="formLabelWidth" class="form-item-wrap">
                <el-select v-model="form.category" placeholder="请选择活动区域">
                    <el-option v-for="item in optionCategory.category" 
                        :key="item.id" 
                        :label="item.category_name" 
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth" class="form-item-wrap">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.content"></el-input>
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
import { AddInfo } from "@/api/news";
export default {
    name:"dialogInfo",
    props:{
        flag:{
            type:Boolean,
            default:false
        },
        category:{
            type:Array,
            default: () => []
        }
    },

    setup(props,{emit,root}){

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
        const formLabelWidth = ref('70px');

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
        }

        const submit = () => {
            let requestData = {
                categoryId:form.category,
                title:form.title,
                content:form.content
            };
            submitLoading.value = true;
            AddInfo(requestData).then(response => {
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
                }
            }).catch(error => {
                submitLoading.value = false;
            });
        }

        const resetForm = () => {
            form.category = '';
            form.title ='';
            form.content ='';
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