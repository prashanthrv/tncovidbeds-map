<template>
  <map-page :hospitals="hospitals" />
</template>
<script>
import MapPage from '~/components/MapPage.vue'
export default {
  component: {
    MapPage,
  },
  fetch() {
    this.$store.dispatch('setBackLink', '/')
  },
  computed: {
    hospitals() {
      return this.$store.state.hospitalList
    },
  },
}
</script>
