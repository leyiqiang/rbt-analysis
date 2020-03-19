<template>
  <v-row>
    <v-col align-self="center">
      <v-select
        required
        :value="selectedSTO"
        :items="STOs"
        label="选择STO"
        @change="emitChangeSelectedSTO"
        outlined
      ></v-select>
    </v-col>
    <v-col align-self="center">
      <v-text-field
        :value="newSTO"
        label="新建STO"
        @change="emitChangeNewSTO"
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
        snackbar: false
      }
    },
    props:['STOs', 'newSTO', 'selectedSTO'],
    methods: {
      emitChangeNewSTO(value) {
        this.$emit('changeNewSTO', value)
      },
      emitChangeSelectedSTO(value) {
        this.$emit('changeSelectedSTO', value)
      },
      addSTOButtonAction() {
        if(_.isNil(this.newSTO) || this.newSTO === "") {
          this.snackbar = true
          return
        }
        this.$emit('addNewSTO', this.newSTO)
        this.$emit('changeSelectedSTO', this.newSTO)
        this.$emit('changeNewSTO', "")
      }
    }
  }
</script>
