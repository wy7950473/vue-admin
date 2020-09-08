<template>
  <div>
    <!-- <div class="login-wrap"> -->
      <!-- <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMenu(item)"
        >{{item.txt}}</li>
      </ul> -->
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

        <el-form-item prop="code" class="item-from">
          <label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block" @click="getSms">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button type="danger" class="login-btn block" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    <!-- </div> -->
  </div>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api'
import { GetSms } from '@/api/login'
import { stripscript,validateEmail,validPassword,validCode } from "@/utils/validate"
export default {
  name: "login",
  components: {},
  props:['test'],
  // setup(props,{refs}){
  setup(props,context){

    // console.log(context);  
    const data = reactive([
      {id:'1',name:'zhangsan'},
      {id:'2',name:'lisi'}
    ]);
    //console.log(data)

    const ruleForm = reactive({
        username: "",
        password: "",
        passwords: "",
        code: ""
    });

    // 验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        if (ruleForm.password !== "") {
          this.$refs.ruleForm.validateField("password");
        }
        callback();
      }
    };
    // 验证密码
    let validatePassword = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validPassword(value)) {
        callback(new Error("密码为6至20位到数字加字母"));
      } else {
        callback();
      }
    };
    // 验证验证码
    let validateCode = (rule, value, callback) => {
      // 过滤后的数据
      ruleForm.code = stripscript(value);
      value = ruleForm.code;
      if (!value) {
        return callback(new Error("请输入验证码"));
      } else if (validCode(value)) {
          callback(new Error("验证码格式有误"));
      } else {
          callback();
      }
    };

    const rules = reactive({
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
    });

    // get verification code
    const getSms = (() =>{
      GetSms();
    });

    // commit form
    const submitForm = (formName => {
      context.refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    })

    onMounted(() =>{
      // GetSms();
      // console.log(process.env.VUE_APP_ABC);
    });

    return {
      ruleForm,
      rules,
      submitForm,
      getSms
    }
  },
  data() {
    return {
      // menuTab: [
      //   { txt: "登录", current: true ,type: 'login'},
      //   { txt: "注册", current: false ,type: 'register'}
      // ],
      // isActive: true,
      // 模块值
      // model: "login",  
    };
  },
  created() {
    // this.toAlert(this.test);
    this.init();
  },
  methods: {
    // toAlert(data){
    //   alert(data);
    // },
    init(){
      this.$emit('name','login');
    },
    // submitForm(formName) {

      // // 为给定 ID 的 user 创建请求
      // axios.request({
      //   url:'/user',
      //   method:'get',
      //   data:{
      //     firstName: 'Fred'
      //   }
      // })
      // .then(function (response) {
      //   console.log("response");
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      // this.$refs[formName].validate(valid => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    // }
  }
};
</script>
<style lang='scss' scoped>
// #login {
//   background-color: #344a5f;
//   height: 100vh;
// }
// .login-wrap {
//   width: 330px;
//   margin: auto;
// }
// .menu-tab {
//   text-align: center;
//   li {
//     display: inline-block;
//     width: 88px;
//     line-height: 36px;
//     font-size: 14px;
//     color: #fff;
//     border-radius: 2px;
//     cursor: pointer;
//   }
//   .current {
//     background-color: rgba(0, 0, 0, 0.1);
//   }
// }
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