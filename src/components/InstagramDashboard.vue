<template>
  <div class="h-full">
    <div class="w-full mx-auto flex items-start pt-10 px-12 bg-ix-purple dashboard-header">
      <div class="w-full flex">
        <div class="w-1/4 flex items-center justify-center">
          <img class="rounded-full h-48" alt="Elaniin logo" :src='ProfilePicture'>
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
        <!-- <div class="overflow-hidden shadow w-1/4 inline-block history-cards" v-for="Storie in Stories"> -->
        <div class="w-full stories-slider-container relative">
          <slick
            id="storiesSlider"
            ref="slick"
            :options="slickOptions">
            <div :style="{ backgroundImage: `url('${Storie.media_url}')` }" class="w-full h-16 storie-image-container relative" v-for="Storie in Stories" v-if="Storie.media_type === 'IMAGE'">
              <div class="storie-insights absolute">
                <StorieIcons iconName="eye" :insightNumber="Storie.insights.impressions" titleLabel="Impressions"/>
                <StorieIcons iconName="hands-helping" :insightNumber="Storie.insights.reach" titleLabel="Reach"/>
                <StorieIcons iconName="caret-right" :insightNumber="Storie.insights.taps_forward" titleLabel="Taps Forward"/>
                <StorieIcons iconName="caret-left" :insightNumber="Storie.insights.taps_back" titleLabel="Taps Backward"/>
                <StorieIcons iconName="sign-out-alt" :insightNumber="Storie.insights.exits" titleLabel="Exits"/>
              </div>
            </div>
            <!-- <storie-cards storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/46341978_2006678309385444_3342648305789699792_n.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=463db371180148d5f4e456dd33d54d4e&oe=5CAAE9F7"/>
            <storie-cards storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/45595563_2383915625171262_5780344435175447446_n.jpg?_nc_cat=103&_nc_ht=scontent.xx&oh=5a0e43482a2751929c0c525e132aaf2a&oe=5CA9E63E"/>
            <storie-cards storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/45920059_443986316133577_119502704122697657_n.jpg?_nc_cat=102&_nc_ht=scontent.xx&oh=245474b91091d75a5199a7ee68d24115&oe=5C979136"/>
            <storie-cards storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/46341978_2006678309385444_3342648305789699792_n.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=463db371180148d5f4e456dd33d54d4e&oe=5CAAE9F7"/> -->
          </slick>
          <div @click="next" class="absolute pin-b pin-r h-full flex items-center justify-center stories-slider-button" style="width:25px" v-show="Stories.length > 4">
            <font-awesome-icon icon="chevron-right"/>
          </div>
          <div @click="prev" class="absolute pin-b pin-l h-full flex items-center justify-center stories-slider-button" style="width:25px" v-show="Stories.length > 4">
            <font-awesome-icon icon="chevron-left"/>
          </div>
        </div>
        <!-- <StorieCards
        storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/46220539_207801003429622_4094310969348659787_n.jpg?_nc_cat=111&_nc_ht=scontent.xx&oh=806f1b0606078e9fe28bbc8bd5c89d03&oe=5CAD6514"
        />
        <StorieCards
        storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/46341978_2006678309385444_3342648305789699792_n.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=463db371180148d5f4e456dd33d54d4e&oe=5CAAE9F7"
        />
        <StorieCards
        storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/46220539_207801003429622_4094310969348659787_n.jpg?_nc_cat=111&_nc_ht=scontent.xx&oh=806f1b0606078e9fe28bbc8bd5c89d03&oe=5CAD6514"
        />
        <StorieCards
        storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/46341978_2006678309385444_3342648305789699792_n.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=463db371180148d5f4e456dd33d54d4e&oe=5CAAE9F7"
        />
        <StorieCards
        storieImage="https://scontent.xx.fbcdn.net/v/t51.12442-15/46341978_2006678309385444_3342648305789699792_n.jpg?_nc_cat=109&_nc_ht=scontent.xx&oh=463db371180148d5f4e456dd33d54d4e&oe=5CAAE9F7"
        /> -->

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
import StorieCards from '../components/dashboard/storieCards'
import Calendar from '../components/dashboard/calendar'
import '../../node_modules/slick-carousel/slick/slick.css'
import Slick from 'vue-slick';
import Router from '../router';
import StorieIcons from '../components/dashboard/storieIcons.vue'
var numeral = require('numeral');
export default {
  name: "InstagramDashboard",
  components:{
    MainCards,
    StorieIcons,
    Slick
  },
  data(){
    return{
      ElaniinLogo,
      Background,
      Accounts:'',
      Followers:'-',
      Following:'-',
      Media:'-',
      ProfilePicture:'',
      Stories:'',
      slickOptions: {
                        //options can be used from the plugin documentation
                        slidesToShow: 4,
                        arrows: false,
                    }
    }
  },
  mounted(){
    this.getUserToken(this.token);
  },
  beforeUpdate() {
      if (this.$refs.slick) {
          this.$refs.slick.destroy();
      }
  },
  updated() {
      this.$nextTick(function () {
          if (this.$refs.slick) {
              this.$refs.slick.create(this.slickOptions);
          }
      });
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
      this.getStories(selectedIndex);
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
        here.ProfilePicture=res.profile_picture_url;
      });
    },
    getStories(selectedIndex){
      var here = this;
      var accountID= this.Accounts[selectedIndex].id;
      var URL=`https://inxights-in-prototype-api.herokuapp.com/instagram/${accountID}/stories`
      fetch(URL, {
        headers: {
          'Authorization': this.token
        }
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        console.log(res);
        here.Stories=res;
      });
    },
  next() {
            this.$refs.slick.next();
        },
  prev() {
      this.$refs.slick.prev();
  },
  reInit() {
      // Helpful if you have to deal with v-for to update dynamic lists
      this.$nextTick(() => {
          this.$refs.slick.reSlick();
      });
  },
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
