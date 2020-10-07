<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name:"infoDetailed",
    setup(props,{root}){
        console.log(root.$store.getters["infoDetailed/infoId"]);
        console.log(root.$store.getters["infoDetailed/infoTitle"]);
    }
}
</script>

<style lang="scss" scoped>

</style>