<template>
  <v-row>
    <v-col align-self="center">
      <v-select
        required
        :value="selectedSTO"
        :items="STOs"
        label="选择STO"
        outlined
      ></v-select>
    </v-col>
    <v-col align-self="center">
      <v-text-field
        :value="newSTO"
        label="新建STO"
        @change="changeNewSTO"
        required>
      </v-text-field>
      <div class="my-2">
        <v-btn @click="addSTOButtonAction" small color="primary">新建STO</v-btn>
      </div>
    </v-col>
    <v-snackbar
      :value="snackbar"
    >
      新STO不可为空
      <v-btn
        color="red"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import _ from 'lodash';
  const { mapState, mapMutations } = createNamespacedHelpers('sto');
  export default {
    data() {
      return {
        snackbar: false
      }
    },
    methods: {
      ...mapMutations([
        'addSTO',
        'changeNewSTO',
        'changeSelectedSTO'
      ]),
      addSTOButtonAction() {
        if(_.isNil(this.newSTO) || this.newSTO === "") {
          this.snackbar = true
          return
        }
        this.addSTO(this.newSTO)
        this.changeSelectedSTO(this.newSTO)
        this.changeNewSTO("")
      }
    },
    computed: {
      ...mapState([
        'STOs',
        'selectedSTO',
        'newSTO'
      ])
    }
  }
</script>
