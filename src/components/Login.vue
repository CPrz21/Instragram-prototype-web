<template>
  <button class="bg-ix-purple hover:bg-blue-dark text-white font-bold py-4 px-4 rounded w-64 text-xl" @click="openFbLoginDialog">
    LOGIN
  </button>
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
      FB.login(this.getToken, { scope: 'email' })
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
    },
    loginStatus(){
      FB.getLoginStatus(function(response) {
          console.log(response);
      });
    },
    getToken: function (response) {
      if (response.status === 'connected') {
        FB.api('/me', { fields: 'name,email' }, function(profile) {
          FB.getLoginStatus(function(res) {
              console.log(res.authResponse.accessToken);
              console.log(res.authResponse.userID);
          });
        });
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
      } else {
        // the user isn't logged in to Facebook.
      }
    }
  }
};
</script>
