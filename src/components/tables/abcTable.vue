<template>
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
    <table-header :studentName="studentName" :tableName="tableName" :date="date" :tableType="tableType">
    </table-header>
    <v-data-table
      :headers="headers"
      :items="abcs"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ABC表格</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">新建</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                      <v-textarea outlined v-model="editedItem.antecedent" label="Antecedent(前因)"></v-textarea>
                  </v-row>
                  <v-row>
                      <v-textarea outlined v-model="editedItem.behavior" label="Behavior(行为)"></v-textarea>
                  </v-row>
                  <v-row>
                      <v-textarea outlined v-model="editedItem.consequence" label="Consequence(后果)"></v-textarea>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" text @click="save">保存</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import TableHeader from '@/components/tables/tableHeader'
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Antecedent(前因)',
          align: 'start',
          sortable: false,
          value: 'antecedent',
        },
        { text: 'Behavior(行为)', value: 'behavior', sortable: false },
        { text: 'Consequence(后果)', value: 'consequence', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        antecedent: '',
        behavior: '',
        consequence: '',
      },
      defaultItem: {
        antecedent: '',
        behavior: '',
        consequence: '',
      },
    }),
    components: {
      TableHeader,
    },
    computed: {
      ...mapState("abcTable", [
        'errorSnackBar',
        'tableName',
        'studentName',
        'date',
        'tableType',
        'errorMessage',
        'abcs',]),
      formTitle () {
        return this.editedIndex === -1 ? '新建数据' : '修改数据'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    methods: {
      ...mapActions("abcTable", [
        'getTableData',
        'editAbcItem',
        'addAbcItem',
        'deleteAbcItem',
      ]),
      editItem (item) {
        this.editedIndex = this.abcs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.abcs.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.deleteAbcItem({index, item})
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          this.editAbcItem({editedIndex: this.editedIndex, editedItem: this.editedItem})
          // Object.assign(this.abcs[this.editedIndex], this.editedItem)
        } else {
          this.addAbcItem({editedItem: this.editedItem})
          // this.abcs.push(this.editedItem)
        }
        this.close()
      },
    },
    created() {
      this.getTableData()
    },
  }
</script>
