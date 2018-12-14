<template>
    <div class="h-full mb-12">
        <div id="general-information" class="w-full mx-auto flex items-start p-12 bg-ix-purple dashboard-header">
            <div class="w-full flex">
                <div class="w-1/4 flex items-center justify-center">
                    <img class="rounded-full h-48" alt="Elaniin logo" :src='ProfilePicture'>
                </div>
                <div class="w-3/4 flex items-center flex-wrap">
                    <div class="w-full">
                        <select @change="getAccountInfo($event.target.selectedIndex)"
                                class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey mb-4"
                                id="grid-state">
                            <option v-for="item in Accounts" v-bind:value="item" :key="item.id">
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
        <div id="main-section" class="w-full px-6 dashboard-body flex justify-between">
            <div class="w-3/4 px-3">
                <div class="bg-white rounded-lg dashboard-data shadow-md">
                    <div v-show="Stories.length <= 0"
                         class="w-full stories-slider-container flex items-center justify-center p-12">
                        <h1 class="text-grey-dark">Account has no stories to show 🙁</h1>
                    </div>
                    <div v-if="Stories.length > 0" id="stories-slider" class="w-full stories-slider-container relative">
                        <slick
                                id="storiesSlider"
                                ref="slick"
                                :options="slickOptions">
                            <div class="w-full h-16 storie-image-container relative" v-for="Storie in Stories">
                                <p class="storie-caption px-4 py-2" v-if="Storie.caption">{{Storie.caption}}</p>
                                <img v-if="Storie.media_type === 'IMAGE'" class="storie-image" :src="Storie.media_url"
                                     alt="storie">
                                <video id="video" autoplay muted loop v-if="Storie.media_type === 'VIDEO'"
                                       class="storie-image">
                                    <source :src="Storie.media_url" type="video/mp4"/>
                                </video>
                                <div class="storie-insights absolute">
                                    <StorieIcons iconName="eye" :insightNumber="Storie.insights.impressions"
                                                 titleLabel="Impressions"/>
                                    <StorieIcons iconName="hands-helping" :insightNumber="Storie.insights.reach"
                                                 titleLabel="Reach"/>
                                    <StorieIcons iconName="caret-right" :insightNumber="Storie.insights.taps_forward"
                                                 titleLabel="Taps Forward"/>
                                    <StorieIcons iconName="caret-left" :insightNumber="Storie.insights.taps_back"
                                                 titleLabel="Taps Backward"/>
                                    <StorieIcons iconName="sign-out-alt" :insightNumber="Storie.insights.exits"
                                                 titleLabel="Exits"/>
                                </div>
                            </div>
                        </slick>
                        <div @click="next"
                             class="absolute pin-b pin-r h-full flex items-center justify-center stories-slider-button"
                             style="width:25px" v-show="Stories.length > 4">
                            <font-awesome-icon icon="chevron-right"/>
                        </div>
                        <div @click="prev"
                             class="absolute pin-b pin-l h-full flex items-center justify-center stories-slider-button"
                             style="width:25px" v-show="Stories.length > 4">
                            <font-awesome-icon icon="chevron-left"/>
                        </div>
                    </div>
                    <div class="media-graphics w-full flex" style="height:450px">
                        <Graphics :token="token" :accountId="accountId" :selectedDate="selectedDate"/>

                    </div>
                    <posts :token="token" :accountId="accountId"/>
                </div>
            </div>
            <div class="w-1/4 px-3">
                <div class="bg-white rounded-lg p-6 dashboard-filter shadow-md">
                    <calendar :selectedDate="selectedDate" @dateUpdated="handleDateUpdated"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import MainCards from '../components/dashboard/mainCards';
  import '../../node_modules/slick-carousel/slick/slick.css';
  import Slick from 'vue-slick';
  import Posts from '../components/dashboard/Posts';
  import StorieIcons from '../components/dashboard/storieIcons.vue';
  import Calendar from '../components/dashboard/calendar.vue';
  import Graphics from '../components/dashboard/dataGraphics.vue';
  import numeral from 'numeral';

  export default {
    name: 'InstagramDashboard',
    components: {
      MainCards,
      StorieIcons,
      Slick,
      Graphics,
      Posts,
      Calendar,
    },
    data() {
      return {
        accountId: null,
        Accounts: '',
        Followers: '-',
        Following: '-',
        Media: '-',
        ProfilePicture: '',
        Stories: [],
        slickOptions: {
          //options can be used from the plugin documentation
          slidesToShow: 4,
          arrows: false,
        },
        selectedDate: {
          start: new Date(),
          end: new Date(2018, 11, 30),
        },
      };
    },
    mounted() {
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
    methods: {
      handleDateUpdated(value) {
        this.selectedDate = value;
      },
      getUserToken(token) {
        var here = this;
        var URL = 'https://inxights-in-prototype-api.herokuapp.com/instagram/accounts';
        fetch(URL, {
          headers: {
            'Authorization': token,
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (myJson) {
            here.Accounts = myJson;
            here.getAccountInfo(0);
          });
      },
      getAccountInfo(selectedIndex) {
        this.getStories(selectedIndex);
        this.accountId = this.Accounts[selectedIndex].id;
        var here = this;
        var accountID = this.Accounts[selectedIndex].id;
        var URL = `https://inxights-in-prototype-api.herokuapp.com/instagram/${accountID}`;
        fetch(URL, {
          headers: {
            'Authorization': this.token,
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (res) {
            here.Followers = numeral(res.followers_count).format('0,0');
            here.Following = numeral(res.follows_count).format('0,0');
            here.Media = numeral(res.media_count).format('0,0');
            here.ProfilePicture = res.profile_picture_url;
          });
      },
      getStories(selectedIndex) {
        var here = this;
        var accountID = this.Accounts[selectedIndex].id;
        var URL = `https://inxights-in-prototype-api.herokuapp.com/instagram/${accountID}/stories`;
        fetch(URL, {
          headers: {
            'Authorization': this.token,
          },
        })
          .then(function (response) {
            return response.json();
          })
          .then(function (res) {
            console.log(res);
            here.Stories = res;
          });
      },
      next() {
        this.$refs.slick.next();
      },
      prev() {
        this.$refs.slick.prev();
      },
    },
    computed: {
      token: function () {
        return this.$route.params.token;
      },
    },
  };
</script>

<style scoped lang="scss">
    #stories-slider {
        height: 300px;
    }

    #main-section {
        margin-top: -20px;
    }
</style>
