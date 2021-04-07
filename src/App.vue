<template>
  <div id="app">
    <Loading />
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/all.scss';
</style>
