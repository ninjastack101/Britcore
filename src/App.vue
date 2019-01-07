<template>
  <div id="appTable">
    <table-component :data="getData()" sort-by="name" sort-order="asc" ref="table" filter-placeholder="Filter data...">
      <table-column :sortable="false" show="id" label="ID"></table-column>
      <table-column show="name" label="Name"></table-column>
      <table-column show="description" label="Description"></table-column>
      <table-column show="date" label="Date" data-type="date:YYYY-MM-DDTHH:mm:ss"></table-column>
      <table-column show="amount" label="Amount" data-type="numeric"></table-column>
      <table-column :sortable="false" :filterable="false">
        <template slot-scope="payment">
          <button v-on:click="openModal(payment)">Edit</button>
        </template>
      </table-column>
    </table-component>
    <edit-row
      v-if="showModal"
      :payment="currentSelectedPayment"
      @close="showModal = false"
      @submit="updatePayment"
    ></edit-row>
  </div>
</template>

<script>
import TableComponent from "./components/TableComponent";
import TableColumn from "./components/TableColumn";
import EditRow from "./components/EditRow";

export default {
  name: "App",
  components: {
    TableComponent,
    TableColumn,
    EditRow
  },

  data: () => ({
    showModal: false,
    currentSelectedPayment: {}
  }),

  methods: {
    getData() {
      return this.$store.state.users;
    },

    openModal(payment) {
      this.showModal = true;
      this.currentSelectedPayment = payment;
    },

    updatePayment(payment) {
      this.$store.dispatch("updateUser", payment);
      this.showModal = false;
    }
  },
  mounted() {
    this.$store.dispatch("getUsers");
  }
};
</script>
