<template>
  <div class="dashboard">
    <facebook-login class="button"
      appId="124451908218780"
      @login="onLogin"
      @logout="onLogout"
      @sdk-loaded="sdkLoaded">
    </facebook-login>
  </div>
</template>

<script>
// @ is an alias to /src
import facebookLogin from 'facebook-login-vuejs'

export default {
  name: "Dashboard",
  components: {
    facebookLogin
  }
};
</script>
