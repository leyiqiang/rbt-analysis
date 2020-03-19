<template>
  <div>

  <v-row>
    <v-col align-self="center">
      <v-switch v-model="currentData.isSuccess"
                color="success"
                :label="getLabel"
                @change="emitChangeIsSuccess"></v-switch>
      <v-btn-toggle
        :value="currentData.promptLevel"
        color="deep-purple accent-3"
        @change="emitChangePromptLevel"
      >
        <v-btn value="N/A">
          N/A
        </v-btn>
        <v-btn value="G">
          G
        </v-btn>
        <v-btn value="V">
          V
        </v-btn>
        <v-btn value="PV">
          PV
        </v-btn>
        <v-btn value="P">
          P
        </v-btn>
        <v-btn value="PP">
          PP
        </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-col align-self="end">
      <v-text-field
        :value="currentData.note"
        label="备注"
        @change="emitChangeNote"
        required>
      </v-text-field>
    </v-col>
  </v-row>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import _ from 'lodash';
  export default {
    data() {
      return {
      }
    },
    props:['currentData'],
    computed: {
      getLabel() {
        const sign =  this.currentData.isSuccess? "+" : "-";
        return "是否完成: " + sign
      },
    },
    methods: {
      emitChangeIsSuccess(data) {
        this.$emit('changeIsSuccess', data)
      },
      emitChangePromptLevel(prompt) {
        this.$emit('changePromptLevel', prompt)
      },
      emitChangeNote(note) {
        this.$emit('changeNote', note)
      }
    }
  }
</script>