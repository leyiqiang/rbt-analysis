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
        <template v-slot:item.actions="{item}">
          <v-icon
            small
            class="mr-2"
            @click="goToEditPage(item)">
            mdi-pencil
          </v-icon>
        </template>
        <template v-slot:item.download="{item}">
          <download-excel
            @fetch="getTableData(item)">
            <v-icon
              small
              class="mr-2">
              mdi-arrow-down-bold
            </v-icon>
          </download-excel>

        </template>
      </v-data-table>

    </v-card>
  </v-container>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { ABC_TABLE, TABLE_ONE } from '@/utils/constants';
  import { TABLE_ONE_API } from '@/api/tableOne'
  // import  from '@/api/abcTable'
  import JsonExcel from 'vue-json-excel'

  const { mapMutations, mapGetters, mapState, mapActions } = createNamespacedHelpers('tablesManagement');
  import vueAxios from '@/api/vueAxios'

  export default {
    data() {
      return {
        testJsonData: [{a: '123'}],
        search: "",
        headers: [
          { text: '日期', value: 'date'},
          { text: '学生姓名', value: 'studentName'},
          { text: '表格名称', value: 'tableName' },
          { text: '修改', value: 'actions', sortable: false},
          { text: '下载', value: 'download', sortable: false}
        ],
        selectedType: undefined,
      }
    },
    computed: {
      ...mapState(['tables', 'tableTypes']),
    },
    methods: {
      ...mapActions(['getTableOnes', 'changeSelectedType', 'getTableData']),
      goToEditPage(item) {
        const { _id } = item
        switch(this.selectedType) {
          case(TABLE_ONE):
            this.$router.push({name:'tableOne', params: {tableID: _id}})
            break;
          case(ABC_TABLE):
            this.$router.push({name:'abcTable', params: {tableID: _id}})
            break;
        }
      },
      async getTableData(item) {
        const { _id } = item
        switch(this.selectedType) {
          case(TABLE_ONE):
            // todo try catch
            const res = vueAxios.get(TABLE_ONE_API + '/' + _id)
            console.log(res)
            break;
          case(ABC_TABLE):
            break;
        }
      }

    },
    components: {
      downloadExcel: JsonExcel
    },
    created() {
      // this.getTableOnes()
    }

  }
</script>

