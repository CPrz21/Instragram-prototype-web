<template>
  <div id="#apexchart" ref="barchart" class="w-3/4">
    <!-- <apexchart width="500" type="line" :options="options" :series="series"></apexchart> -->
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';
import ApexCharts from 'apexcharts';
export default {
  name: "Graphics",
  props:[
    "token",
    "accountId"
  ],
  data() {
    return {
      created:false,
      xData:[],
      yData:[],
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    };
  },
  components: {
      apexchart:VueApexCharts
  },
  mounted () {
  },

  watch: {
    accountId(current) {
      if (!current) {
        return [];
      }

      const data={
        start:'2018-11-01',
        end:'2018-11-25'
      }
      const url = `https://inxights-in-prototype-api.herokuapp.com/instagram/${current}/followers?start=${data.start}&end=${data.end}`;
      fetch(url, {
        headers: {
          Authorization: this.token,
        },
      }).then(async response => {
        const dataChart=await response.json();
        if (!this.created){
          this.drawChart(dataChart);
          this.created = true;
        }else{
          this.updateChart(dataChart);

        }
      });

    },
  },
  methods: {
    drawChart(dataChart){

      const chart = new ApexCharts(document.getElementById('#apexchart'), this.chartOptions);

      dataChart.forEach((element, index) => {
          const t = new Date(element.end_time);
          const tYear = t.getFullYear();
          const tMonth = t.getMonth();
          const tDay = t.getDate();
          const completeDate= tYear+'-'+tMonth+'-'+tDay;
          this.yData.push({x: completeDate, y:element.value});
          this.xData.push(new Date(element.end_time).getTime());
        });
      chart.render();
    },
    updateChart(dataChart){
      const chart = new ApexCharts(document.getElementById('#apexchart'), this.chartOptions);

      dataChart.forEach((element, index) => {
          const t = new Date(element.end_time);
          const tYear = t.getFullYear();
          const tMonth = t.getMonth();
          const tDay = t.getDate();
          const completeDate= tYear+'-'+tMonth+'-'+tDay;
          this.yData.push({x: completeDate, y:element.value});
          this.xData.push(new Date(element.end_time).getTime());
      });

      chart.updateSeries([{
        data: this.yData
      }])
    }
  },
  computed:{
    chartOptions() {
      return {
        chart: {
          type: 'line',
          height: document.getElementById('#apexchart').offsetHeight - 10,
        },
        series: [{
          name: 'sales',
          data: this.yData
        }],
        xaxis: {
          // type: 'datetime',
          // labels: {
          //   rotate: -45
          // },
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
