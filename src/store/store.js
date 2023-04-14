import Vue from "vue";
import Vuex from "vuex";
import personas from "../store/Personas/index"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    personas
  },
});
