<template>
  <div class="overflow-hidden shadow w-1/3 inline-block main-cards">
    <div class="px-6 py-8 text-center">
      <div class="font-bold text-4xl mb-2">{{title}}</div>
      <p class="font-bold text-2xl">
        {{subtitle}}
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "MainWidgets",
  props:[
    "title","subtitle"
  ]
};
</script>
