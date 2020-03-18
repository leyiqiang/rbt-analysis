<template>
  <v-container>
    <table-header></table-header>
    <v-divider></v-divider>
    <v-form valid>
      <v-container>
        <v-row justify="center">
          <v-col align-self="center">
            <s-t-o-menu></s-t-o-menu>
          </v-col>
          <v-col align-self="center">
            <v-switch v-model="currentData.isSuccess"
                      label="success"
                      color="success"
                      value="success"
                      :label="getLabel"
                      @change="changeIsSuccess"></v-switch>
          </v-col>
          <v-col align-self="center">
            <v-btn-toggle
              v-model="text"
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
        </v-row>
        <v-row>
          <v-col align-self="center">
            <v-text-field
              :value="currentData.note"
              label="备注"
              required>
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
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
        return this.currentData.isSuccess? "+" : "-";
      },
      ...mapState("table", [
        'data',
        'currentData']),

    },
    methods: {
      ...mapMutations("table", [
        'changeIsSuccess'
      ])
    },
    components: {
      TableHeader,
      STOMenu
    },
    modules: {

    },

  }
</script>
