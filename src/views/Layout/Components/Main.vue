<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "layoutMain",
  setup(props,{root}){
      
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0;
  bottom: 0;
  border-bottom: none;
  background-color: #f7f7f7;
  @include webkit(transition,all .3s ease 0s);
  -webkit-box-sizing: border;
}
.open{
  #main-wrap {
    left: $navMenu;
  }
}
.close{
  #main-wrap {
    left: $navMenuMin;
  }
}
.main-content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: 100%;
  padding: 30px 30px 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
</style>