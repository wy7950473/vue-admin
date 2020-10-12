<template>
    <el-upload
        class="avatar-uploader"
        :action="config.uploadUrl"
        :data="data.uploadKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>                    
</template>

<script>
import { onMounted, reactive, watch } from '@vue/composition-api';
import { QiniuToken } from "@/api/common";
export default {
    name:"uploadImg",
    props:{
        imageUrl:{
            type:String,
            default:null
        },
        config:{
            type:Object,
            default:() => {}
        }
    },
    setup(props,{root,emit}){

        const data = reactive({
            imageUrl:'',
            uploadKey:{
                token:"",
                key:""
            }
        });

        const getQiniuToken = () => {
            let requestData = {
                accesskey:props.config.accesskey,
                secretkey:props.config.secretkey,
                buckety:props.config.buckety
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
            emit("update:imageUrl",data.imageUrl);
        }

        const beforeAvatarUpload = (file) => {
            // console.log(file);
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

        watch(() => props.imageUrl,(value) => {
            data.imageUrl = value;
        });

        onMounted(() => {
            getQiniuToken();
        });

        return {
            // reactive
            data,
            // method
            handleAvatarSuccess,
            beforeAvatarUpload
        }
    }
}
</script>

<style lang="scss" scoped>
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