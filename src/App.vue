<template>
  <div id="app">
    <Notification />
    <Loading />
    <router-view></router-view>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue';
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Notification,
    Loading,
  },
};
</script>

<style lang="scss">
@import '~@/assets/scss/all.scss';
</style>
