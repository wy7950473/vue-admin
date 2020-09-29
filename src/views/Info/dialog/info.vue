<template>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" class="from-wrap" width="580px">
        <el-form :model="form">
            <el-form-item label="类型" :label-width="formLabelWidth" class="form-item-wrap">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="标题" :label-width="formLabelWidth" class="form-item-wrap">
                <el-input v-model="form.name" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="概况" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="form.region" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer footer-text">
            <el-button @click="close">取 消</el-button>
            <el-button type="danger" @click="dialogFormVisible = false">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { ref, reactive, watch, watchEffect } from '@vue/composition-api'
export default {
    name:"dialogInfo",
    props:{
        flag:{
            type:Boolean,
            default:false
        }
    },

    setup(props,{emit}){

        const dialog_info_flag = ref(false);

        const form = reactive({
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            });

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
        }

        return {
            dialog_info_flag,
            form,
            formLabelWidth,
            close
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