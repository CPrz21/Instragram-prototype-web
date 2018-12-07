<template>
  <div class="container mx-auto flex">
    <div class="w-1/4 flex items-center justify-center">
      <img class="rounded-full h-48" alt="Elaniin logo" :src='ElaniinLogo'>
    </div>
    <div class="w-3/4 flex items-center flex-wrap">
      <div class="w-full">
        <h1 class="w-full font-bold text-5xl">Elaniin</h1>
        <MainWidgets title="100,000" subtitle="FOLLOWERS"/>
        <MainWidgets title="1,000" subtitle="FOLLOWING"/>
        <MainWidgets title="1,000" subtitle="MEDIA"/>
      </div>
    </div>
  </div>
</template>

<script>
import ElaniinLogo from '../assets/img/elaniin.png'
import MainWidgets from '../components/dashboard/mainWidgets'
import DataWidgets from '../components/dashboard/dataWidgets'
export default {
  name: "InstagramDashboard",
  components:{
    MainWidgets,
    DataWidgets
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
