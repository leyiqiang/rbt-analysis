<template>
  <div>
      <div class="my-2">
        <v-btn 
          to="/newTable"
          link
          large color="primary">新建表格</v-btn>
      </div>
            <div class="my-2">
        <v-btn 
          to="/editExistingTable"
          link
          large color="primary">修改已有表格</v-btn>
      </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    methods: {
    },
    watch: {
    },
    components: {
    }

  }
</script>
