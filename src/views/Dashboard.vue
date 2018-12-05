<template>
  <div class="container dashboard-ix">
    <div class="row">
      <!-- <Login/> -->
      <InstagramDashboard/>
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
