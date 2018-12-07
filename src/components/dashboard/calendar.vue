<template>
  <v-calendar :attributes='attrs'>
  </v-calendar>
</template>

<script>
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css';

export default {
  name: "v-calendar",
  components:{
    'v-calendar':VCalendar
  },
  data() {
    return {
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#ff8080',
            // Other properties are available too, like `height` & `borderRadius`
          },
          dates: new Date(2018, 0, 1)
        }
      ],
    };
  },
};
</script>
