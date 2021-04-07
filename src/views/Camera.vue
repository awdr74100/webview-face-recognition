<template>
  <div class="container-fluid px-0">
    <div class="d-flex flex-column align-items-center justify-content-center">
      <div class="p-3 w-100">
        <select v-model="deviceId" class="form-control">
          <option value="" disabled>-- Select Camera --</option>
          <option v-for="camera in cameras" :key="camera.deviceId" :value="camera.deviceId">
            {{ camera.label }}
          </option>
        </select>
      </div>
      <div v-if="errorMessage" class="p-3 text-danger">{{ errorMessage }}</div>
      <div class="mx-3 overlay d-flex align-items-center justify-content-center">
        <vue-web-cam
          ref="webcam"
          class="webcam"
          width="100%"
          height="100%"
          :device-id="deviceId"
          @cameras="onCameras"
          @camera-change="onCameraChange"
          @error="onError"
          @notsupported="onError"
          @video-live="onVideoLive"
        />
      </div>
      <div v-if="modelStatus && !errorMessage" class="px-3 my-4">
        <div class="text-center h4 font-weight-normal">
          <span v-if="unlock" class="text-teal">UnLock</span>
          <span v-else class="text-danger">Lock</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js';
import { mapState } from 'vuex';

export default {
  data: () => ({
    deviceId: '',
    cameras: [],
    errorMessage: '',
    modelStatus: '',
    unlock: false,
    checkValue: 0,
  }),
  computed: {
    ...mapState(['user', 'features']),
  },
  watch: {
    async checkValue(val) {
      if (val < 3) return;
      await this.$store.dispatch('callServer', {
        uid: this.user.uid,
        soundId: this.user.soundId,
      });
      this.unlock = true;
    },
  },
  created() {
    this.$store.commit('SETLOADINGSTATUS', '相機啟動中');
    this.$store.commit('ISLOADING', true);
  },
  methods: {
    async onVideoLive() {
      if (this.modelStatus !== 'loaded') await this.loadModels();
      const webcam = document.querySelector('.webcam');
      const oldCanvas = document.querySelector('.face');
      const overlay = document.querySelector('.overlay');
      const canvas = faceapi.createCanvasFromMedia(webcam);
      const canvasSize = { width: webcam.clientWidth, height: webcam.clientHeight };
      canvas.classList.add('face');
      faceapi.matchDimensions(canvas, canvasSize);
      // clear canvas
      if (oldCanvas) overlay.removeChild(oldCanvas);
      // append canvas
      overlay.appendChild(canvas);
      // load labels
      const label = this.loadLabel();
      const labels = label ? [label] : [];
      // close loading
      this.$store.commit('ISLOADING', false);
      this.$store.commit('SETLOADINGSTATUS', '');
      // face recognition
      this.feceRecognition(webcam, canvas, canvasSize, labels, 500);
    },
    onCameras(cameras) {
      this.cameras = cameras;
      this.deviceId = cameras[0].deviceId;
    },
    onCameraChange() {
      this.$store.commit('SETLOADINGSTATUS', '相機啟動中');
      this.$store.commit('ISLOADING', true);
    },
    onError(error) {
      this.errorMessage = error;
      this.$store.commit('ISLOADING', false);
    },
    async loadModels() {
      this.$store.commit('SETLOADINGSTATUS', '模型載入中');
      await Promise.all([
        faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
      ]);
      this.modelStatus = 'loaded';
    },
    loadLabel() {
      const vm = this;
      const descriptions = vm.features.map((feature) => {
        return Float32Array.from(Object.values(JSON.parse(feature)));
      });
      if (!descriptions.length) return null;
      return new faceapi.LabeledFaceDescriptors(vm.user.displayName, descriptions);
    },
    feceRecognition(webcam, canvas, canvasSize, labels, ms) {
      const vm = this;
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(webcam, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()
          .withFaceDescriptors();
        const resizeDetections = faceapi.resizeResults(detections, canvasSize);
        canvas.getContext('2d').clearRect(0, 0, canvasSize.width, canvasSize.height);
        const distanceArray = [];
        if (labels.length > 0) {
          const faceMatcher = new faceapi.FaceMatcher(labels, 0.32);
          const results = resizeDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
          results.forEach((result, index) => {
            const { box } = resizeDetections[index].detection;
            const { label, distance } = result;
            if (label !== 'unknown' && vm.checkValue < 3) {
              this.checkValue += 1;
            }
            if (label === 'unknown' && vm.checkValue > 0 && vm.checkValue < 3) {
              this.checkValue -= 1;
            }
            distanceArray[index] = distance;
            new faceapi.draw.DrawTextField(
              [`${label} (${parseInt(distance * 100, 10)})`],
              box.bottomRight,
              { backgroundColor: distance < 0.32 ? '#20c997' : '#6c757d' },
            ).draw(canvas);
          });
          resizeDetections.forEach((detection, index) => {
            new faceapi.draw.DrawBox(
              {
                x: detection.detection.box.x,
                y: detection.detection.box.y,
                width: detection.detection.box.width,
                height: detection.detection.box.height,
              },
              { boxColor: (distanceArray[index] || 1) < 0.32 ? '#20c997' : '#6c757d' },
            ).draw(canvas);
          });
        }
      }, ms);
    },
  },
};
</script>
