<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>类型:</label>
          <div class="wrap-content">
            <el-select
              v-model="categoryValue"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for>日期:</label>
          <div class="wrap-content">
            <el-date-picker
              style="width:100%"
              v-model="dateValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap key-word">
          <label for>关键字:</label>
          <div class="wrap-content">
            <el-select v-model="search_key" style="width:100%">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="search_keyWord"
          placeholder="请输入内容"
          style="width:100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%" size="small"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2" class="pull-right">
        <el-button
          type="danger"
          style="width:100%;"
          size="small"
          @click="dialogInfo = true"
          >新增</el-button
        >
      </el-col>
    </el-row>

    <div class="black-space-30"></div>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%" class="table-wrap">
      <el-table-column type="selection" width="40"> </el-table-column>
      <el-table-column prop="title" label="标题" width="430"></el-table-column>
      <el-table-column
        prop="category"
        label="类型"
        width="130"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="200"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem"
            >删除</el-button
          >
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>

    <!-- 底部分页 -->
    <el-row>
      <el-col :span="7">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="17">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[100, 200, 300, 400]"
          layout="total,prev,sizes, pager, next,jumper"
          :total="1000"
        >
        </el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo :flag.sync="dialogInfo" @close="close" />
  </div>
</template>

<script>
import DialogInfo from "./dialog/info";
import { reactive, ref } from "@vue/composition-api";
import { global } from "@/utils/global_V3.0";
export default {
  name: "infoIndex",
  components: { DialogInfo },
  setup(props, { root }) {

    const options = reactive([
      {
        value: "选项1",
        label: "国际信息"
      },
      {
        value: "选项2",
        label: "国内信息"
      },
      {
        value: "选项3",
        label: "行业信息"
      }
    ]);

    const tableData = reactive([
      {
        title: "2016-05-02",
        category: "王小虎",
        date: "上海市普陀区金沙江路 1518 弄",
        user: "管理员"
      },
      {
        title: "2016-05-02",
        category: "王小虎",
        date: "上海市普陀区金沙江路 1518 弄",
        user: "管理员"
      },
      {
        title: "2016-05-02",
        category: "王小虎",
        date: "上海市普陀区金沙江路 1518 弄",
        user: "管理员"
      },
      {
        title: "2016-05-02",
        category: "王小虎",
        date: "上海市普陀区金沙江路 1518 弄",
        user: "管理员"
      }
    ]);

    const searchOptions = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ]);

    const categoryValue = ref("");

    const dateValue = ref("");

    const search_key = ref("id");

    const search_keyWord = ref("");

    const dialogInfo = ref(false);

    const handleSizeChange = value => {
      console.log("---" + value);
    };

    const handleCurrentChange = value => {
      console.log("+++" + value);
    };

    const close = data => {
      dialogInfo.value = data;
    };

    const deleteItem = () => {
      root.confirm({
        content:"确认删除当前信息，确认后将无法恢复!",
        tip:"警告",
        fn:confirmDelete,
        id:"1111111"
      });
    };

    const deleteAll = () => {
      root.confirm({
        content:"确认删除选择的数据，确认后将无法恢复!",
        type:"success",
        fn:confirmDelete,
        id:"2222222"
      });
    };

    const confirmDelete = (value) => {
      console.log(value);
    }

    return {
      // reactive
      options,
      tableData,
      searchOptions,
      // ref
      categoryValue,
      dateValue,
      search_key,
      search_keyWord,
      dialogInfo,
      // method
      handleSizeChange,
      handleCurrentChange,
      close,
      deleteItem,
      deleteAll
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 50, 50, 40);
  }
  &.date {
    @include labelDom(right, 43, 50, 40);
  }
  &.key-word {
    @include labelDom(right, 60, 65, 40);
  }
}
</style>