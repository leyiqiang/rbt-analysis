<template>
  <v-card>
    <v-card-title class="subheading font-weight-bold">{{ item }}</v-card-title>
    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="(lineData, idx) in itemInfo">
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

        <v-tooltip v-if="lineData.note" bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">{{getNoteExcerpt(lineData.note)}}</v-btn>
          </template>
          <span>{{lineData.note}}</span>
        </v-tooltip>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          width="500"
        >
          <template v-slot:activator="{ on }">
            <v-btn class="ma-2" icon color="success" v-on="on">
              <v-icon left>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              修改数据
            </v-card-title>
            <v-row>
              <v-container>
              <v-col align-self="center">
                <v-switch v-model="lineData.isSuccess"
                          color="success"
                          :label="getLabel(lineData)"></v-switch>
                <v-btn-toggle
                  v-model="lineData.promptLevel"
                  color="deep-purple accent-3"
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
                  v-model="lineData.note"
                  label="备注"
                  required>
                </v-text-field>
              </v-col>
              </v-container>
            </v-row>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                text
                @click="confirmClicked(item, idx, lineData)"
              >
                确认
              </v-btn>
              <!--<v-btn-->
                <!--color="error"-->
                <!--text-->
                <!--@click="dialog = false"-->
              <!--&gt;-->
                <!--删除-->
              <!--</v-btn>-->
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        dialog: false,
      }
    },
    computed: {
    },
    props: ['item', 'itemInfo', 'getLineDataBySTOandIdx'],
    methods: {
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
      getLabel(lineData) {
        const sign =  lineData.isSuccess? "+" : "-";
        return "是否完成: " + sign
      },
      getNoteExcerpt(note) {
        if(note.length >= 5) {
          return '备注:' + note.substring(0, 5) + '...'
        } else {
          return '备注:' + note
        }
      },
      confirmClicked(STO, idx, lineData) {
        this.dialog = false

      },
      deleteClicked(STO, idx) {

      }
    }
  }
</script>