<template>
  <v-row>
    <v-col align-self="center">
      <v-select
        required
        v-model="mySelectedSTO"
        :items="STOs"
        label="选择STO"
        @change="changeSelectedSTO"
        outlined
      ></v-select>
    </v-col>
    <v-col align-self="center">
      <v-text-field
        v-model="newSTO"
        label="新建STO"
        required>
      </v-text-field>
      <div class="my-2">
        <v-btn @click="addSTOButtonAction" small dark color="indigo">新建STO</v-btn>
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
  const { mapMutations } = createNamespacedHelpers('sto');
  export default {
    data() {
      return {
        newSTO:"",
        snackbar: false,
        mySelectedSTO: this.selectedSTO
      }
    },
    computed: {
    },
    props: ['STOs', 'selectedSTO'],
    methods: {
      changeSelectedSTO() {
        this.$emit('updateSelectedSTO', this.mySelectedSTO)
      },
      addSTOButtonAction() {
        if(_.isNil(this.newSTO) || this.newSTO === "") {
          this.snackbar = true
          return
        }
        this.$emit('addNewSTO', this.newSTO)
        this.$emit('updateSelectedSTO', this.newSTO)
        this.mySelectedSTO = this.newSTO
        this.newSTO = ""
      }
    }
  }
</script>
