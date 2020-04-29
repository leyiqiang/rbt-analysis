<template>
    <v-form value>
      <v-container>
        <v-snackbar
          :value="errorSnackBar"
        >
          {{errorMessage}}
          <v-btn
            color="red"
            text
            @click="setErrorSnackBar(false)"
          >
            Close
          </v-btn>
        </v-snackbar>
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
                  v-for="(item, index) in props.items"
                  :key="item">
                  <data-card :item="item"
                             :itemInfo="records[index].stoList"
                              @editDataFromSelectedSTO="editDataFromSelectedSTO"></data-card>

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
    </v-form>
</template>

<script>
  import { NA } from '@/utils/constants'
  import { createNamespacedHelpers } from 'vuex'
  import DataCard from '@/components/tables/dataCard'
  import STOMenu from '@/components/tables/stoMenu'
  import DataRecord from '@/components/tables/dataRecord'
  import _ from 'lodash'
  const { mapMutations, mapGetters, mapState, mapActions } = createNamespacedHelpers('tableOne');
  export default {
    data() {
      return {
        tableType: 'TableOne',
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
    computed: {
      ...mapState([
        'studentName',
        'tableName',
        'date',
        'records',
        'errorSnackBar',
        "errorMessage"]),
      ...mapGetters([
        'getSTOs',
      ]),
    },
    components: {
      STOMenu,
      DataRecord,
      DataCard
    },
    methods: {
      ...mapMutations(['setErrorSnackBar']),
      ...mapActions(['getTableData',
        'addNewSTO',
        'editDataFromSelectedSTO',
        'addDataToSelectedSTO',]),
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
    created() {
        this.getTableData()
    },

  }
</script>
