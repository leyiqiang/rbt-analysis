<template>
  <v-container>
    <table-header :studentName="studentName" :tableName="tableName" :date="date" :tableType="tableType">
    </table-header>
    <json-excel
      class   = "btn btn-default"
      :data   = "abcs"
      :fields = "json_fields"
      worksheet = "干预记录表"
      :name = "getTableName()">
      <v-btn>
        下载Excel
      </v-btn>
    </json-excel>
    <v-data-table
      :headers="headers"
      :items="abcs"
      sort-by="calories"
      class="elevation-1"
    >
    </v-data-table>
  </v-container>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import _ from 'lodash'
  import JsonExcel from 'vue-json-excel'
  import TableHeader from '@/components/tables/tableHeader'

  export default {
    data() {
      return {
        headers: [
          {
            text: 'Antecedent(前因)',
            align: 'start',
            sortable: false,
            value: 'antecedent',
          },
          { text: 'Behavior(行为)', value: 'behavior', sortable: false },
          { text: 'Consequence(后果)', value: 'consequence', sortable: false },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        json_fields: {
          'Antecedent(前因)': 'antecedent',
          'Behavior(行为)': 'behavior',
          'Consequence(后果)': 'consequence'
        },
      }
    },
    computed:  {
      ...mapState("tableOne", ['records', 'tableName', 'studentName', 'date', 'tableType']),
    },
    components: {
      JsonExcel,
      TableHeader
    },
    methods: {
      ...mapActions("tableOne", [
        'getTableData',
      ]),
      getTableName() {
        return this.studentName + '-' + this.tableName + '-' + this.date +'.xls'
      }
    },
    created() {
      this.getTableData()
    }
  }
</script>
