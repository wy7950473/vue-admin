<template>
    <div>
        <B v-bind="$attrs" v-on="$listeners" />
    </div>
</template>

<script>
import { reactive,inject } from '@vue/composition-api';
import B from "./b";
export default {
    name:"A",
    components:{
        B
    },
    setup(props,{ root,attrs }){

        // const valueA = inject("customVal");

        // console.log(valueA);
        
        const test = reactive(attrs);

        return {
            test
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>