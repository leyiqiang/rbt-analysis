<template>
  <v-container>
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
  import { NA } from '@/utils/constants'
  import MyTable from '@/store/modules/table'

  import DataCard from './dataCard'
  import STOMenu from './stoMenu'
  import DataRecord from './dataRecord'

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    data() {
      return {
        selectedSTO: "",
        snackbar: false,
        search:'',
        currentData: {
          isSuccess: false,
          promptLevel:NA,
          note: ""
        },
      }
    },
    mounted() {
      // this.$store.registerModule('table', MyTable)
    },
    computed: {
      ...mapState("table", [
        'data',]),
      ...mapGetters('table',[
        'getSTOs',
      ]),
    },
    methods: {
      ...mapActions("table", [
        'addNewSTO',
        'addDataToSelectedSTO',
      ]),
      resetCurrentData() {
        this.currentData = {
          isSuccess: false,
          promptLevel:NA,
          note: ""
        }
      },
      changeIsSuccess(value) {
        this.currentData.isSuccess = value
      },
      changePromptLevel(value) {
        this.currentData.promptLevel = value
      },
      changeNote(value) {
        this.currentData.note = value
      },
      updateSelectedSTO(value) {
        this.selectedSTO = value
      },
      resetNote() {
        this.currentData.note = ""
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
      STOMenu,
      DataRecord,
      DataCard
    },
    modules: {

    },

  }
</script>
