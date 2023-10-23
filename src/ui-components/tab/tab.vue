<script setup lang="ts">
  import InfoSort from '../../icons/iconSort.vue';
  import InfoCheck from '../../icons/iconCheck.vue';
  import { SORTBY, SortItem } from '../../constants';
</script>

<script lang="ts">
  export default {
    name: 'tab',
    props: {
      onClick: Function,
      selectedItem: String,
      items: {
        type: Object,
        default: []
      }
    },
    computed: {
      selectedItemLabel: function(): string {
        return this.items?.find((item: SortItem) => item.value === this.selectedItem)?.label;
      }
    }
  }
</script>

<template>
  <ul class="tab shadow">
    <li class='tab__item' v-for='(item, index) in items' :key="'item' + index" :class="{ active: (item.value===selectedItem) }" @click='onClick(item.value)'>
      <span class="tab__link">{{ item.label }}</span>
    </li>
  </ul>
</template>

<style lang="scss">
  @import "./tab.scss";
</style>