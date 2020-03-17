<template>
    <div>
        首页
    </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    data() {
      return {
        active: 0
      }
    },
    methods: {
      onChange(index) {
        this.$router.push(index)
      }

    }
  }
</script>
