<template>
  <div class="table-component">
    <div v-if="showFilter && filterableColumnExists" class="table-component__filter">
      <input
        :class="fullFilterInputClass"
        type="text"
        v-model="filter"
        :placeholder="filterPlaceholder"
      >
      <a v-if="filter" @click="filter = ''" class="table-component__filter__clear">×</a>
    </div>

    <div class="table-component__table-wrapper">
      <table :class="fullTableClass">
        <caption
          v-if="showCaption"
          class="table-component__table__caption"
          role="alert"
          aria-live="polite"
        >{{ ariaCaption }}</caption>
        <thead :class="fullTableHeadClass">
          <tr>
            <table-column-header
              @click="changeSorting"
              v-for="column in columns"
              :key="column.show"
              :sort="sort"
              :column="column"
            ></table-column-header>
          </tr>
        </thead>
        <tbody :class="fullTableBodyClass">
          <table-row
            v-for="row in displayedRows"
            :key="row.vueTableComponentInternalRowId"
            :row="row"
            :columns="columns"
            @rowClick="emitRowClick"
          ></table-row>
        </tbody>
        <tfoot>
          <slot name="tfoot" :rows="rows"></slot>
        </tfoot>
      </table>
    </div>

    <div v-if="displayedRows.length === 0" class="table-component__message">{{ filterNoResults }}</div>

    <div style="display:none">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Column from "../classes/Column";
import Row from "../classes/Row";
import TableColumnHeader from "./TableColumnHeader";
import TableRow from "./TableRow";
import { classList } from "../helpers";

export default {
  name: "table-component",
  components: {
    TableColumnHeader,
    TableRow
  },

  props: {
    data: { default: () => [], type: [Array, Function] },

    showFilter: { default: true },
    showCaption: { default: true },

    sortBy: { default: "", type: String },
    sortOrder: { default: "", type: String },

    tableClass: { default: () => "" },
    theadClass: { default: () => "" },
    tbodyClass: { default: () => "" },
    filterInputClass: { default: () => "" },
    filterPlaceholder: { default: () => "" },
    filterNoResults: { default: () => "" }
  },

  data: () => ({
    columns: [],
    rows: [],
    filter: "",
    sort: {
      fieldName: "",
      order: ""
    },
    localSettings: {}
  }),

  created() {
    this.sort.fieldName = this.sortBy;
    this.sort.order = this.sortOrder;
  },

  async mounted() {
    const columnComponents = this.$slots.default
      .filter(column => column.componentInstance)
      .map(column => column.componentInstance);

    this.columns = columnComponents.map(column => new Column(column));

    columnComponents.forEach(columnCom => {
      Object.keys(columnCom.$options.props).forEach(prop =>
        columnCom.$watch(prop, () => {
          this.columns = columnComponents.map(column => new Column(column));
        })
      );
    });
    await this.mapDataToRows();
  },

  watch: {
    filter() {
      if (!this.usesLocalData) {
        this.mapDataToRows();
      }
    },

    data() {
      if (this.usesLocalData) {
        this.mapDataToRows();
      }
    }
  },

  computed: {
    fullTableClass() {
      return classList("table-component__table", this.tableClass);
    },

    fullTableHeadClass() {
      return classList("table-component__table__head", this.theadClass);
    },

    fullTableBodyClass() {
      return classList("table-component__table__body", this.tbodyClass);
    },

    fullFilterInputClass() {
      return classList("table-component__filter__field", this.filterInputClass);
    },

    ariaCaption() {
      if (this.sort.fieldName === "") {
        return "Table not sorted";
      }

      return (
        `Table sorted by ${this.sort.fieldName} ` +
        (this.sort.order === "asc" ? "(ascending)" : "(descending)")
      );
    },

    usesLocalData() {
      return Array.isArray(this.data);
    },

    displayedRows() {
      if (!this.usesLocalData) {
        return this.sortedRows;
      }

      if (!this.showFilter) {
        return this.sortedRows;
      }

      if (!this.columns.filter(column => column.isFilterable()).length) {
        return this.sortedRows;
      }

      return this.sortedRows.filter(row => row.passesFilter(this.filter));
    },

    sortedRows() {
      if (!this.usesLocalData) {
        return this.rows;
      }

      if (this.sort.fieldName === "") {
        return this.rows;
      }

      if (this.columns.length === 0) {
        return this.rows;
      }

      const sortColumn = this.getColumn(this.sort.fieldName);

      if (!sortColumn) {
        return this.rows;
      }
      // eslint-disable-next-line
      return this.rows.sort(
        sortColumn.getSortPredicate(this.sort.order, this.columns)
      );
    },

    filterableColumnExists() {
      return this.columns.filter(c => c.isFilterable()).length > 0;
    }
  },

  methods: {
    async mapDataToRows() {
      const data = this.prepareLocalData();

      let rowId = 0;

      this.rows = data
        .map(rowData => {
          rowData.vueTableComponentInternalRowId = rowId++;
          return rowData;
        })
        .map(rowData => new Row(rowData, this.columns));
    },

    prepareLocalData() {
      return this.data;
    },

    changeSorting(column) {
      if (this.sort.fieldName !== column.show) {
        this.sort.fieldName = column.show;
        this.sort.order = "asc";
      } else {
        this.sort.order = this.sort.order === "asc" ? "desc" : "asc";
      }
    },

    getColumn(columnName) {
      return this.columns.find(column => column.show === columnName);
    },

    emitRowClick(row) {
      this.$emit("rowClick", row);
      this.$emit("row-click", row);
    }
  }
};
</script>
<style>
.table-component__table td {
  padding: 0.75em 1.25em;
  vertical-align: top;
  text-align: left;
  padding: 15px;
}
</style>

