<template>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
</template>

<script>
import { reactive, onMounted, ref, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  props: {
    iconClass: {
      type: String,
      default: "",
      required: true
    },
    className: {
      type: String,
      default: "",
      required: true
    }
  },
  setup(props, { root }) {
    // calculate properties
    const iconName = computed(() => `#icon-${props.iconClass}`);

    // calculate properties
    const svgClass = computed(() => {
      if (props.className) {
          return `svg-icon ${props.className}`;
      } else {
          return `svg-icon`;
      }
    });

    return {
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon{
    width: 1em;
    height: 1em;
    fill: currentColor;
}
</style>