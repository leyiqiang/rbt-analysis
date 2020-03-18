<template>
  <v-form value>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            :value="tableName"
            counter="10"
            label="表格名称"
            @change="changeTableName"
            required>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            :value="studentName"
            counter="10"
            label="学生姓名"
            @change="changeStudentName"
            required>
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-menu
            ref="menu"
            :value="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="date"
                label="日期"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker :value="date" @change="changeDate" no-title color="green">
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapMutations } = createNamespacedHelpers('tableHeader');
  export default {
    data() {
      return {
        menu: false,
      }
    },
    methods: {
      ...mapMutations([
        'changeTableName',
        'changeStudentName',
        'changeDate'
      ]),
    },
    computed: {
      ...mapState([
        'studentName',
        'tableName',
        'date'
      ])
    }
  }
</script>
