<template>
  <div class="w-full flex">
    <div id="#apexchart" ref="barchart" class="w-3/4 h-full">
      <apexchart v-if="options" :height="height" :width="width" type="area" :options="options" :series="series"></apexchart>
    </div>
    <div class="w-1/4">
      <div class="w-full flex items-center justify-center summary-cards" style="height:50%" v-for="sum in summary">
        <div class="text-center">
          <h1 class="text-5xl">{{sum.summary}}</h1>
          <p class="font-bold text-xl">{{sum.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts';
import numeral from 'numeral';
export default {
  name: "Graphics",
  props:[
    "token",
    "accountId",
    "selectedDate"
  ],
  data() {
    return {
      created:false,
      chart:null,
      xData:[],
      yData:[],
      options: false,
      series: [],
      height:'',
      width:'',
      followers:null,
      impressions:null,
      summary:[]
    };
  },
  components: {
      apexchart:VueApexCharts
  },
  mounted () {
    this.height= document.getElementById('#apexchart').offsetHeight - 10;
    this.width= document.getElementById('#apexchart').offsetWidth;
  },

  watch: {
    accountId(current) {
      if (!current || !this.selectedDate) {
        return [];
      }else{
        this.getInsights(this.accountId, this.selectedDate);
      }
    },
    selectedDate(current){
      if (!current || !this.accountId) {
        return [];
      }else{
        this.getInsights(this.accountId, this.selectedDate);
      }
    }
  },
  methods: {
    getInsights(accountId, selectedDate){
       this.summary=[];
      const data={
        start:this.dateModified(selectedDate.start),
        end:this.dateModified(selectedDate.end)
      }

      const urlFollowers = `https://inxights-in-prototype-api.herokuapp.com/instagram/${accountId}/followers?start=${data.start}&end=${data.end}`;
      const urlImpressions = `https://inxights-in-prototype-api.herokuapp.com/instagram/${accountId}/impressions?start=${data.start}&end=${data.end}`;

      const followersRequest = fetch(urlFollowers, {
        headers: {
          Authorization: this.token,
        },
      });
      const impressionsRequest = fetch(urlImpressions, {
        headers: {
          Authorization: this.token,
        },
      });

      Promise.all([
        followersRequest,
        impressionsRequest,
      ])
        .then(async values => {
          let followers = await values[0].json();
          let impressions = await values[1].json();

          this.series = [];
          this.options= false;
          this.xData=[];
          this.yData=[];
          let followersData = await this.drawChart(followers, 'Followers');
          let impressionsData = await this.drawChart(impressions, 'Impressions');

          this.series = this.yData;
          this.options= this.chartOptions;


        });

    },
    drawChart(dataChart, name){
      var yData=[];
      var xData=[];
      var allData = [];

      dataChart.forEach((element, index) => {
          const t = new Date(element.end_time);
          const tYear = t.getFullYear();
          const tMonth = t.getMonth();
          const tDay = t.getDate();
          const completeDate= tYear+'-'+tMonth+'-'+tDay;
          yData.push(element.value);
          xData.push(completeDate);


        });

      const summary = { name: name, summary: numeral(yData.reduce((a, b) => a + b, 0)).format('0,0')};

      this.summary.push(summary);
      allData.push(yData,xData);

      this.insertSeries(allData, name);
      return true
    },
    insertSeries(data, name){

       this.yData.push({
          name: name,
          data: data [0]
        });

        this.xData = data[1];
    },
    dateModified(date){
      const t = new Date(date);
      const tYear = t.getFullYear();
      const tMonth = t.getMonth();
      const tDay = t.getDate();
      const completeDate= tYear+'-'+tMonth+'-'+tDay;

      return completeDate;
    },
  },
  computed:{
    chartOptions(){
      return {
          colors: ['#0376e0', '#49258f'],
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            tupe:'datetime',
            labels: {
              format: 'DD/MM',
            },
            categories: this.xData
          },
          fill: {
            opacity: 0.5,
            gradient: {
              enabled: false
            }
          },
          tooltip: {
            x: {
              format: "yyyy",
            },
            fixed: {
              enabled: false,
              position: 'topRight'
            }
          },
      }
    },
    seriesData(){
        return [{
          name: 'Followers',
          data: this.yData
        }]
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.summary-cards{
  height: 50%;
  color: white;
  &:nth-child(odd){
    background: #0376e0;
  }
  &:nth-child(even){
    background: #49258f;
  }
}
</style>
