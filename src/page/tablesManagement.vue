<template>
  <div class="hello" style="padding-bottom: 100px;text-align: center;">
    <v-data-table>

    </v-data-table>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapMutations, mapGetters, mapState, mapActions } = createNamespacedHelpers('tablesManagement');
  export default {
    data() {
      return {
        msg: 'tables management page'
      }
    },
    computed: {
      ...mapState(['tableOnes']),
    },
    methods: {
      ...mapActions(['getTableOnes'])

    },
    created() {
      this.getTableOnes()
    }

  }
</script>

