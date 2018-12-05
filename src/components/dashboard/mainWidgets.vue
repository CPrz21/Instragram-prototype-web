<template>
  <div class="col-3 main-widgets d-flex align-items-center py-4 border border-dark text-center">
    <div class="w-100">
      <h2 class="main-widgets-header m-0">{{title}}</h2>
      <p class="main-widgets-text m-0">{{subtitle}}</p>
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
