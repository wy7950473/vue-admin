<template>
    <div>
        ddd
    </div>
</template>

<script>
import tableLoadData from "@/mixins/tableLoadData";
export default {
    name:"mixin",
    mixins:[tableLoadData],
    data(){
        return {
            name:"111"
        }
    },
    methods:{
        // aaa(){
        //     console.log("aaaa");
        // }
    },
    beforeMount(){
        // console.log(this.name);
    },
    mounted(){
        // console.log("component");
        // this.aaa();
    }
}
</script>

<style lang="scss" scoped>
    
</style>