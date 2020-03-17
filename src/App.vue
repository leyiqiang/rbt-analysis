<template>
  <v-app>
    <v-navigation-drawer app 
      v-model='drawer'>
      <v-list dense nav class="py-0">
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="http://img4.imgtn.bdimg.com/it/u=178483043,3983341895&fm=26&gp=0.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>          
        <v-divider></v-divider>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
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
  // import dashboard from '@/components/dashboard'

  export default {
    data() {
      return {
        drawer:null,
        items: [
          { title: 'RBT Tools', icon: 'mdi-tools', to:'tools' },
          { title: 'Dashboard', icon: 'mdi-view-dashboard', to:'dashboard' },
          { title: 'User', icon: 'mdi-account', to:'user' },
          { title: 'About', icon: 'mdi-help-box' },
        ]
      }
    },
    methods: {
      onChange(index) {
        this.$router.push(index)
      }

    }
  }
</script>
