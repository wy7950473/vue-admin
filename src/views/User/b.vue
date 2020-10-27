<template>
    <div>
        {{ test }}
        <el-button @click="backcall" type="danger">孙组件按钮</el-button>
    </div>
</template>

<script>
import { inject, reactive } from '@vue/composition-api';
export default {
    name:"B",
    setup(props,{ root,emit,attrs }){
        
        const test = reactive(attrs);

        const backcall = () => {
            emit("upAA");
        }

        return {
            test,
            backcall
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>