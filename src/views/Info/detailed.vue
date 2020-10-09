<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="信息分类:">
      <el-select v-model="form.categoryId">
        <el-option
          v-for="item in data.category"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题:">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图:">
      <el-upload
        class="avatar-uploader"
        action="http://up-z2.qiniup.com"
        :data="data.uploadKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="发布日期:">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.dateTime"
          disabled
        ></el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="详细内容:">
      <quillEditor
        v-model="form.content"
        ref="myQuillEditor"
        :options="data.editorOption"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit" :loading="submitLoading"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { onMounted, reactive, ref } from "@vue/composition-api";
import { GetList, EditInfo } from "@/api/news";
import { QiniuToken } from "@/api/common";
import { timestampToTime } from "@/utils/common";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "infoDetailed",
  components: { quillEditor },
  setup(props, { root }) {
    const submitLoading = ref(false);

    const data = reactive({
      id:
        root.$route.params.id.value ||
        root.$store.getters["infoDetailed/infoId"],
      title:
        root.$route.params.title.value ||
        root.$store.getters["infoDetailed/infoTitle"],
      category: [],
      imageUrl:'',
      uploadKey:{
          token:"",
          key:""
      }
    });

    const form = reactive({
      categoryId: "",
      title: "",
      dateTime: "",
      content: "",
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });

    // get category info
    const getInfoCategory = () => {
      root.$store
        .dispatch("common/getInfoCategory")
        .then(response => {
          let responseData = response.data.data.data;
          data.category = responseData;
        })
        .catch(error => {});
    };

    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.id
      };
      GetList(requestData)
        .then(response => {
            let responsetData = response.data.data.data[0];
            // console.log(responsetData);
            form.categoryId = responsetData.categoryId,
            form.title = responsetData.title,
            form.content = responsetData.content;
            data.imageUrl = responsetData.imgUrl;
            form.dateTime = timestampToTime(responsetData.createDate);
        })
        .catch(error => {});
    };

    const onSubmit = () => {
      let requestData = {
        id: data.id,
        categoryId: form.categoryId,
        title: form.title,
        content: form.content,
        imgUrl: data.imageUrl
      };
      submitLoading.value = true;
      EditInfo(requestData)
        .then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            submitLoading.value = false;
          }
        })
        .catch(error => {
          submitLoading.value = false;
        });
    };

    const getQiniuToken = () => {
        let requestData = {
            "accesskey":"s6ljJ1m65W18vQma0boMF4Rx1z39akCP_UK6VphK",
            "secretkey":"rq8lv_9SkZNVm1UquLpY97CktYkT64IKMrccX3-8",
            "buckety":"my-vueadmin"
        }
        QiniuToken(requestData).then(response => {
            data.uploadKey.token = response.data.data.token;
            // console.log(data.uploadKey.token);
        }).catch(error => {

        });
    }

    const  handleAvatarSuccess = (res, file) => {
        // console.log("res:"+res);
        data.imageUrl = `${root.$store.getters["common/qiniuUrl"]}${res.key}`;
    }
    
    const beforeAvatarUpload = (file) => {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          root.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          root.$message.error('上传头像图片大小不能超过 2MB!');
        }

        let suffix = file.name;
        let key = encodeURI(`${suffix}`);
        data.uploadKey.key = key;

        return isJPG && isLt2M;
    }

    onMounted(() => {
        getInfoCategory();
        getInfo();
        getQiniuToken();
    });

    return {
      // ref
      submitLoading,
      // reactive
      form,
      data,
      // method
      onSubmit,
      handleAvatarSuccess,
      beforeAvatarUpload
    };
  }
};
</script>

<style scoped>
.avatar-uploader{
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 180px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>