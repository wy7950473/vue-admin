<template>
  <el-dialog
    title="修改"
    :visible.sync="data.dialog_info_flag"
    @close="close"
    class="from-wrap"
    width="580px"
    @open="openDialog"
  >
    <el-form
      :model="data.form"
      status-icon
      ref="addInfo"
      :rules="data.rules"
      label-width="120px"
    >
      <el-form-item
        label="用户名:"
        :label-width="data.formLabelWidth"
        prop="username"
      >
        <el-input
          v-model="data.form.username"
          autocomplete="off"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码:"
        :label-width="data.formLabelWidth"
        prop="password"
      >
        <el-input
          type="password"
          v-model="data.form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="姓名:"
        :label-width="data.formLabelWidth"
        prop="truename"
      >
        <el-input
          v-model="data.form.truename"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="手机号:"
        :label-width="data.formLabelWidth"
        prop="phone"
      >
        <el-input
          type="number"
          v-model="data.form.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="地区:"
        :label-width="data.formLabelWidth"
        prop="region"
      >
        <CityPicker
          :cityPickerLavel="['province', 'city', 'area', 'street']"
          :cityPickerData.sync="data.cityPickerData"
        />
      </el-form-item>
      <el-form-item
        label="是否启用:"
        :label-width="data.formLabelWidth"
        prop="status"
      >
        <el-radio
          v-model="data.form.status"
          label="1"
          style="padding-right:30px"
          >禁用</el-radio
        >
        <el-radio v-model="data.form.status" label="2">启用</el-radio>
      </el-form-item>
      <el-form-item
        label="角色:"
        :label-width="data.formLabelWidth"
        prop="role"
      >
        <el-checkbox-group v-model="data.form.role">
          <el-checkbox
            v-for="item in data.roleItem"
            :key="item.role"
            :label="item.role"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer footer-text">
      <el-button @click="close">取 消</el-button>
      <el-button
        type="danger"
        @click="submit('addInfo')"
        :loading="data.submitLoading"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import sha1 from "js-sha1";
import {
  ref,
  reactive,
  watch,
  watchEffect,
  onBeforeMount
} from "@vue/composition-api";
import CityPicker from "@/components/CityPicker/index";
import { GetRole,GetSystem, AddUser, UserEdit } from "@/api/user";
import {
  stripscript,
  validateEmail,
  validPassword,
  validCode
} from "@/utils/validate";
export default {
  name: "dialogEditInfo",
  components: {
    CityPicker
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ""
    },
    editData: {
      type: Object,
      default: () => {}
    },
    operationType: {
      type: String,
      default: ""
    }
  },

  setup(props, { emit, root, refs, parent }) {
    // verify username
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please input username"));
      } else if (validateEmail(value)) {
        callback(new Error("username format error"));
      } else {
        callback();
      }
    };
    // verify password
    const validatePassword = (rule, value, callback) => {
      if (props.operationType === "edit" && value === "") {
        callback();
      }
      if (value) {
        // filtered data
        data.form.password = stripscript(value);
        value = data.form.password;
      }
      if (value === "") {
        callback(new Error("please input password"));
      } else if (validPassword(value)) {
        callback(
          new Error("The password is 6 to 20 digits numbers plus letters")
        );
      } else {
        callback();
      }
    };

    const data = reactive({
      cityPickerData: {},
      roleStatus: "1",
      roleCode: ["A", "B", "C"],
      roleItem: [],
      submitLoading: false,
      formLabelWidth: "100px",
      dialog_info_flag: false,
      form: {
        username: "",
        truename: "",
        password: "",
        phone: "",
        region: "",
        status: "2",
        role: []
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        role: [
          { required: true, message: "please select role", trigger: "blur" }
        ]
      }
    });

    watchEffect(() => {
      data.dialog_info_flag = props.flag;
    });

    const getRole = () => {
      GetSystem({})
        .then(response => {
          let responseData = response.data.data;
          data.roleItem = responseData;
        })
        .catch(error => {});
    };

    const close = () => {
      data.dialog_info_flag = false;
      // emit('update:flag',false);
      // The decorator(修饰器) cannot be used when the callback requires logical(逻辑) processing(处理)
      resetForm();
      emit("update:flag", false);
    };

    const resetForm = () => {
      // getInfo();
      data.cityPickerData = {};
      refs.addInfo.resetFields();
    };

    const openDialog = () => {
      // optionCategory.category = props.category;
      getRole();
      const editData = props.editData;
      if (props.operationType === "edit") {
        editData.role = editData.role.split(",");
        for (let key in editData) {
          data.form[key] = editData[key];
        }
      } else if (props.operationType === "add") {
        for (let key in editData) {
          data.form[key] = "";
        }
        data.form.status = 2;
        data.form.role = [];
      }
    };

    const submit = formName => {
      refs[formName].validate(valid => {
        if (valid) {
            let requestData = JSON.parse(JSON.stringify(data.form));
            // join : array to string
            requestData.role = requestData.role.join();
            requestData.region = JSON.stringify(data.cityPickerData);
            if (props.operationType === "add") {
                requestData.password = sha1(requestData.password);
                addUser(requestData);
            } else if (props.operationType === "edit") {
                if (requestData.password) {
                    requestData.password = sha1(requestData.password)
                } else {
                    delete requestData.password;
                }
                editUser(requestData);
            }
        } else {
          return false;
        }
      });
    };

    const addUser = (requestData) => {
      AddUser(requestData)
        .then(response => {
          let responseData = response.data;
          root.$message({
            message: responseData.message,
            type: "success"
          });
          close();
          parent.refreshTableData();
        })
        .catch(error => {});
    };

    const editUser = (requestData) => {
      UserEdit(requestData)
        .then(response => {
            let responseData = response.data;
            root.$message({
                message: responseData.message,
                type: "success"
            });
          close();
          parent.refreshTableData();
        })
        .catch(error => {

        });
    };

    return {
      data,
      close,
      openDialog,
      submit
    };
  }
};
</script>

<style lang="scss" scoped>
.from-wrap {
  .el-form {
    margin: 5px 10px !important;
  }
}
.el-form {
  .el-form-item:last-child {
    margin-bottom: 0 !important;
  }
}
.footer-text {
  text-align: center;
  padding-bottom: 30px;
  .el-button {
    width: 150px;
    margin: 0 11px !important;
  }
}
.form-item-wrap {
  padding-bottom: 30px;
}
</style>