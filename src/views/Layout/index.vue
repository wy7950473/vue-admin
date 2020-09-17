<template>
  <div id="layout">
      <LayoutHeader/>
      <LayoutMain/>
      <LayoutNav/>
  </div>
</template>

<script>
import LayoutHeader from "./Components/Header"
import LayoutMain from "./Components/Main"
import LayoutNav from "./Components/Nav"
export default {
    name:"layout",
    components:{LayoutHeader,LayoutMain,LayoutNav},
    setup(props,context){

    }
}
</script>

<style lang="scss" scoped>

</style>