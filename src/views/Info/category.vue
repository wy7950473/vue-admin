<template>
    <div id="category">
         <el-button type="danger">添加一级分类</el-button>
         <hr class="hr-e9e9e9">
         <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category">
                        <h4>
                            <svg-icon iconClass="minus" className="minus"/>
                            新闻
                            <div class="button-group">
                                <el-button size="mini" round type="danger">编辑</el-button>
                                <el-button size="mini" round type="success">添加子级</el-button>
                                <el-button size="mini" round type="">删除</el-button>
                            </div>
                        </h4>
                        <ul>
                            <li>
                                国内
                                <div class="button-group">
                                    <el-button size="mini" round type="danger">编辑</el-button>
                                    <el-button size="mini" round type="">删除</el-button>
                                </div>
                            </li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                        </ul>
                    </div>
                    <div class="category">
                        <h4>
                            <svg-icon iconClass="minus" className="minus"/>
                            新闻
                        </h4>
                        <ul>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                            <li>国内</li>
                        </ul>
                    </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form :label-position="labelPosition" label-width="142px" class="form-wrap">
                        <el-form-item label="一级分类名称:">
                            <el-input v-model="formLabelAlign.name"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称:">
                            <el-input v-model="formLabelAlign.region"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
         </div>
    </div>
</template>

<script>
import { reactive } from '@vue/composition-api'
export default {
    name:"infoCategory",
    setup(props,{root}){

        const formLabelAlign = reactive({
          name: '',
          region: '',
          type: ''
        });

        return {
            formLabelAlign
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