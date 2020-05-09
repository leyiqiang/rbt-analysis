<template>
  <v-container>
    <div style="padding-bottom: 100px;text-align: center;">
      <v-btn @click="loginAction">点击登录</v-btn>
      <v-container>
        <div id="qrcode-node"></div>
      </v-container>
    </div>
  </v-container>
</template>

<script>
  import Authing from 'authing-js-sdk'
  import { createNamespacedHelpers } from 'vuex'
  const { mapMutations, mapGetters, mapState, mapActions } = createNamespacedHelpers('user');

  const authing = new Authing({
    userPoolId: '5ead3884d8656e6680670855'
  })
  export default {
    data() {
      return {
        msg: 'user page'
      }
    },
    methods: {
      ...mapActions(['login']),
      wxAuthingAction() {
        authing.startWXAppScaning({
          mount: 'qrcode-node',
          enableFetchPhone: true, // 启用获取手机号

          // 可选，登录失败后的回调函数，一般为网络问题
          onError: function(error) {},
        });
      },
      async loginAction() {
        this.login()
      }
    }

  }
</script>
