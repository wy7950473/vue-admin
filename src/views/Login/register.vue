<template>
    <div>
        <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-from"
        size="medium"
      >
        <el-form-item prop="username" class="item-from">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input> 
        </el-form-item>

        <el-form-item prop="password" class="item-from">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-from">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            autocomplete=""
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import { stripscript,validateEmail,validPassword,validCode } from "@/utils/validate"
export default {
  name: "register",
  components: {},
  data() {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    // 验证密码
    var validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validPassword(value)) {
        callback(new Error("密码为6至20位到数字加字母"));
      } else {
        callback();
      }
    };
    // 验证重复密码
    var validatePasswords = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码不相同"));
      } else {
        callback();
      }
    };
    // 验证验证码
    var validateCode = (rule, value, callback) => {
      // 过滤后的数据
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (validCode(value)) {
          callback(new Error("验证码格式有误"));
      } else {
          callback();
      }
    };
    return {
      // isActive: true,
      // 模块值
      // model: "login",
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      this.$emit('name','register');
      console.log("-------");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.login-from {
  margin-top: 29px;
  label {
    display: block;
    font-size: 14px;
    color: #fff;
    margin-bottom: 3px;
  }
}
.item-from {
  margin-bottom: 13px;
}
.block {
  width: 100%;
  display: block;
}
.login-btn {
  margin-top: 19px;
}
</style>