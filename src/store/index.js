import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations'; 

Vue.use(Vuex);

const state =  {
  users: []
}
export const store = new Vuex.Store({
  state: state,
  actions: actions,
  mutations: mutations
});
