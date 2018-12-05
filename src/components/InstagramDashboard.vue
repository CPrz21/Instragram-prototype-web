<template>
  <div class="col-12">
    <div class="col-12 d-flex py-5 bg-white border border-dark dashboard-header">
      <div class="col-3 text-center">
        <img class="dashboard-image-account rounded-circle img-fluid" alt="Elaniin logo" :src='ElaniinLogo'>
      </div>
      <div class="col-9 d-flex flex-wrap align-items-center">
        <div class="col-12 row">
          <h1 class="col-12">Elaniin</h1>
          <MainWidgets title="10,000" subtitle="Followers"/>
          <MainWidgets title="10,000" subtitle="Followers"/>
          <MainWidgets title="10,000" subtitle="Followers"/>
          <MainWidgets title="10,000" subtitle="Followers"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ElaniinLogo from '../assets/img/elaniin.png'
import MainWidgets from '../components/dashboard/mainWidgets'
export default {
  name: "InstagramDashboard",
  components:{
    MainWidgets
  },
  data(){
    return{
      ElaniinLogo
    }
  }
};
</script>
<style lang="scss">

</style>
