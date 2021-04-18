<template>
  <div id="app">
    <Notification />
    <Loading />
    <Modal />
    <router-view></router-view>
  </div>
</template>

<script>
import Notification from '@/components/Notification.vue';
import Loading from '@/components/Loading.vue';
import Modal from '@/components/Modal.vue';

export default {
  components: {
    Notification,
    Loading,
    Modal,
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/all.scss';
</style>
