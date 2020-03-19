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
              :selectedSTO="selectedSTO"
              :newSTO="newSTO"
              @addNewSTO="addNewSTO"
              @changeNewSTO="changeNewSTO"
              @changeSelectedSTO="changeSelectedSTO"
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
      <v-data-iterator :items="getSTOs">
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
                    <span class="group pa-2">
                      <v-icon v-if="lineData.isSuccess" color="green">mdi-plus</v-icon>
                      <v-icon v-else color="pink">mdi-minus</v-icon>
                    </span>
                    <v-chip
                      label
                      class="ma-2"
                      :color="getPromptBGColor(lineData)"
                      text-color="white"
                    >
                      {{lineData.promptLevel}}
                    </v-chip>
                    <!--<v-list-item-content v-if="lineData.note">-->
                      <!--<kbd>备注:{{lineData.note}}</kbd>-->
                    <!--</v-list-item-content>-->
                    <v-tooltip v-if="lineData.note" bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn color="primary" dark v-on="on">{{getNoteExcerpt(lineData.note)}}</v-btn>
                      </template>
                      <span>{{lineData.note}}</span>
                    </v-tooltip>


                  </v-list-item>
                </v-list>
              </v-card>

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
  import TableHeader from './tableHeader'
  import STOMenu from './stoMenu'
  import DataRecord from './dataRecord'
  export default {
    data() {
      return {
        snackbar: false
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
        'addDataToSelectedSTO'
      ]),
      ...mapMutations("sto", [
        'addSTO',
        'changeNewSTO',
        'changeSelectedSTO'
      ]),
      getPromptBGColor(lineData) {
        switch(lineData.promptLevel) {
          case 'I':
            return 'indigo lighten-3';
          case 'G':
            return 'indigo lighten-2';
          case 'PV':
            return 'indigo lighten-1';
          case 'V':
            return 'indigo darken-1';
          case 'PP':
            return 'indigo lighten-2'
          case 'P':
            return 'indigo darken-3'
        }
      },
      getNoteExcerpt(note) {
        if(note.length >= 5) {
          return '备注:' + note.substring(0, 5) + '...'
        } else {
          return '备注:' + note
        }
      },
      addData() {
        if(_.isNil(this.selectedSTO) || this.selectedSTO ==="") {
          this.snackbar = true
          return
        }
        this.addDataToSelectedSTO({selectedSTO: this.selectedSTO, currentData: this.currentData})
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
