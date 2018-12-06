<template>
  <div class="container dashboard-ix h-100">
    <div class="row h-100">
      <!-- <Login/> -->
      <!-- <InstagramDashboard/> -->
      <p class="bg-blue">Carlos</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import FacebookLogin from '../components/FacebookLogin'
// import Login from '../components/Login'
import InstagramDashboard from '../components/InstagramDashboard'

export default {
  name: "Dashboard",
  components: {
    // FacebookLogin,Login
    InstagramDashboard
  },
  data(){
    return{
    }
  },
  methods: {
  }
};
</script>
