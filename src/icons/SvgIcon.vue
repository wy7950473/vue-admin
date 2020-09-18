<template>
    <div>
        <svg :class="svgClass" aria-hidden="true">
            <use :xlink:href="name"></use>
        </svg>
    </div>
</template>

<script>
import { reactive, onMounted, ref } from "@vue/composition-api";
export default {
    name:"svgIcon",
    setup(props,{root}){

    }
}
</script>

<style lang="scss" scoped>

</style>