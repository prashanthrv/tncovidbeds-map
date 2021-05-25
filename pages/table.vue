<template>
  <div class="ma-2">
    <data-table-mobile
      v-if="$vuetify.breakpoint.xsOnly"
      :hospitals="hospitals"
    />
    <data-table v-else :hospitals="hospitals" />
  </div>
</template>
<script>
export default {
  fetch() {
    this.$store.dispatch('setBackLink', '/')
  },
  computed: {
    hospitals() {
      if (
        this.$store.state.hospitalList !== undefined &&
        this.$store.state.hospitalList !== null &&
        this.$store.state.hospitalList.length > 0
      ) {
        return this.$store.state.hospitalList
      }
      return null
    },
  },
}
</script>
