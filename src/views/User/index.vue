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
                <el-button type="danger" size="small">添加用户</el-button>
            </el-col>
        </el-row>
        <div style="padding-top:20px">
            <TableVue :config.sync="data.configTable"/>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import SelectVue from "@/components/Select/index";
import TableVue from "@/components/Table/index";
export default {
    name:"userIndex",
    components:{
        SelectVue,
        TableVue
    },
    setup(props,{root}){

        const data = reactive({
            configOption:["name","phone"],
            search_key:"",
            search_keyWord:"",
            configTable:{
                // selection
                selection:true,
                // table header
                recordCheckbox:true,
                tHead:[
                    { label:"邮箱/用户名称",field:"email",width:265},
                    { label:"真实姓名",field:"name",width:220},
                    { label:"手机号",field:"phone",width:260},
                    { label:"地区",field:"address",width:500},
                    { label:"角色",field:"role"}
                ]
            }
        })

        const search = () => {
            // console.log(`+++++++++++${data.search_key}`);
        }

        return {
            // reactive
            data,
            // method
            search
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