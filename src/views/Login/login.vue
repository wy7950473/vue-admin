<template>
  <div>
    <!--表单-->
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      class="login-from"
      size="medium"
    >
      <el-form-item prop="username" class="item-from">
        <label for="username">邮箱</label>
        <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="password" class="item-from">
        <label for="password">密码</label>
        <el-input
          id="password"
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          minlength="6"
          maxlength="20"
        ></el-input>
      </el-form-item>

      <el-form-item prop="code" class="item-from">
        <label for="code">验证码</label>
        <el-row :gutter="11">
          <el-col :span="15">
            <el-input id="code" v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button
              type="success"
              class="block"
              @click="getSms"
              :disabled="codeButton.status"
            >{{codeButton.text}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-button
          type="danger"
          class="login-btn block"
          @click="submitForm('ruleForm')"
          :disabled="loginButtonStatus"
        >登录</el-button>
      </el-form-item>
    </el-form>
    <!-- </div> -->
  </div>
</template>
<script>
import sha1 from "js-sha1";
import { Message } from "element-ui";
import { reactive, onMounted, ref } from "@vue/composition-api";
import { GetSms, Login } from "@/api/login";
import {
  stripscript,
  validateEmail,
  validPassword,
  validCode
} from "@/utils/validate";
export default {
  name: "login",
  components: {},
  props: ["test"],
  // setup(props,{refs,root}){
  setup(props, context) {
    // console.log(context);
    const data = reactive([
      { id: "1", name: "zhangsan" },
      { id: "2", name: "lisi" }
    ]);
    //console.log(data)

    const ruleForm = reactive({
      username: "",
      password: "",
      code: ""
    });

    // countdown
    const timer = ref(null);
    context.emit("name", "login");

    // verify username
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please input username"));
      } else if (validateEmail(value)) {
        callback(new Error("username format error"));
      } else {
        callback();
      }
    };
    // verify password
    let validatePassword = (rule, value, callback) => {
      // filtered data
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
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
    // verify verification code
    let validateCode = (rule, value, callback) => {
      // filtered data
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (!value) {
        return callback(new Error("please input verification code"));
      } else if (validCode(value)) {
        callback(new Error("verification code format error"));
      } else {
        callback();
      }
    };

    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    // login button disabled status
    const loginButtonStatus = ref(true);

    const codeButton = reactive({
      // verification code button available status
      status: false,
      // verification code button value
      text: "获取验证码"
    });

    // get verification code
    const getSms = () => {
      if (ruleForm.username == "") {
        // prompt(提示)
        context.root.$message.error("The mailbox connot be empty");
        return false;
      }
      // verify mialbox format
      if (validateEmail(ruleForm.username)) {
        // prompt(提示)
        context.root.$message.error("Email format error,please reenter");
        return false;
      }
      let data = {
        username: ruleForm.username,
        module: "login"
      };

      // modify verification code button status
      codeButton.status = true;
      // modify verification code buton value
      codeButton.text = "发送中";

      // request delay
      setTimeout(() => {
        // request API
        // get verification code
        GetSms(data)
          .then(response => {
            let data = response.data;
            context.root.$message({
              message: data.message,
              type: "success"
            });
            // enable login button
            loginButtonStatus.value = false;
            // adhust the timer,countdown
            countDown(5);
          })
          .catch(error => {
            // modify verification code button status
            codeButton.status = false;
            // modify verification code button value
            codeButton.text = "获取验证码";
          });
      }, 2000);
    };

    // countdown
    const countDown = number => {
      // setTimeout  : only once
      // setIuterval : continuous implementation, need conditions to stop
      let time = number;
      if (timer.value) {
        clearInterval(timer.value);
      }
      timer.value = setInterval(() => {
        if (time < 0) {
          // clear timer
          clearInterval(timer.value);
          // modify verification code button status
          codeButton.status = false;
          // modify verification code buton value
          codeButton.text = "重新发送";
        } else {
          codeButton.text = `倒计时${time}秒`;
        }
        time--;
      }, 1000);
    };

    // login
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "login"
      };
      context.root.$store.dispatch("app/login", requestData).then(response => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success"
          });
          // screen jump
          context.root.$router.push({ path: "/console" });
        })
        .catch(error => {

        });
     };

    // commit form
    const submitForm = formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    onMounted(() => {});
    return {
      ruleForm,
      rules,
      submitForm,
      loginButtonStatus,
      codeButton,
      getSms
    };
  }
};
</script>
<style lang='scss' scoped>
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