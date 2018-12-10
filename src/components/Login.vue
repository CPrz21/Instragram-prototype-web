<template>
  <button class="bg-ix-purple hover:bg-blue-dark text-white font-bold py-4 px-4 rounded w-64 text-xl" @click="getUserInfo">
    LOGIN
  </button>
</template>

<script>
// @ is an alias to /src
import Router from '../router';
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
    getUserInfo(){
      var accessToken="EAABxMDfH75wBAA5HqvR5IRUYCEzr9hVs6ZBx1eOBG6IOuS1ZBnRj0hdqZCr0TUAafuMoZAj35ZAb6MtzUmAF4viAFAbdIJUAwwlra5ZAPVgkFzQgKWqaJPV2JF0RmzQBf4cJWLvsGM12fUnNN2QS8plZAWsAQxPAfMZD";
      var url = 'https://inxights-in-prototype-api.herokuapp.com/authenticate';
      var data = {accessToken: accessToken};

      fetch(url, {
        method: 'POST',
        credentials: 'omit',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        console.log(response.token);
        Router.push({ name: 'dashboard', params: {token:response.token} });
      });
    },
    openFbLoginDialog () {
      FB.login(this.getToken, { scope: 'email' });
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
      var here = this;
      if (response.status === 'connected') {
        FB.api('/me', { fields: 'name,email' }, function(profile) {
          FB.getLoginStatus(function(res) {
              console.log(res.authResponse.accessToken);
              console.log(res.authResponse.userID);
              here.getUserInfo(res.authResponse.accessToken);

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
