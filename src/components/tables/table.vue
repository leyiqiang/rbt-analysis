<template>
  <v-container>
    <table-header></table-header>
    <!--<v-data-table-->
      <!--:headers="headers"-->
      <!--:items="desserts"-->
      <!--:items-per-page="5"-->
      <!--class="elevation-1"-->
    <!--&gt;</v-data-table>-->
  </v-container>
</template>
<script>
  import TableHeader from './tableHeader'
  export default {
    data() {
      return {
        msg: 'table page'
      }
    },
    components: {
      TableHeader
    },
    modules: {

    },

  }
</script>
