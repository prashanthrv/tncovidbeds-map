<template>
  <v-container>
    <hospital-card-list
      v-if="hospitals"
      :hospitals="hospitals"
      type="general"
    />
  </v-container>
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
      const recentHospitals = window.localStorage.getItem('recentHospitals')
      if (
        this.$store.state.hospitalList.length > 0 &&
        recentHospitals !== undefined &&
        recentHospitals !== null
      ) {
        const hospitals = []
        this.$store.state.hospitalList.forEach((hospital) => {
          if (recentHospitals.includes(hospital._id)) {
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
