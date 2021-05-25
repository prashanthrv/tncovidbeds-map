<template>
  <hospital-card-list v-if="hospitals" :hospitals="hospitals" type="normal" />
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
    const previousRoute = from.path || from.fullPath
    next((vm) => {
      if (
        previousRoute !== undefined &&
        previousRoute !== null &&
        !previousRoute.includes('/hospital/')
      ) {
        vm.$store.dispatch('setBackLink', previousRoute)
      } else {
        vm.$store.dispatch('setBackLink', '/table')
      }
    })
  },
  computed: {
    hospitals() {
      if (this.$store.state.hospitalList.length > 0) {
        const hospitals = []
        this.$store.state.hospitalList.forEach((hospital) => {
          if (hospital.District._id === this.$route.params.id) {
            hospitals.push(hospital)
          }
        })
        return hospitals
      }
      return null
    },
  },
}
</script>
