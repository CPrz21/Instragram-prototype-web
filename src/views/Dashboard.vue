<template>
  <div class="container mx-auto h-full">
    <InstagramDashboard/>
  </div>
</template>

<script>
// @ is an alias to /src
// import FacebookLogin from '../components/FacebookLogin'
// import Login from '../components/Login'
import InstagramDashboard from '../components/InstagramDashboard'
import ElaniinLogo from '../assets/img/elaniin.png'

export default {
  name: "Dashboard",
  components: {
    // FacebookLogin,Login
    InstagramDashboard
  },
  data(){
    return{
      ElaniinLogo
    }
  },
  methods: {
  }
};
</script>
