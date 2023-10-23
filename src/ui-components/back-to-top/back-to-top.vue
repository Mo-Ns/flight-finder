<script setup lang="ts">
  import BackTopTopIcon from '../../icons/iconArrowTop.vue';
  import { MIN_SCROLL_TOP } from '../../constants'
</script>

<script lang="ts">
  export default {
    name: 'backToTop',
    data () {
      return {
        timer: 0,
        scrollTop: 0
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    destroyed() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll: function(): void {
        if (this.timer) return;

        this.timer = setTimeout(() => {
          this.scrollTop = window.scrollY;
          clearTimeout(this.timer);
          this.timer = 0;
        }, 100);
      },

      scrollToTop: (): void => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }
</script>

<template>
  <div class="back-to-top" v-if="scrollTop > MIN_SCROLL_TOP" @click="scrollToTop">
    <BackTopTopIcon />
  </div>
</template>

<style lang="scss">
  @import "./back-to-top.scss";
</style>