<style scoped>
*,
*:after,
*:before {
  position: relative;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.table-component {
  display: flex;
  flex-direction: column;
  margin: 4em 0;
}

.table-component__filter {
  align-self: flex-end;
}

.table-component__filter__field {
  padding: 0 1.25em 0 0.75em;
  height: 2.5em;
  border: solid 2px #e0e0e0;
  border-radius: 2em;
  font-size: inherit;
}

.table-component__filter__clear {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  color: #007593;
  font-weight: bold;
  cursor: pointer;
}

.table-component__filter__field:focus {
  outline: 0;
  border-color: #007593;
}

.table-component__table-wrapper {
  overflow-x: auto;
  margin: 1em 0;
  width: 100%;
  border: solid 1px #ddd;
  border-bottom: none;
}

.table-component__table {
  min-width: 100%;
  border-collapse: collapse;
  border-bottom: solid 1px #ddd;
  table-layout: fixed;
}

.table-component__table__caption {
  position: absolute;
  top: auto;
  left: -10000px;
  overflow: hidden;
  width: 1px;
  height: 1px;
}

.table-component__table th,
.table-component__table td {
  padding: 0.75em 1.25em;
  vertical-align: top;
  text-align: left;
  padding: 15px;
}

.table-component__table th {
  background-color: #e0e0e0;
  color: #999;
  text-transform: uppercase;
  white-space: nowrap;
  background: #f8f9fa;
  color: #01798e;
  border-bottom: 2px solid #dee2e6;
}

.table-component__table tbody tr:nth-child(even) {
  background-color: #f0f0f0;
}

.table-component__table a {
  color: #007593;
}

.table-component__message {
  color: #999;
  font-style: italic;
}

.table-component__th--sort,
.table-component__th--sort-asc,
.table-component__th--sort-desc {
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.table-component__th--sort-asc:after,
.table-component__th--sort-desc:after {
  position: absolute;
  left: 0.25em;
  display: inline-block;
  color: #bbb;
}

.table-component__th--sort-asc:after {
  content: "↑";
}

.table-component__th--sort-desc:after {
  content: "↓";
}
</style>
