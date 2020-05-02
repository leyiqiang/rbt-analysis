<template>
  <div class="hello" style="padding-bottom: 100px;text-align: center;">
    <v-btn @click="wxAuthingAction">test</v-btn>
    <div>
    </div>
  </div>
</template>

<script>
  import Authing from 'authing-js-sdk'
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
      wxAuthingAction() {
        authing.startWXAppScaning({
          mount: 'qrcode-node',
          enableFetchPhone: true, // 启用获取手机号

          // 可选，登录失败后的回调函数，一般为网络问题
          onError: function(error) {},
        });
      }
    }

  }
</script>
