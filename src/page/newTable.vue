<template>
  <ValidationObserver ref="observer" v-slot="{ validate, reset }">
    <v-form value>
      <v-container>
        <v-row>
          <v-col class="d-flex" cols="12" sm="6">
            <ValidationProvider v-slot="{ errors }" name="表格类型" rules="required">
              <v-select v-model="selectedType" :items="tableTypes" label="表格类型"
                        :error-messages="errors"
              ></v-select>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <ValidationProvider v-slot="{ errors }" name="表格名称" rules="required|max:10">
              <v-text-field
                :value="tableName"
                :error-messages="errors"
                counter="10"
                label="表格名称"
                @change="changeTableName"
                required
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <ValidationProvider v-slot="{ errors }" name="学生姓名" rules="required|max:10">
              <v-text-field
                :value="studentName"
                :error-messages="errors"
                counter="10"
                label="学生姓名"
                @change="changeStudentName"
                required
              ></v-text-field>
            </ValidationProvider>
          </v-col>
          <v-col cols="12" md="4">
            <v-menu
              ref="menu"
              :value="menu"
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field :value="date" label="日期" readonly v-on="on"></v-text-field>
              </template>
              <v-date-picker :value="date" @change="changeDate" no-title color="green"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-btn class='mr-4' :loading='isLoading' color="primary" @click='submit'>新建</v-btn>
        </v-row>
        <p class="red--text">{{errorMessage}}</p>
      </v-container>
    </v-form>
  </ValidationObserver>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  import { required, email, max } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  const { mapMutations, mapState, mapActions } = createNamespacedHelpers('newTableForm');

  setInteractionMode('eager')
  extend('required', {
    ...required,
    message: '{_field_}不可为空',
  })

  extend('max', {
    ...max,
    message: '{_field_}长度不可超过{length}',
  })

  export default {
    components: {
      ValidationObserver,
      ValidationProvider
    },
    data() {
      return {
        menu: false,
        selectedType: undefined,
      }
    },
    computed: {
      ...mapState([
      'tableTypes',
      'tableName',
      'tableID',
      'isLoading',
      'errorMessage',
      'studentName',
      'date']),
    },
    methods: {
      ...mapActions(['createNewTable',
        'changeTableName',
        'changeStudentName',
        'changeDate']),
      async submit() {
        const res = await this.$refs.observer.validate()
        if(res) {
          this.createNewTable({tableType: this.selectedType,
            tableName: this.tableName,
            studentName: this.studentName,
            date: this.date,
            success: () => {
              this.$router.push({name:'tableOne', params: {tableID: this.tableID}})

            }})
        }
      },
    }
  }
</script>
