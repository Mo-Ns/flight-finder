<template>
  <input
    class="input"
    :value="modelValue"
    :name="name"
    type="text"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
  export default {
    name: 'formInput',
    props: [
      'name',
      'placeholder',
      'modelValue',
    ]
  }
</script>

<style lang="scss">
  @import "./input.scss";
</style>
