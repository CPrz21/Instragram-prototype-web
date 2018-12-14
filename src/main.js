import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/css/tailwind.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faHandsHelping,
  faCaretLeft,
  faCaretRight,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
  faHeart,
  faComments,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VDatePicker from 'v-calendar';
import 'v-calendar/lib/v-calendar.min.css';
import VueMasonry from 'vue-masonry-css';

Vue.use(VDatePicker, {
  firstDayOfWeek: 2,
  locale:'en'
});

Vue.use(VueMasonry);

library.add(faEye, faHandsHelping, faCaretLeft, faCaretRight, faSignOutAlt, faChevronLeft, faChevronRight, faHeart, faComments);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render(h) {
    return h(App);
  },
}).$mount('#app');
