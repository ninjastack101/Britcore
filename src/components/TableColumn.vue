<template>
  <!-- Never render the contents -->
  <!-- The scoped slot won't have the required data -->
  <div v-if="false">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "table-column",

  props: {
    show: { required: false, type: String },
    label: { default: null, type: String },
    dataType: { default: "string", type: String },

    sortable: { default: true, type: Boolean },
    sortBy: { default: null },

    filterable: { default: true, type: Boolean },
    filterOn: { default: null },

    formatter: { default: v => v, type: Function },

    hidden: { default: false, type: Boolean },

    cellClass: { default: "" },
    headerClass: { default: "" }
  }
};
</script>
