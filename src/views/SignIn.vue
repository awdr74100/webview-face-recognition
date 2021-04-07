<template>
  <div class="container d-flex justify-content-center align-items-center vw-100 vh-100">
    <button
      v-if="!errorMessage"
      class="btn btn-primary font-weight-bolder py-0 px-0 d-flex align-items-center"
      @click.prevent="signIn"
    >
      <div
        class="bg-white d-flex justify-content-center align-items-center text-danger"
        style="margin: 1px"
      >
        <span class="icon m-2"></span>
      </div>
      <span class="ml-3 mr-3">Sign in with Google</span>
    </button>
    <h2 v-else class="text-secondary">{{ errorMessage }}</h2>
  </div>
</template>

<script>
import { auth, provider } from '@/connection/firebase';

export default {
  data: () => ({
    errorMessage: '',
  }),
  created() {
    this.authStateChange();
  },
  methods: {
    signIn() {
      auth.signInWithRedirect(provider);
    },
    async authStateChange() {
      try {
        const { user } = await auth.getRedirectResult();
        if (!user) return;
        const result = await this.$store.dispatch('signin', { uid: user.uid });
        if (!result) {
          this.errorMessage = '用戶尚未註冊';
          return;
        }
        this.$store.commit('ISSIGNIN', true);
        this.$router.push({ path: '/camera' });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  background-image: url('~@/assets/img/google.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
