<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>类型:</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
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
        <el-input v-model="search_keyWord" placeholder="请输入内容" style="width:100%"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%" size="small">搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2" class="pull-right">
        <el-button type="danger" style="width:100%;" size="small" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>

    <div class="black-space-30"></div>

    <!-- 表格 -->
    <el-table :data="tableData.item" border style="width: 100%" class="table-wrap">
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="title" label="标题" width="430"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="130"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="200"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
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
          :page-size="5"
          :page-sizes="[5, 10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo :flag.sync="dialogInfo" @close="close" :category="options.category"/>
  </div>
</template>

<script>
import { getCategoryInfo,GetList } from "@/api/news";
import DialogInfo from "./dialog/info";
import { reactive, ref, onMounted, watchEffect,watch } from "@vue/composition-api";
import { global } from "@/utils/global_V3.0";
import { common } from "@/api/common";
export default {
  name: "infoIndex",
  components: { DialogInfo },
  setup(props, { root }) {

    const { getInfoCategory,categoryInfo} = common();

    const options = reactive({
      category:[]
    });

    const tableData = reactive({
      item:[]
    });

    const searchOptions = reactive([
      { value: "id", label: "ID" },
      { value: "title", label: "标题" }
    ]);

    const page = reactive({
      pageNumber:1,
      pageSize:5
    })

    const categoryValue = ref("");
    const dateValue = ref("");
    const search_key = ref("id");
    const search_keyWord = ref("");
    const dialogInfo = ref(false);
    const total = ref(0);

    const handleSizeChange = value => {
      page.pageSize = value;
    };

    const handleCurrentChange = value => {
      page.pageNumber = value;
      getList();
    };

    const close = data => {
      dialogInfo.value = data;
      getList();
    };

    const deleteItem = () => {
      root.confirm({
        content: "确认删除当前信息，确认后将无法恢复!",
        tip: "警告",
        fn: confirmDelete,
        id: "1111111"
      });
    };

    const deleteAll = () => {
      root.confirm({
        content: "确认删除选择的数据，确认后将无法恢复!",
        type: "success",
        fn: confirmDelete,
        id: "2222222"
      });
    };

    const getList = () => {
      let requestData = {
        categoryId:'',
        startTime:'',
        endTime:"",
        title:"",
        id:"",
        pageNumber:page.pageNumber,
        pageSize:page.pageSize
      }
      GetList(requestData).then(response => {
          let data = response.data.data;
          tableData.item = data.data;
          //
          total.value = data.total;
      }).catch(error => {

      });
    }

    watch(() => categoryInfo.item,(value) => {
      options.category = value;
    })

    onMounted(() => {
      getInfoCategory();
      // root.$store.dispatch("common/getInfoCategory").then(response => {
      //   console.log(response.data.data.data);
      // }).catch(error => {

      // });
      getList();
    });

    const getCategory = () => {
      let data = {};
      getCategoryInfo(data)
        .then(response => {
          let responseData = response.data.data;
          console.log(responseData);
          options.category = responseData.data;
        })
        .catch(error => {});
    };

    const confirmDelete = value => {
      console.log(value);
    };

    return {
      // reactive
      options,
      tableData,
      searchOptions,
      total,
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