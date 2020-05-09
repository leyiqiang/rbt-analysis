<template>
    <v-list-item two-line class="miniVariant && 'px-0'" v-if="userName!==''">
        <v-list-item-avatar>
            <v-icon>mdi-account</v-icon>
            <!--<img src="http://img4.imgtn.bdimg.com/it/u=178483043,3983341895&fm=26&gp=0.jpg">-->
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{userName}}</v-list-item-title>
            <v-list-item-title><a @click="logoutAction">登出</a></v-list-item-title>
            <!--<v-list-item-subtitle>{{role}}</v-list-item-subtitle>-->
        </v-list-item-content>
    </v-list-item>
    <v-list-item two-line class="miniVariant && 'px-0'" v-else>
        <v-list-item-avatar>
            <v-icon>mdi-account</v-icon>
            <!--<img src="http://img4.imgtn.bdimg.com/it/u=178483043,3983341895&fm=26&gp=0.jpg">-->
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title><v-btn @click="loginAction">点击登录</v-btn></v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState("user", [
      'userName',]),
  } ,
  methods: {
    logoutAction() {
      this.logout()
    },
    loginAction() {
      this.login()
    },
    ...mapActions('user', ['getUserInfo', 'logout',  'login'])
  },
  created() {
    this.getUserInfo()
  }
}
</script>
