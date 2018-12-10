<template>
  <div class="overflow-hidden shadow w-1/4 inline-block storie-cards">
    <div :style="{ 'background-image': 'url(' + storieImage + ')' }" class="w-full h-16 storie-image-container">
    </div>
    <div class="storie-insights">
      <StorieIcons iconName="eye" insightNumber="1,524" />
      <StorieIcons iconName="hands-helping" insightNumber="1,524" />
      <StorieIcons iconName="caret-left" insightNumber="1,524" />
      <StorieIcons iconName="caret-right" insightNumber="1,524" />
      <StorieIcons iconName="sign-out-alt" insightNumber="1,524" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import StorieIcons from './storieIcons.vue'
export default {
  name: "StorieCards",
  props:["storieImage"],
  components:{
    StorieIcons
  }
};
</script>
