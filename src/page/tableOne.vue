<template>
    <v-form value>
      <v-container>
        <v-row>
          <v-col cols="12" md="3">
            <v-text-field
              :value="tableType"
              label="表格类型"
              readonly
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
              <v-text-field
                :value="tableName"
                label="表格名称"
                readonly
                required
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
              <v-text-field
                :value="studentName"
                label="学生姓名"
                readonly
                required
              ></v-text-field>
          </v-col>
          <v-col cols="12" md="3">
            <v-text-field
              readonly
              :value="date"
              label="日期"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapMutations, mapState, mapActions } = createNamespacedHelpers('tableOne');
  export default {
    data() {
      return {
        tableType: 'TableOne',
        tableName: this.$route.params.tableName,
        studentName: this.$route.params.studentName,
        date: this.$route.params.date
      }
    },
    methods: {
      ...mapActions(['getTableData']),
    },
    created() {
        this.getTableData()
    },

  }
</script>
