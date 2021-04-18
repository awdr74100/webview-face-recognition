<template>
  <div
    class="container d-flex justify-content-center align-items-center vw-100 vh-100"
  >
    <button
      class="btn btn-primary font-weight-bold py-0 px-0 d-flex align-items-center"
      @click.prevent="signIn"
    >
      <div
        class="bg-white d-flex justify-content-center align-items-center text-danger"
        style="margin: 1px"
      >
        <span class="icon m-2"></span>
      </div>
      <span class="mx-3">Sign in with Google</span>
    </button>
  </div>
</template>

<script>
import qs from 'qs';

export default {
  methods: {
    signIn() {
      const url = 'https://accounts.google.com/o/oauth2/v2/auth?';
      const params = qs.stringify({
        scope: 'email profile',
        client_id: import.meta.env.VITE_APP_OAUTH_ID,
        response_type: 'token',
        redirect_uri: `${window.location.origin}/camera`,
      });
      window.location.href = url + params;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon {
  width: 24px;
  height: 24px;
  background-image: url('@/assets/img/google.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
