<template>
  <div class="ma-2">
    <span v-if="type === 'oxygen' && hospitals.length > 0"
      >{{ oxygenBedCount }} oxygen beds found in
      {{ hospitals[0].District.Name }}</span
    >
    <span v-if="type === 'normal' && hospitals.length > 0"
      >{{ normalBedCount }} normal beds found in
      {{ hospitals[0].District.Name }}</span
    >
    <span v-if="type === 'icu' && hospitals.length > 0"
      >{{ icuBedCount }} icu beds found in
      {{ hospitals[0].District.Name }}</span
    >
    <hospital-card
      v-for="hospital in hospitals"
      :key="hospital._id"
      :hospital="hospital"
      :type="type"
      class="mt-2"
    />
  </div>
</template>
<script>
export default {
  props: {
    hospitals: {
      type: Array,
      default: () => {
        return []
      },
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    oxygenBedCount() {
      if (
        this.hospitals !== undefined &&
        this.hospitals !== null &&
        this.hospitals.length > 0
      ) {
        let count = 0
        this.hospitals.forEach((hospital) => {
          count = count + hospital.CovidBedDetails.VaccantO2Beds
        })
        return count
      }
      return 0
    },
    normalBedCount() {
      if (
        this.hospitals !== undefined &&
        this.hospitals !== null &&
        this.hospitals.length > 0
      ) {
        let count = 0
        this.hospitals.forEach((hospital) => {
          count = count + hospital.CovidBedDetails.VaccantNonO2Beds
        })
        return count
      }
      return 0
    },
    icuBedCount() {
      if (
        this.hospitals !== undefined &&
        this.hospitals !== null &&
        this.hospitals.length > 0
      ) {
        let count = 0
        this.hospitals.forEach((hospital) => {
          count = count + hospital.CovidBedDetails.VaccantICUBeds
        })
        return count
      }
      return 0
    },
  },
}
</script>
