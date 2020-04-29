<template>
  <v-container>
    <v-row>
      <v-select
        v-model="selectedType"
        :items="tableTypes"
        label="请选择表格类型"
        @change="changeSelectedType(selectedType)"
      ></v-select>
    </v-row>
    <v-card>
      <v-card-title>{{selectedType}}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="搜索"
          single-line
          hide-details>
        </v-text-field>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="tables"
        :items-per-page="10">

      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import tablesManagement from '@/store/modules/tablesManagement';
  const { mapMutations, mapGetters, mapState, mapActions } = createNamespacedHelpers('tablesManagement');
  export default {
    data() {
      return {
        search: "",
        headers: [
          { text: '日期', value: 'date'},
          { text: '学生姓名', value: 'studentName'},
          { text: '表格名称', value: 'tableName' }
        ],
        selectedType: undefined,
      }
    },
    computed: {
      ...mapState(['tables', 'tableTypes']),
    },
    methods: {
      ...mapActions(['getTableOnes', 'changeSelectedType'])

    },
    created() {
      // this.getTableOnes()
    }

  }
</script>

