<template>
    <div id="category">
         <el-button type="danger" @click="addFirst">添加一级分类</el-button>
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
                                    <el-button size="mini" round type="danger">编辑</el-button>
                                    <el-button size="mini" round type="success">添加子级</el-button>
                                    <el-button size="mini" round type="">删除</el-button>
                                </div>
                            </h4>
                            <ul v-if="firstItem.children">
                                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                                    {{childrenItem.category_name}}
                                    <div class="button-group">
                                        <el-button size="mini" round type="danger">编辑</el-button>
                                        <el-button size="mini" round type="">删除</el-button>
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
import { onMounted, reactive,ref } from '@vue/composition-api';
import { addFirstCategory,getCategoryInfo } from "@/api/news";
export default {
    name:"infoCategory",
    setup(props,{root,refs}){

        // 
        const category_first = ref(true);

        //
        const category_children = ref(true);
        const category_first_disabled = ref(true);
        const category_children_disabled = ref(true);
        const submit_button_disabled = ref(true);

        const from = reactive({
          categoryName: '',
          secCategoryName: ''
        });

        const category = reactive({
            item:[]
        });

        const submit_button_loading = ref(false);

        // add first level classification
        const submit = () => {
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
        };

        const updateButtonSttus = () => {
            submit_button_loading.value = false;
            from.categoryName = '';
            from.secCategoryName = '';
        }

        // 
        const addFirst = () => {
            category_first.value = true;
            category_children.value = false;
        }

        const getCategory = () => {
            let data = {};
            getCategoryInfo(data).then(response => {
                let responseData = response.data.data;
                category.item = responseData.data;
            }).catch(error => {

            });
        }

        onMounted(() => {
            getCategory();
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
            addFirst
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