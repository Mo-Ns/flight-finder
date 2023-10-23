<script lang="ts">
  export default {
    name: 'chip',
    props: {
      classname: {
        type: String,
        default: ""
      },
    },
  }
</script>

<template>
  <div class="chip" :class="classname">
    <slot></slot>
  </div>
</template>

<style lang="scss">
  @import "./chip.scss";
</style>