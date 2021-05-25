<template>
  <v-container>
    <hospital-page v-if="hospital" :hospital="hospital" />
  </v-container>
</template>
<script>
import HospitalPage from '~/components/HospitalPage.vue'

export default {
  component: {
    HospitalPage,
  },
  beforeRouteEnter(to, from, next) {
    const previousRoute = from.path || from.fullPath
    next((vm) => {
      if (previousRoute !== undefined && previousRoute !== null) {
        vm.$store.dispatch('setBackLink', previousRoute)
      } else {
        vm.$store.dispatch('setBackLink', '/table')
      }
    })
  },
  fetch({ params }) {
    let recentHospitals =
      window.localStorage.getItem('recentHospitals') !== undefined &&
      window.localStorage.getItem('recentHospitals') !== null
        ? JSON.parse(window.localStorage.getItem('recentHospitals'))
        : []
    if (
      recentHospitals !== undefined &&
      recentHospitals !== null &&
      recentHospitals.length > 0 &&
      !recentHospitals.includes(params.id)
    ) {
      if (recentHospitals.length > 10) {
        recentHospitals.shift()
      }
      recentHospitals.push(params.id)
    } else if (!recentHospitals.includes(params.id)) {
      recentHospitals = [params.id]
    }
    window.localStorage.setItem(
      'recentHospitals',
      JSON.stringify(recentHospitals)
    )
  },
  computed: {
    hospital() {
      let hosp = null
      if (
        this.$store.state.hospitalList !== undefined &&
        this.$store.state.hospitalList !== null &&
        this.$store.state.hospitalList.length > 0
      ) {
        this.$store.state.hospitalList.every((element) => {
          if (element._id === this.$route.params.id) {
            hosp = element
            return false
          }
          return true
        })
      }
      return hosp
    },
  },
}
</script>
