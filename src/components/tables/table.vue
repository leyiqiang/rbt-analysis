<template>
  <v-container>
    <table-header></table-header>
    <v-divider></v-divider>
    <v-card
      class="mx-auto"
      outlined>
      <v-container>
        <v-row dense justify="center">
          <v-col align-self="center">
            <s-t-o-menu></s-t-o-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-col align-self="center">
            <v-switch v-model="currentData.isSuccess"
                      label="success"
                      color="success"
                      value="success"
                      :label="getLabel"
                      @change="changeIsSuccess"></v-switch>
            <v-btn-toggle
              value="na"
              color="deep-purple accent-3"
            >
              <v-btn value="na">
                N/A
              </v-btn>
              <v-btn value="gesture">
                G
              </v-btn>
              <v-btn value="verbalPrompt">
                V
              </v-btn>
              <v-btn value="partialVerbal">
                PV
              </v-btn>
              <v-btn value="Physical">
                P
              </v-btn>
              <v-btn value="partialPhysical">
                PP
              </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col align-self="end">
            <v-text-field
              :value="currentData.note"
              label="备注"
              required>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="end">
            <v-btn @click='addData' class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <!--<v-data-table-->
      <!--:headers="headers"-->
      <!--:items="desserts"-->
      <!--:items-per-page="5"-->
      <!--class="elevation-1"-->
    <!--&gt;</v-data-table>-->
  </v-container>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import TableHeader from './tableHeader'
  import STOMenu from './stoMenu'
  export default {
    data() {
      return {
      }
    },
    computed: {
      getLabel() {
        const sign =  this.currentData.isSuccess? "+" : "-";
        return "是否完成: " + sign
      },
      ...mapState("table", [
        'data',
        'currentData']),
      ...mapState("sto", [
        'selectedSTO']),
      ...mapState("tableHeader", [
        'tableName',
        'studentName',
        'date']),
    },
    methods: {
      ...mapMutations("table", [
        'changeIsSuccess'
      ]),
      addData(studentName, tableName, date, selectedSTO, currentData) {

      }
    },
    components: {
      TableHeader,
      STOMenu
    },
    modules: {

    },

  }
</script>
