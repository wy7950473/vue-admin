<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo menu-wrap"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      background-color="transparent"
      :router="router"
      text-color="#fff"
      active-text-color="#fff"
    >
      <template v-for="(item,index) in routes">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
    <test />
  </div>
</template>

<script>
import { reactive, onMounted, ref } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    // data
    const isCollapse = ref(false);
    const router = ref(true);

    // router
    const routes = reactive(root.$router.options.routes);

    const handleOpen = (key, keyPath) => {
      // console.log(key, keyPath);
    };

    const handleClose = (key, keyPath) => {
      // console.log(key, keyPath);
    };

    return {
      isCollapse,
      routes,
      router,
      handleOpen,
      handleClose
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
</style>