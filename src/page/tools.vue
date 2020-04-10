<template>
  <v-card>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="basil"
      grow
    >
      <v-tab
        v-for="item in items"
        :key="item"
      >
        {{ item }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="item in items"
        :key="item"
      >
        <v-card
          color="basil"
          flat
        >
          <table-tool :id="item"></table-tool>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <!--<v-card-text class="text-center">-->
      <!--<v-btn text @click="length&#45;&#45;">新建</v-btn>-->
      <!--<v-divider class="mx-4" vertical></v-divider>-->
      <!--<v-btn text @click="length++">新的表格</v-btn>-->
    <!--</v-card-text>-->
  </v-card>
</template>

<script>
  import tableTool from '../components/tables/table'
  export default {
    data() {
      return {
        tab: null,
        items: [
          'test',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      }
    },
    methods: {
      newWorkStation() {
        console.log('ee')
      }
    },
    watch: {
      length (val) {
        this.tab = val - 1
      },
    },
    components: {
      tableTool
    }

  }
</script>
