<template>
  <button class="button" @click="onClick">
    <slot />
  </button>
</template>

<script>
  export default {
    name: 'formButton',
    props: {
      onClick: Function,
    },
  }
</script>

<style lang="scss">
  @import './button.scss';
</style>
