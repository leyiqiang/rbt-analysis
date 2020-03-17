<template>
  <v-container>
    <v-form v-model="valid">
      <v-container>  
        <v-row>
          <v-col cols="12" md="4">        
            <v-text-field
                v-model="学生姓名"
                counter="10"
                label="学生姓名"
                required>
            </v-text-field>
          </v-col>
          <v-col cols="18" md="4">        
            <v-menu
              ref="menu"
              v-model="menu"
              close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px">
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="日期"
                  prepend-icon="calendar-month"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        </v-container>
    </v-form>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        date: new Date().toISOString().substr(0, 10),
        msg: 'table page'
      }
    },

  }
</script>
