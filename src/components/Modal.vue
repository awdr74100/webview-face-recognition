<template>
  <div
    id="customModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="customModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-teal text-white">
          <h5 id="customModalLabel" class="modal-title">選擇對象</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click.prevent="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-0">
            <select v-model="door" class="form-select">
              <option value="" disabled>-- Select Door --</option>
              <option value="door1">大門</option>
              <option value="door2">側門</option>
              <option value="door3">後門</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click.prevent="closeModal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-outline-teal"
            data-bs-dismiss="modal"
            :disabled="!door"
            @click.prevent="upload"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    door: '',
  }),
  computed: {
    ...mapState(['user']),
  },
  methods: {
    closeModal() {
      this.$store.commit('SHOWMODAL', false);
    },
    async upload() {
      try {
        this.$store.commit('SETLOADINGSTATUS', '命令中');
        this.$store.commit('ISLOADING', true);
        await this.$store.dispatch('callServer', {
          uid: this.user.uid,
          soundId: this.user.soundId,
          door: this.door,
        });
        this.$store.commit('SETLOADINGSTATUS', '');
        this.$store.commit('SHOWMODAL', false);
        this.$store.commit('ISLOADING', false);
      } catch (error) {
        this.$notify({
          group: 'custom-template',
          title: error.message,
        });
        this.$store.commit('SETLOADINGSTATUS', '');
        this.$store.commit('SHOWMODAL', false);
        this.$store.commit('ISLOADING', false);
      }
    },
  },
};
</script>
