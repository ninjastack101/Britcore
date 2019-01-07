import Vue from 'vue/dist/vue.js';
import TableComponent from '../src/components/TableComponent';


/*
 * We'll globally install the table component as a Vue plugin so we don't need
 * to worry about importing the components for every test.
 */

Vue.use(TableComponent);
Vue.config.productionTip = false;
