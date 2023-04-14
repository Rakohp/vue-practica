import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from '../src/store/store'
import { setConnection } from "../src/connection/routes";

setConnection();
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
