<template>
    <div id="category">
         <el-button type="danger" @click="addFirst({type:'category_first_add'})">添加一级分类</el-button>
         <hr class="hr-e9e9e9">
         <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
                            <h4>
                                <svg-icon iconClass="plus" className="plus"/>
                                {{firstItem.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" round type="danger" 
                                        @click="editCategory({data:firstItem,type:'category_first_edit'})">编辑</el-button>
                                    <el-button size="mini" round type="success" 
                                        @click="handlerAddChildren({data:firstItem,type:'category_children_add'})">添加子级</el-button>
                                    <el-button size="mini" round type=""
                                        @click="deleteCategoryComfirm(firstItem.id,'parent')">删除</el-button>
                                </div>
                            </h4>
                            <ul v-if="firstItem.children">
                                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                                    {{childrenItem.category_name}}
                                    <div class="button-group">
                                        <el-button size="mini" round type="danger" @click="EditChildrenCategory(childrenItem,'category_children_edit')">编辑</el-button>
                                        <el-button size="mini" round type="" 
                                        @click="deleteCategoryComfirm(childrenItem.id,'children',firstItem.id)">删除</el-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form label-width="142px" class="form-wrap" ref="categoryForm">
                        <el-form-item label="一级分类名称:" v-if="category_first">
                            <el-input v-model="from.categoryName" :disabled="category_first_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称:" v-if="category_children">
                            <el-input v-model="from.secCategoryName" :disabled="category_children_disabled"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit" :loading="submit_button_loading" :disabled="submit_button_disabled">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
         </div>
    </div>
</template>

<script>
import { global } from "@/utils/global_V3.0";
import { onMounted, reactive,ref, watch } from '@vue/composition-api';
import { addFirstCategory,getCategoryInfo,DeleteCategory,EditCategory,AddChildrenCategory,GetCategoryAll } from "@/api/news";
import { common } from "@/api/common";
export default {
    name:"infoCategory",
    setup(props,{root,refs}){

        const { confirm } = global();
        const { getInfoCategory,categoryInfo,getInfoCategoryAll} = common();

        // 
        const category_first = ref(true);
        //
        const category_children = ref(true);
        const category_first_disabled = ref(true);
        const category_children_disabled = ref(true);
        const submit_button_disabled = ref(true);
        const deleteId = ref('');
        const submit_button_type = ref('');
        const delete_type = ref('');
        const parent_id = ref('');

        const from = reactive({
          categoryName: '',
          secCategoryName: ''
        });

        const category = reactive({
            item:[],
            current:[]
        });

        const submit_button_loading = ref(false);

        // add first level classification
        const submit = () => {
            if (submit_button_type.value == 'category_first_add') {
                AddFirstCategory();
            }
            if (submit_button_type.value == 'category_first_edit'){
                editFirstCategory();
            }
            if (submit_button_type.value == 'category_children_add'){
                editChildrenCategory();
            }
            if (submit_button_type.value == 'category_children_edit'){
                EditChildrenCategoryInfo();
            }
        };

        const AddFirstCategory = () => {
            if (!from.categoryName) {
                root.$message({
                    message:"分类名称不能为空",
                    type:"error"
                });
                return false;
            }
            let requestData = {
                categoryName:from.categoryName
            }
            submit_button_loading.value = true;
            addFirstCategory(requestData).then(response => {
                let data = response.data;
                if (data.resCode === 0){
                    root.$message({
                        message:data.message,
                        type:'success'
                    });
                    // getCategory()
                    category.item.push(data.data);
                }
                updateButtonSttus();
            }).catch(error => {
                updateButtonSttus();
            });
        }

        const handlerAddChildren = (params) => {
            category.current = params.data;
            submit_button_type.value = params.type;
            category_children_disabled.value = false;
            category_first_disabled.value = true;
            from.categoryName = params.data.category_name;
            submit_button_disabled.value = false;
            category_children.value = true;
        }

        const updateButtonSttus = () => {
            submit_button_loading.value = false;
            from.categoryName = '';
            from.secCategoryName = '';
        }

        // 
        const addFirst = (params) => {
            from.categoryName = '';
            submit_button_type.value = params.type;
            category_first.value = true;
            category_children.value = false;
            category_first_disabled.value = false;
            submit_button_disabled.value = false;
        }

        const getCategory = () => {
            let data = {};
            getCategoryInfo(data).then(response => {
                let responseData = response.data.data;
                category.item = responseData.data;
            }).catch(error => {

            });
        }

        // delet category
        const deleteCategoryComfirm = (categoryId,type,parentId) =>{
            deleteId.value = categoryId;
            delete_type.value = type;
            parent_id.value = parentId;
            confirm({
                content:"确认删除选择的数据，确认后将无法恢复!",
                tip:"警告",
                fn:deleteCategory,
                catchFn:() => {
                    deleteId.value = '';
                },
                id:categoryId
            });
        };

        const deleteCategory = () => {
            let requestData = {
                categoryId:deleteId.value 
            } 
            DeleteCategory(requestData).then(response => {
                let data = response.data;
                if (data.resCode === 0){
                    root.$message({
                        message:data.message,
                        type:'success'
                    });
                    if (delete_type.value === 'parent'){
                        let index = category.item.findIndex(item => {
                            item.id == deleteId.value;
                        });
                        category.item.splice(index,1);
                    }
                    if (delete_type.value === 'children') {
                        category.item.forEach(item => {
                            if (item.id == parent_id.value){
                                let index = item.children.findIndex(item => {
                                    item.id == deleteId.value;
                                });
                                item.children.splice(index,1);
                                delete_type.value = '';
                                parent_id.value = '';
                            }
                        });
                    }
                    // let newData = category.item.filter(item => item.id != deleteId.value);
                    // category.item = newData;
                }
            }).catch(error => {

            })
        };

        // edit categoty
        const editCategory = (params) => {

            submit_button_type.value = params.type;

            category_first.value = true;
            category_children.value = false;
            category_first_disabled.value = false;
            submit_button_disabled.value = false;

            from.categoryName = params.data.category_name;

            category.current = params.data;
        };

        const editFirstCategory = () => {
            if (category.current.length == 0){
                root.$message({
                    message:"未选择分类!!",
                    type:"error"
                });
                return false;
            }
            if (!from.categoryName) {
                root.$message({
                    message:"分类名称不能为空",
                    type:"error"
                });
                return false;
            }
            let requestData = {
                id:category.current.id,
                categoryName:from.categoryName
            }
            EditCategory(requestData).then(response => {
                let data = response.data;
                if (data.resCode === 0){
                    root.$message({
                        message:data.message,
                        type:'success'
                    });
                    category.current.category_name = data.data.data.categoryName;
                    // let newData = category.item.filter(item => item.id == category.current.id);
                    // newData[0].category_name = data.data.data.categoryName;
                    // 
                    from.categoryName = '';
                    category.current = [];
                }
            }).catch(error => {

            })
        }

        const EditChildrenCategory = (data,type) => {
            category.current = data;
            category_first.value = false;
            category_children.value = true;
            category_children_disabled.value = false;
            submit_button_disabled.value = false;
            from.secCategoryName = category.current.category_name;
            submit_button_type.value = type;
        }

        const EditChildrenCategoryInfo = () =>{
            if (!from.secCategoryName) {
                root.$message({
                    message:"子级分类名称不能为空!",
                    type:"warning"
                });
            }
            let requestData = {
                id:category.current.id,
                categoryName:from.secCategoryName
            }
            EditCategory(requestData).then(response => {
                let data = response.data;
                if (data.resCode === 0){
                    root.$message({
                        message:data.message,
                        type:'success'
                    });
                    category.current.category_name = data.data.data.categoryName;
                    // let newData = category.item.filter(item => item.id == category.current.id);
                    // newData[0].category_name = data.data.data.categoryName;
                    from.secCategoryName = '';
                    category.current = [];
                }
            }).catch(error => {

            })
        }

        const editChildrenCategory = () => {
            if (!from.secCategoryName){
                root.$message({
                    message:"子级分类名称不能为空!",
                    type:"warning"
                });
                return false;
            }
            let requestData = {
                categoryName:from.secCategoryName,
                parentId:category.current.id
            }
            AddChildrenCategory(requestData).then(response => {
                let data = response.data;
                if (data.resCode === 0){
                    root.$message({
                        message:data.message,
                        type:"success"
                    })
                }
                getInfoCategoryAll();
                from.secCategoryName = '';
            }).catch(error => {

            });
        }

        watch(() => categoryInfo.item,(value) => {
            category.item = value;
        });

        onMounted(() => {
            // getInfoCategory();
            getInfoCategoryAll();
        });

        return {
            // ref
            category_first,
            category_children,
            category,
            submit_button_loading,
            category_first_disabled,
            category_children_disabled,
            submit_button_disabled,
            // reactive
            from,
            // method
            submit,
            addFirst,
            deleteCategoryComfirm,
            editCategory,
            handlerAddChildren,
            EditChildrenCategory
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.category-wrap{
    div:first-child{
        &:before{
            top: 20px;
        }
    }
    div:last-child{
        &:before{
            bottom: 21px;
        }
    }
}
.category{
    cursor: pointer;
    position: relative;
    line-height: 44px;
    &:before{
            content: '';
            position: absolute;
            left: 22px;
            top: 0;
            bottom: 0;
            width: 32px;
            border-left: 1px dotted #000;
    }
    h4 {
        padding-left: 40px;
    }
    svg {
        position: absolute;
        left: 14px;
        top: 15px;
        background-color: #fff;
        font-size: 17px;
    }
    li {
        position: relative;
        padding-left: 60px;
        margin-left: 24px;
        &:before{
            content: '';
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    h4,li{
        @include webkit(transition,all .5s ease 0s);
        &:hover{
            background-color: #f3f3f3;
            .button-group{
                display: block;
            }
        }
    }
}
.button-group{
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button{
        font-size:12px;
    }
}
.menu-title{
    line-height: 44px;
    background-color: #f3f3f3;
    padding-left: 22px;
}
.form-wrap{
    width: 410px;
    padding-top: 26px;
}
.hr-e9e9e9{
    width: calc(100% + 60px);
    margin-left: -30px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e9e9e9;
}
</style>