<template>
  <div class="w-full storie-insights-data flex items-center">
    <font-awesome-icon class="storie-insights-icon h-8 p-2" :icon="iconName"/>
    <p class="ml-3 font-medium">{{insightNumber}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "StorieIcons",
  props:["iconName", "insightNumber"]
};
</script>
