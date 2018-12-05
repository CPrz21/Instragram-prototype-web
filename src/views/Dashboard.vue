<template>
  <div class="dashboard">
    <Login/>
  </div>
</template>

<script>
// @ is an alias to /src
import FacebookLogin from '../components/FacebookLogin'
import Login from '../components/Login'

export default {
  name: "Dashboard",
  components: { FacebookLogin,Login },
  data(){
    return{
    }
  },
  methods: {
  }
};
</script>
