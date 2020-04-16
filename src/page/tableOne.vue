<template>
  <div class="hello" style="padding-bottom: 100px;text-align: center;">
    <h1>{{ $route.params.studentName }}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'tableOne page'
      }
    },

  }
</script>
