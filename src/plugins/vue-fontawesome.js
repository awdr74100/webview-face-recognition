import Vue from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

library.add([faSpinner, faTimes]);

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
