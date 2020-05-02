<template>
  <v-app>
    <v-navigation-drawer app 
      v-model='drawer'>
      <v-list dense nav class="py-0">
        <user-info></user-info>
        <v-divider></v-divider>
        <v-list-item
            to="/editExistingTable"
            link>
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>查看已有表格</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item
          to="/newTable"
          link>
          <v-list-item-icon>
            <v-icon>mdi-desk</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>新建表格</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <!--<v-list-group-->
        <!--prepend-icon="mdi-tools"-->
        <!--value="true"-->
        <!--&gt;-->
        <!--<template v-slot:activator>-->
          <!--<v-list-item-title>工具</v-list-item-title>-->
        <!--</template>-->

        <!--<v-list-item link to="/table">-->
          <!--<v-list-item-title>表格1</v-list-item-title>-->
        <!--</v-list-item>-->
          <!--<v-list-item link to="/abc-table">-->
            <!--<v-list-item-title>ABC表格</v-list-item-title>-->
          <!--</v-list-item>-->
        <!--</v-list-group>-->

        <v-list-item
            to="/user"
            link>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>用户</v-list-item-title>
            </v-list-item-content>
        </v-list-item>      

        <v-list-item
            to="/about"
            link>
            <v-list-item-icon>
              <v-icon>mdi-help-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>关于</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="green" app dark>
      <v-app-bar-nav-icon @click.stop="drawer=!drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>易知数据分析平台</v-toolbar-title>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>

      <!-- Provides the application the proper gutter -->
      <v-container fluid>

        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
  import Vue from 'vue';
  import UserInfo from '@/components/userInfo';

  export default {
    data() {
      return {
        drawer:null,
      }
    },
    methods: {
      onChange(index) {
      }
    },
    components: {
      UserInfo
    }
  }
</script>
