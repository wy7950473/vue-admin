<template>
    <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="信息分类:">
            <el-select v-model="form.categoryId">
                <el-option v-for="item in data.category" 
                    :key="item.id" 
                    :label="item.category_name"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="新闻标题:">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="缩略图:">
            缩略图
        </el-form-item>
        <el-form-item label="发布日期:">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.dateTime" disabled></el-date-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="详细内容:">
            <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="submitLoading">保存</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/composition-api';
import { GetList,EditInfo } from "@/api/news";
import { timestampToTime } from "@/utils/common";
import { quillEditor } from "vue-quill-editor";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    name:"infoDetailed",
    components:{quillEditor},
    setup(props,{root}){

        const submitLoading = ref(false);

        const data = reactive({
            id:root.$route.params.id.value || root.$store.getters["infoDetailed/infoId"],
            title:root.$route.params.title.value || root.$store.getters["infoDetailed/infoTitle"],
            category:[]
        });

        const form = reactive({
            categoryId:"",
            title:"",
            dateTime:"",
            content:"",
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        });

        // get category info
        const getInfoCategory = () => {
            root.$store.dispatch("common/getInfoCategory").then(response => {
                let responseData = response.data.data.data;
                data.category = responseData;
            }).catch(error => {

            });
        }

        const getInfo = () => {
            let requestData = {
                pageNumber:1,
                pageSize:1,
                id:data.id
            }
            GetList(requestData).then(response => {
                let responsetData = response.data.data.data[0];
                // console.log(responsetData);
                form.categoryId = responsetData.categoryId,
                form.title = responsetData.title,
                form.content = responsetData.content;
                form.dateTime = timestampToTime(responsetData.createDate);        
            }).catch(error => {

            });
        }

        onMounted(() => {
            getInfoCategory();
            getInfo();
        })

        const onSubmit = () => {
            let requestData = {
                id:data.id,
                categoryId:form.categoryId,
                title:form.title,
                content:form.content,
                imgUrl:""
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
                }
            }).catch(error => {
                submitLoading.value = false;
            });
        }

        return {
            // ref
            submitLoading,
            // reactive
            form,
            data,
            // method
            onSubmit
        }
    }
}
</script>

<style lang="scss" scoped>

</style>