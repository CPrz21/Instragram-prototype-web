import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/css/tailwind.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faHandsHelping,
  faCaretLeft,
  faCaretRight,
  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faEye, faHandsHelping, faCaretLeft, faCaretRight, faSignOutAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
