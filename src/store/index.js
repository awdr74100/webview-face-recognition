import Vue from 'vue';
import Vuex from 'vuex';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';

const vm = Vue;

Vue.use(Vuex);

export default new Vuex.Store({
  strict: import.meta.env.DEV,
  state: {
    user: {
      uid: '',
      displayName: '',
      email: '',
      soundId: '',
    },
    isSignIn: false,
    isLoading: false,
    loadingStatus: '',
    features: [],
    showModal: false,
  },
  actions: {
    async signin({ commit }, { uid }) {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/api/users/signin`;
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
    async callServer(context, { uid, soundId, door }) {
      const url = `${import.meta.env.VITE_APP_BACKEND_URL}/api/server/call`;
      try {
        await axios.post(url, { uid, soundId, door });
      } catch (error) {
        vm.notify({
          group: 'custom-template',
          title: error.message,
        });
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
    SHOWMODAL(state, status) {
      const modal = new Modal('#customModal', {
        backdrop: 'static',
        keyboard: false,
      });
      state.showModal = status;
      modal[status ? 'show' : 'hide']();
    },
  },
});
