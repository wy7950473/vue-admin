<template>
    <div>
        <el-row>
            <el-col :span="22">
                <div class="label-wrap">
                    <label for>关键字:</label>
                    <div class="wrap-content">
                         <el-col :span="3" style="padding-right:15px">
                            <SelectVue :config="data.configOption" />
                        </el-col>
                        <el-col :span="4" style="padding-right:15px">
                            <el-input placeholder="请输入搜索的关键字"></el-input>
                        </el-col>
                        <el-col :span="16">
                            <el-button type="danger" size="small">搜索</el-button>
                        </el-col>
                    </div>
                </div>
            </el-col>
            <el-col :span="2" class="pull-right">
                <el-button type="danger" size="small">添加用户</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import SelectVue from "@/components/Select/index";
export default {
    name:"userIndex",
    components:{
        SelectVue
    },
    setup(props,{root}){

        const data = reactive({
            configOption:["name","phone"]
        })

        return {
            // reactive
            data
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