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
              <el-button type="success" class="block" @click="getSms" :disabled="codeButton.status">{{codeButton.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')" :disabled="registerButtonStatus">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>
<script>
import { GetSms,Register } from "@/api/login"
import { stripscript,validateEmail,validPassword,validCode } from "@/utils/validate"
export default {
  name: "register",
  components: {},
  data() {
    // verify username
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please input username"));
      } else if (validateEmail(value)) {
        callback(new Error("username format error"));
      } else {
        if (this.ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    // verify password
    var validatePassword = (rule, value, callback) => {
      // filtered data
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("please input password"));
      } else if (validPassword(value)) {
        callback(new Error("The password is 6 to 20 digits numbers plus letters"));
      } else {
        callback();
      }
    };
    // verify duplicate password
    var validatePasswords = (rule, value, callback) => {
      // filtered data
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
    // verify verification code
    var validateCode = (rule, value, callback) => {
      // filtered data
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;
      if (!value) {
        return callback(new Error("please input verification code"));
      } else if (validCode(value)) {
          callback(new Error("verification code format error"));
      } else {
          callback();
      }
    };
    return {
      // isActive: true,
      // model value
      // model: "login",
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      registerButtonStatus:true,
      codeButton:{
        status: false,
        text: '获取验证码'
      },
      // timer
      timer:null,
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  created(){
    this.$emit('name','register');
  },
  mounted(){

  },
  methods: {
    // get verification code
    getSms(){
      // when username is empty
      if (this.ruleForm.username == "") {
        // prompt
        this.$message.error("The mailbox connot be empty");
        return false;
      }
      // verify username
      if (validateEmail(this.ruleForm.username)) {
        // prompt
        this.$message.error("Email format error,please reenter");
        return false;
      }

      let data = {
        username:this.ruleForm.username,
        module:'register'
      }

      // modify verification code button status
      this.codeButton.status = true;
      // modify verification code button value
      this.codeButton.text = '发送中';

      // request delay
      setTimeout(() => {
        GetSms(data).then(response => {
          let data = response.data;
          this.$message({
            message:data.message,
            type:'success'
          });
          // modify verification code button status
          this.registerButtonStatus = false;
          // adhust the timer
          this.countDown(5);
        }).catch(error => {
          // modify verification code button status
          this.codeButton.status = false;
          // modify verification code button value
          this.codeButton.text = '获取验证码';
        });
      },2000);
    },
    countDown(number){
      let time = number;
      // clear timer
      if (this.timer){
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
          if (time < 0) {
            // clear timer
            clearInterval(this.timer);
            // modify verification code button status
            this.codeButton.status = false;
            // modify verification code button text
            this.codeButton.text = '重新发送';
          } else {
            // modify verification code button text
            this.codeButton.text = `倒计时${time}秒`;
          }
          time--;
      },1000);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let requestData = {
            username:this.ruleForm.username,
            password:this.ruleForm.password,
            code:this.ruleForm.code,
            module:'register'
          }
          // call register API 
          Register(requestData).then(response => {
            let data = response.data;
            this.$message({
              message:data.message,
              type:'success'
            });
            // screen jump
            this.$router.push({path:'/login'});
          }).catch(error => {

          }) 
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