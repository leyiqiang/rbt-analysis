<template>
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
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
    },
    props: ['studentName', 'date', 'tableName', 'tableType'],
  }
</script>