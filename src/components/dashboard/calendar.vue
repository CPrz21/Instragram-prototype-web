<template>
   <form class="text-center">
      <input
        name='myDate'
        type='hidden'
        :value='selectedDate' />
      <v-date-picker
        :mode='mode'
        v-model='selectedDate'
        is-inline
        show-caps
        tint-color='#0376e0'
        :select-attribute="selectAttribute">
      </v-date-picker>
    </form>
</template>

<script>

export default {
  name: "calendar",
  data() {
    return {
      selectedDate: {
        start: new Date(),
        end: new Date(2018, 11, 21)
      },
      mode:'range'
    };
  },
  computed: {
    selectAttribute() {
        return {
          highlight: {
            backgroundColor: '#49258f',
            animated: true,
            // height: '2.9rem'
          },
          highlightCaps: {
            // animated: false,
            // height: '2.9rem',
            borderWidth: '3px',
            backgroundColor: '#fff',
            color:'black',
            borderColor: '#0376e0',
            // borderStyle: 'solid',
            opacity: 1
          }
        }
      }
  },
};
</script>
