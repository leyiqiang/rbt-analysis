<template>
  <v-container>
    <table-header :tableName="tableName"
                  :studentName="studentName"
                  :date="date">
    </table-header>
    <v-divider></v-divider>
    <v-card
      class="mx-auto"
      outlined>
      <v-container>
        <v-row dense justify="center">
          <v-col align-self="center">
            <s-t-o-menu :STOs="STOs" :selectedSTO="selectedSTO" :newSTO="newSTO"></s-t-o-menu>
          </v-col>
        </v-row>
        <data-record
          @changeIsSuccess="changeIsSuccess"
          @changePromptLevel="changePromptLevel"
          @changeNote="changeNote"
          :currentData="currentData">
        </data-record>

        <v-row>
          <v-col align="end">
            <v-btn @click='addData' class="mx-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>

      </v-container>
    </v-card>

    <v-container>
      <v-data-iterator :items="getDataKeys">
        <template v-slot:header>
          <v-toolbar
            class="mb-2"
            color="indigo darken-5"
            dark
            flat
          >
            <v-toolbar-title>数据记录</v-toolbar-title>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item">
              <v-card>
                <v-card-title class="subheading font-weight-bold">{{ item }}</v-card-title>
                <v-divider></v-divider>

                <v-list dense>
                  <v-list-item v-for="(lineData, idx) in data[item]">
                      {{idx+1}}:
                    <v-chip
                      label
                      class="ma-2"
                      :color="lineData.isSuccess?'green':'pink'"
                      text-color="white"
                    >
                      <v-icon v-if="lineData.isSuccess "left>mdi-plus</v-icon>
                      <v-icon v-else left>mdi-minus</v-icon>
                      {{lineData.promptLevel}}
                    </v-chip>
                    <v-list-item-content>
                      备注:{{lineData.note}}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>

            </v-col>
          </v-row>

        </template>
      </v-data-iterator>
    </v-container>
  </v-container>
</template>
<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import TableHeader from './tableHeader'
  import STOMenu from './stoMenu'
  import DataRecord from './dataRecord'
  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapState("table", [
        'data',
        'currentData']),
      ...mapState("sto", [
        'STOs',
        'newSTO',
        'selectedSTO']),
      ...mapGetters('table',[
        'getDataKeys',
      ]),
      ...mapState("tableHeader", [
        'tableName',
        'studentName',
        'date']),
    },
    methods: {
      ...mapMutations("table", [
        'changeIsSuccess',
        'changePromptLevel',
        'changeNote',
      ]),
      addData(studentName, tableName, date, selectedSTO, currentData) {

      }
    },
    components: {
      TableHeader,
      STOMenu,
      DataRecord
    },
    modules: {

    },

  }
</script>
