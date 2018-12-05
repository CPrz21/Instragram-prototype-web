<template>
  <div>
    <button type="button" class="btn btn-primary btn-block" @click="openFbLoginDialog">Facebook Login</button>
    <button type="button" class="btn btn-primary btn-block" @click="logoutFb">Facebook Login</button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  mounted(){
    window.fbAsyncInit = function() {
    FB.init({
      appId            : '124451908218780',
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v3.2'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    openFbLoginDialog () {
      FB.login(this.checkLoginState, { scope: 'email' })
    },
    checkLoginState: function (response) {
      if (response.status === 'connected') {
        FB.api('/me', { fields: 'name,email' }, function(profile) {
          console.log(profile);
          console.log('Good to see you, ' + profile.name + '.');
        });
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
      } else {
        // the user isn't logged in to Facebook.
      }
    },
    logoutFb(){
      FB.logout(function(response) {
        // user is now logged out
        console.log(response);
      });
    }
  }
};
</script>
