import Vue from 'vue/dist/vue.js';
import App from '../src/App';
import TableComponent from '../src/components/TableComponent';
import TableColumn from '../src/components/TableColumn';

export default async function createVm(callback = null) {
  Vue.component('app', Vue.extend(App));
  Vue.component('table-component', Vue.extend(TableComponent));
  Vue.component('table-column', Vue.extend(TableColumn));
  const vm = new Vue({
    el: '#app'
  });

  await Vue.nextTick();

  const table = vm.$children[0];

  if (callback) {
    callback(table);

    await Vue.nextTick();
  }

  return table;
}
