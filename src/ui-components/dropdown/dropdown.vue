<script setup lang="ts">
  import InfoSort from '../../icons/iconSort.vue';
  import InfoCheck from '../../icons/iconCheck.vue';
  import { SORTBY, SortItem } from '../../constants';
</script>

<script lang="ts">
  export default {
    name: 'dropdown',
    data: () => {
      return {
        showMenu: false
      }
    },
    props: {
      onClick: Function,
      selectedItem: String,
      items: {
        type: Object,
        default: []
      }
    },
    mounted () {
      document.addEventListener('click', this.close)
    },
    beforeDestroy () {
      document.removeEventListener('click',this.close)
    },
    computed: {
      selectedItemLabel: function(): string {
        return this.items?.find((item: SortItem) => item.value === this.selectedItem)?.label;
      }
    },
    methods: {
      toggleShow: function(): void {
        this.showMenu = !this.showMenu;
      },
      itemClicked: function(item: SORTBY): void {
        this.toggleShow();
        this.onClick(item);
      },
      close: function(e): void {
        if (!this.$el.contains(e.target)) {
          this.showMenu = false
        }
      }
    }
  }
</script>

<template>
  <div class="dropdown-wrapper">
    <button @click='toggleShow' class='dropdown-toggle shadow'>
      <InfoSort class="mr-5" />
      <span class="mr-10">Sort:</span>
      <span class="primary-text">{{ selectedItemLabel }}</span>
    </button>

    <div v-if='showMenu' class='dropdown-menu'>
      <div class='dropdown-menu__item' v-for='(item, index) in items' :key="'item' + index" @click='itemClicked(item.value)'>
        {{ item.label }} <InfoCheck v-if="item.value===selectedItem" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @import "./dropdown.scss";
</style>