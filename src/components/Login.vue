<template>
    <div class="w-1/4 text-center">
      <div v-show="showNotification" class="bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md mb-8" role="alert">
        <div class="flex">
          <div class="py-1"><svg class="fill-current h-6 w-6 text-teal mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div class="text-left">
            <p class="font-bold">We have problems!</p>
            <p class="text-sm">It seems that you do not have accounts associated with your profile.</p>
          </div>
        </div>
      </div>
      <button class="bg-ix-purple hover:bg-blue-dark text-white font-bold py-4 px-4 rounded w-64 text-xl" @click="getUserInfo(1)">
        LOGIN
      </button>
    </div>
</template>

<script>
  // @ is an alias to /src
  import Router from '../router';

  export default {
    name: 'Login',
    data(){
      return{
        showNotification: false
      }
    },
    mounted() {
      window.fbAsyncInit = function () {
        FB.init({
          appId: '124451908218780',
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.2',
        });
      };

      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    methods: {
      openFbLoginDialog() {
        FB.login(this.getToken, { scope: 'email,manage_pages,instagram_basic' });
      },
      getToken: function (response) {
        var here = this;
        if (response.status === 'connected') {
          FB.api('/me', { fields: 'name,email' }, function (profile) {
            FB.getLoginStatus(function (res) {
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
      },
      getUserInfo(accessToken) {
        var here = this;
        var accessToken = 'EAABxMDfH75wBAA5HqvR5IRUYCEzr9hVs6ZBx1eOBG6IOuS1ZBnRj0hdqZCr0TUAafuMoZAj35ZAb6MtzUmAF4viAFAbdIJUAwwlra5ZAPVgkFzQgKWqaJPV2JF0RmzQBf4cJWLvsGM12fUnNN2QS8plZAWsAQxPAfMZD';
        var url = 'https://inxights-in-prototype-api.herokuapp.com/authenticate';
        var data = { accessToken: accessToken };

        fetch(url, {
          method: 'POST',
          credentials: 'omit',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            console.log(response.token);
            here.verifyAccounts(response.token);
          });
      },
      verifyAccounts(token){
        var here = this;
        var URL='https://inxights-in-prototype-api.herokuapp.com/instagram/accounts'
        fetch(URL, {
          headers: {
            'Authorization': token
          }
        })
        .then(function(response) {
          return response.json();
        })
        .then(function(myJson) {
          if(myJson.length === 0){
            here.showNotification=true;
          }else{
            Router.push({ name: 'dashboard', params: { token: token } });
          }
        });
      },
      logoutFb() {
        FB.logout(function (response) {
          // user is now logged out
          console.log(response);
        });
      },
    },
  };
</script>
