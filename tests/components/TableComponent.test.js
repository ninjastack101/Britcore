import Vue from 'vue/dist/vue.js';
import simulant from 'simulant';
import App from '../../src/App';
import TableComponent from '../../src/components/TableComponent';
import TableColumn from '../../src/components/TableColumn';

describe('TableComponent', () => {

  it('can mount', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ firstName: 'John' },{ firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('can display nested properties', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{nested: { firstName: 'John' } }, { nested: { firstName: 'Paul' }}]">
                    <table-column show="nested.firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });


  it('supports a scoped slot inside the table column', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ firstName: 'John' },{ firstName: 'Paul' }]">
                    <table-column label="First name">
                        <template slot-scope="row">
                           {{ row.firstName }} slot
                        </template>
                    </table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('supports a named slot to display a tfoot section', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ firstName: 'John' },{ firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                    <template slot="tfoot" slot-scope="{ rows }">
                        <tr>
                            <td>Name count:</td>
                            <td>{{ rows.length }}</td>
                        </tr>
                    </template>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('has an prop to disable the filter', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component :show-filter="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('has an prop to disable the caption', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component :show-caption="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('will use the property name as a column heading if label is not set', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component :show-filter="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName"></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('won\'t use the property name as a column heading if label is an empty string', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component :show-filter="false"
                    :data="[{ firstName: 'John' },{ id: 2, firstName: 'Paul' }]">
                    <table-column show="firstName" label=""></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('can accept a function to fetch the data', async () => {
    const serverResponse = () => {
      return {
        data: [{
          firstName: 'John'
        }, {
          id: 2,
          firstName: 'Paul'
        }],
      };
    };

    document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="${serverResponse}">
                    <table-column show="firstName" label="First name"></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    await Vue.nextTick();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('can add extra classes to the table, the cells and the headers', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component
                    :data="[{ firstName: 'John' },{ firstName: 'Paul' }]"
                    table-class="my-table"
                    thead-class="my-thead"
                    tbody-class="my-tbody"
                >
                    <table-column
                        show="firstName"
                        label="First name"
                        header-class="my-header"
                        cell-class="my-cell"
                    ></table-column>
                </table-component>
            </div>
        `;

    await createVm();

    expect(document.body.innerHTML).toMatchSnapshot();
  });

  it('can update columns', async () => {
    document.body.innerHTML = `
            <div id="app">
                <table-component :data="[{ firstName: 'John' },{ firstName: 'Paul' }]">
                    <table-column show="firstName" :label="label"></table-column>
                </table-component>
            </div>
        `;

    const vm = new Vue({
      el: '#app',
      data: {
        label: 'First name',
      },
    });

    await Vue.nextTick();

    expect(document.body.innerHTML).toMatchSnapshot();

    vm.label = 'Something else';

    await Vue.nextTick();

    expect(document.body.innerHTML).toMatchSnapshot();
  });
});

async function createVm() {
  Vue.component('app', Vue.extend(App));
  Vue.component('table-component', Vue.extend(TableComponent));
  Vue.component('table-column', Vue.extend(TableColumn));
  const vm = new Vue({
    el: '#app',
  });

  await Vue.nextTick(() => {});

  const table = vm.$children[0];

  return table;
}
