<template>
  <div class="w-full storie-insights-data flex items-center" :title="titleLabel">
    <font-awesome-icon class="storie-insights-icon h-8 p-2" :icon="iconName"/>
    <p class="ml-3 font-medium">{{insightNumber === -1 ? '0' : insightNumber}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "StorieIcons",
  props:["iconName", "insightNumber","titleLabel"]
};
</script>
