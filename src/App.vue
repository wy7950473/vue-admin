<template>
  <div id="login">
    <div class="login-wrap">
      <div class="menu-tab">
        <router-link v-for="item in menuTab" 
        :key="item.id" 
        :to="item.link" 
        :class="{'current':item.current,'tab':true}"
        @click.native="toggleMenu(item)"  
        >{{item.txt}}</router-link>
      </div>
      <router-view @name="getName" :test="'msg'"/>
    </div>
  </div>
</template>
<script>
import {reactive,ref, isRef, toRefs, onMounted} from '@vue/composition-api'
export default {
  updated() {
    // alert(this.name);
  },
  setup(props,context){
    const data = reactive([
      {id:'1',name:'zhangsan'},
      {id:'2',name:'lisi'}
    ]);
    //alert(data)
    const test = ref('Test');
    //alert(test.value);
    // alert(isRef(test))
    const data1 = reactive({
      x:0,
      y:10
    });
    // alert(data1.x)
    const data2 = toRefs(data1);
    // alert(data2.x.value)
    onMounted(() => {
      
    });
    const menuTab = reactive([
        { link:'/login',txt: "登录", current: true ,type: 'login'},
        { link: '/register',txt: "注册", current: false ,type: 'register'}
    ]);
    const toggleMenu =(data =>{
        menuTab.forEach((elem,index) => {
          elem.current = false;
        });
        // 高光
        data.current = true;
    });
    const name = ref('');
    const getName =(data => {
      name.value = data;
    });
    return {
      menuTab,
      toggleMenu,
      getName
    }
  },
  // data() {
  //   return {
      // menuTab: [
      //   { link:'/login',txt: "登录", current: true ,type: 'login'},
      //   { link: '/register',txt: "注册", current: false ,type: 'register'}
      // ],
  //     name:''
  //   }
  // },
  // methods: {
    // vue 数据驱动视频渲染
    // toggleMenu(data) {
    //   this.menuTab.forEach((elem,index) => {
    //     elem.current = false;
    //   });
    //   // 高光
    //   data.current = true;
    // },
    
  // }
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