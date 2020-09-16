<template>
  <div id="login">
    <div class="login-wrap">
      <div class="menu-tab">
        <router-link v-for="item in menuTab" 
        :key="item.id" 
        :to="item.link" 
        :class="{'current':item.type===name,'tab':true}"
        @click.native="toggleMenu(item)"  
        v-cloak
        >{{item.txt}}</router-link>
      </div>
      <router-view @name="getName" :test="'msg'"/>
    </div>
  </div>
</template>
<script>
import {reactive,ref, isRef, toRefs, onMounted} from '@vue/composition-api'
export default {
  setup(props,context){
    const data = reactive([
      {id:'1',name:'zhangsan'},
      {id:'2',name:'lisi'}
    ]);
    const name = ref('');
    const getName = data => {
      name.value = data;
    };
    onMounted(() => {

    });
    const menuTab = reactive([
        { link:'/login',txt: "登录", current: true ,type: 'login'},
        { link: '/register',txt: "注册", current: false ,type: 'register'}
    ]);
    const toggleMenu =(data =>{
        // menuTab.forEach((elem,index) => {
        //   elem.current = false;
        // });
        // data.current = true;
        // reset form
        // context.$refs[forName].resetFields();
    });
    return {
      menuTab,
      toggleMenu,
      name,
      getName
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
[v-cloak] {
    display: none;
}
</style>