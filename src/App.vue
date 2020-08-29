<template>
  <div id="login">
    <div class="login-wrap">
      <div class="menu-tab">
        <router-link v-for="item in menuTab" 
        :key="item.id" 
        :to="item.link" 
        :class="{'current':item.current,'tab':true}"
         @click.native="toggleMenu(item)">{{item.txt}}</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuTab: [
        { link:'/login',txt: "登录", current: true ,type: 'login'},
        { link: '/register',txt: "注册", current: false ,type: 'register'}
      ]
    }
  },
  methods: {
    // vue 数据驱动视频渲染
    toggleMenu(data) {
      this.menuTab.forEach((elem,index) => {
        elem.current = false;
      });
      // 高光
      data.current = true;
    }  
  }
}
</script>
<style lang="scss">
#login {
  background-color: #344a5f;
  height: 100vh;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab{
  text-align: center;
  .tab{
    display: inline-block;
    width: 88px;
    padding: 5px 0px 7px 0px;
    font-size: 16px;
    color: #fff;
    margin-top: 20px;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>