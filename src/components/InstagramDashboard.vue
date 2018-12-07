<template>
  <div class="h-full">
    <div class="w-full mx-auto flex items-start pt-10 px-12 bg-ix-purple dashboard-header">
      <div class="w-full flex">
        <div class="w-1/4 flex items-center justify-center">
          <img class="rounded-full h-48" alt="Elaniin logo" :src='ElaniinLogo'>
        </div>
        <div class="w-3/4 flex items-center flex-wrap">
          <div class="w-full">
            <h1 class="w-full font-bold text-5xl text-white">Elaniin</h1>
            <MainCards title="100,000" subtitle="FOLLOWERS"/>
            <MainCards title="1,000" subtitle="FOLLOWING"/>
            <MainCards title="1,000" subtitle="MEDIA"/>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full px-8 dashboard-body flex justify-between bg-white relative">
      <div class="w-3/4 h-full bg-white rounded-lg absolute dashboard-data shadow-md">
        <div class="overflow-hidden shadow w-1/4 inline-block history-cards">
          <div class="px-6 py-8 history-cards-data">
            <p>Impresions</p>
            <span>1,000</span>
            <p>Reach</p>
            <span>500</span>
          </div>
          <img class="history-cards-image" :src="Background">
        </div>
      </div>
      <div class="w-1/5 h-full bg-white rounded-lg absolute dashboard-filter shadow-md">
        <Calendar/>
      </div>
    </div>
  </div>
</template>

<script>
import ElaniinLogo from '../assets/img/elaniin.png'
import Background from '../assets/img/superman.png'
import MainCards from '../components/dashboard/mainCards'
import HistoryCards from '../components/dashboard/historyCards'
import Calendar from '../components/dashboard/calendar'
export default {
  name: "InstagramDashboard",
  components:{
    MainCards,
    HistoryCards,
    'v-calendar':Calendar
  },
  data(){
    return{
      ElaniinLogo,
      Background
    }
  }
};
</script>
<style lang="scss">

</style>
