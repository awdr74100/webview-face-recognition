import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

const vm = Vue;

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
    user: {
      uid: '',
      displayName: '',
      email: '',
    },
    isSignIn: false,
    isLoading: false,
    loadingStatus: '',
    features: [],
  },
  actions: {
    async signin({ commit }, { uid }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/users/signin`;
      try {
        const { data } = await axios.post(url, { uid });

        if (!data.success) return false;
        commit('SETUSER', {
          uid,
          displayName: data.user.displayName,
          email: data.user.email,
          soundId: data.user.soundId,
        });
        commit('SETFEATURES', data.user.features);
        return true;
      } catch (error) {
        vm.notify({
          group: 'custom-template',
          title: error.message,
        });
        return false;
      }
    },
    async callServer(context, { uid, soundId }) {
      const url = `${process.env.VUE_APP_BASE_URL}/api/server/call`;
      try {
        await axios.post(url, { uid, soundId });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mutations: {
    SETUSER(state, { uid, displayName, email, soundId }) {
      state.user.uid = uid;
      state.user.displayName = displayName;
      state.user.email = email;
      state.user.soundId = soundId;
    },
    ISSIGNIN(state, status) {
      state.isSignIn = status;
    },
    ISLOADING(state, status) {
      state.isLoading = status;
    },
    SETLOADINGSTATUS(state, status) {
      state.loadingStatus = status;
    },
    SETFEATURES(state, features) {
      state.features = features;
    },
  },
});
