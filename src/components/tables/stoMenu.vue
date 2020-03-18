<template>
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          STO
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in STOs"
          :key="index"
          @click=""
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>添加</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapMutations } = createNamespacedHelpers('sto');
  export default {
    data() {
      return {
      }
    },
    methods: {
      ...mapMutations([
      ]),
    },
    computed: {
      ...mapState([
        'STOs',
        'selectedSTO',
        'previousSTO'
      ])
    }
  }
</script>
