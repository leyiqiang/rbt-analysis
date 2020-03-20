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
            <s-t-o-menu
              :STOs="getSTOs"
              @updateSelectedSTO="updateSelectedSTO"
              @addNewSTO="addNewSTO"
            ></s-t-o-menu>
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
      <v-data-iterator :items="getSTOs" :search="search">
        <template v-slot:header>
          <v-toolbar
            class="mb-2"
            color="indigo darken-5"
            dark
            flat
          >
            <v-toolbar-title>数据记录</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              clearable
              flat
              solo-inverted
              hide-details
              prepend-inner-icon="search"
              label="搜索"
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col
              v-for="item in props.items"
              :key="item">
              <data-card :item="item" :itemInfo="data[item]"></data-card>

            </v-col>
          </v-row>

        </template>
      </v-data-iterator>
    </v-container>
    <v-snackbar
      :value="snackbar"
    >
      请选择STO
      <v-btn
        color="red"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
  import DataCard from './dataCard'
  import TableHeader from './tableHeader'
  import STOMenu from './stoMenu'
  import DataRecord from './dataRecord'
  export default {
    data() {
      return {
        selectedSTO: "",
        snackbar: false,
        search:'',
      }
    },
    computed: {
      ...mapState("table", [
        'data',
        'currentData']),
      ...mapGetters('table',[
        'getSTOs',
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
        'addNewSTO',
        'resetCurrentData',
        'addDataToSelectedSTO',
        'resetNote',
      ]),
      updateSelectedSTO(value) {
        this.selectedSTO = value
      },
      addData() {
        if(_.isNil(this.selectedSTO) || this.selectedSTO ==="") {
          this.snackbar = true
          return
        }
        this.addDataToSelectedSTO({selectedSTO: this.selectedSTO, currentData: this.currentData})
        // this.resetCurrentData()
        this.resetNote()
      }
    },
    components: {
      TableHeader,
      STOMenu,
      DataRecord,
      DataCard
    },
    modules: {

    },

  }
</script>
