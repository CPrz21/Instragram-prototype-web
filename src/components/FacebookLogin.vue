<template>
    <facebook-login class="button"
      appId="124451908218780"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
</template>

<script>
// @ is an alias to /src
import facebookLogin from 'facebook-login-vuejs'

export default {
  name: "FacebookLogin",
  components: { facebookLogin },
  data(){
    return{
      // idImage, loginImage, mailImage, faceImage,
      isConnected: false,
      name: '',
      email: '',
      personalID: '',
      FB: undefined
    }
  },
  methods: {
    getUserData() {
      console.log(this.FB);
      this.FB.api('/me', 'GET', { fields: 'id,name,email' },
        userInformation => {
          console.warn("data api",userInformation)
          // this.personalID = userInformation.id;
          // this.email = userInformation.email;
          // this.name = userInformation.name;
        }
      )
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    }
  }
};
</script>
