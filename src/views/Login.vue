<template>
  <div class="h-full flex items-center justify-center">
    <login-btn/>
  </div>
</template>

<script>
import LoginBtn from '../components/Login.vue'
export default {
  name: "login",
  components:{
    LoginBtn,
  },
};
</script>
