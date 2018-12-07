<template>
  <div class="h-full">
    <div class="w-full mx-auto flex items-start pt-10 px-12 bg-ix-purple dashboard-header">
      <div class="w-full flex">
        <div class="w-1/4 flex items-center justify-center">
          <img class="rounded-full h-48" alt="Elaniin logo" :src='ElaniinLogo'>
        </div>
        <div class="w-3/4 flex items-center flex-wrap">
          <div class="w-full">
            <!-- <h1 class="w-full font-bold text-5xl text-white">{{token}}</h1> -->
            <select @change="getAccountInfo($event.target.selectedIndex)" class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey mb-4" id="grid-state">
              <option v-for="item in Accounts" v-bind:value="item">
              {{ item.name }}
              </option>
            </select>
            <MainCards :title="Followers" subtitle="FOLLOWERS"/>
            <MainCards :title="Following" subtitle="FOLLOWING"/>
            <MainCards :title="Media" subtitle="MEDIA"/>
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
import Router from '../router';
var numeral = require('numeral');
export default {
  name: "InstagramDashboard",
  components:{
    MainCards,
    HistoryCards,
  },
  data(){
    return{
      ElaniinLogo,
      Background,
      Accounts:'',
      Followers:'-',
      Following:'-',
      Media:'-'
    }
  },
  mounted(){
    this.getUserToken(this.token);
  },
  methods:{
    getUserToken(token){
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
        here.Accounts=myJson;
        here.getAccountInfo(0);
      });
    },
    getAccountInfo(selectedIndex){
      var here = this;
      var accountID= this.Accounts[selectedIndex].id;
      var URL=`https://inxights-in-prototype-api.herokuapp.com/instagram/${accountID}`
      fetch(URL, {
        headers: {
          'Authorization': this.token
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        here.Followers= numeral(res.followers_count).format('0,0');
        here.Following= numeral(res.follows_count).format('0,0');
        here.Media = numeral(res.media_count).format('0,0');
      });
    }
  },
  computed:{
    token: function(){
      return this.$route.params.token;
    }
  }
};
</script>
<style lang="scss">

</style>
