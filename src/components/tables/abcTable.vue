<template>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.antecedent" label="Antecedent(前因)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.behavior" label="Behavior(行为)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.consequence" label="Consequence(后果)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
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

    computed: {
      ...mapState("abcTable", [
        'abcs',]),
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        'deleteAbcItem',
      ]),
      editItem (item) {
        this.editedIndex = this.abcs.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.abcs.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.deleteAbcItem(index)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {

        this.editAbcItem({editedIndex: this.editedIndex, editedItem: this.editedItem})
        // if (this.editedIndex > -1) {
        //   Object.assign(this.abcs[this.editedIndex], this.editedItem)
        // } else {
        //   this.abcs.push(this.editedItem)
        // }
        this.close()
      },
    },
    created() {
      this.getTableData()
    },
  }
</script>
