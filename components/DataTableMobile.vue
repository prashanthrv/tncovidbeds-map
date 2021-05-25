<template>
  <div>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="blue lighten-1"
      grow
      :show-arrows="false"
      centered
      prev-icon=""
    >
      <v-tab
        v-for="item in items"
        :key="item"
        class="text-caption font-weight-bold"
      >
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card
          v-for="hospital in bedList"
          :key="hospital.name"
          flat
          outlined
          class="my-2 pa-0"
          nuxt
          :to="'/oxygen/' + hospital.id"
        >
          <v-card-text
            class="text-body-2 font-weight-bold pa-2 d-flex flex-row"
          >
            <div>{{ hospital.name }}</div>
            <div
              class="ml-auto"
              :class="hospital.oxygen_beds > 0 ? 'green--text' : 'red--text'"
            >
              {{ hospital.oxygen_beds }}
            </div>
            <v-icon class="ml-2">mdi-chevron-right</v-icon>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          v-for="hospital in bedList"
          :key="hospital.name"
          flat
          outlined
          class="my-2 pa-0"
          nuxt
          :to="'/normal/' + hospital.id"
        >
          <v-card-text
            class="text-body-2 font-weight-bold pa-2 d-flex flex-row"
          >
            <div>{{ hospital.name }}</div>
            <div
              class="ml-auto"
              :class="
                hospital.non_oxygen_beds > 0 ? 'green--text' : 'red--text'
              "
            >
              {{ hospital.non_oxygen_beds }}
            </div>
            <v-icon class="ml-2">mdi-chevron-right</v-icon>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card
          v-for="hospital in bedList"
          :key="hospital.name"
          flat
          outlined
          class="my-2 pa-0"
          nuxt
          :to="'/icu/' + hospital.id"
        >
          <v-card-text
            class="text-body-2 font-weight-bold pa-2 d-flex flex-row"
          >
            <div>{{ hospital.name }}</div>
            <div
              class="ml-auto"
              :class="hospital.icu_beds > 0 ? 'green--text' : 'red--text'"
            >
              {{ hospital.icu_beds }}
            </div>
            <v-icon class="ml-2">mdi-chevron-right</v-icon>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
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
  },
  data() {
    return {
      items: ['Oxygen Beds', 'Normal Beds', 'ICU Beds'],
      tab: 0,
    }
  },
  computed: {
    bedList() {
      if (
        this.hospitals !== undefined &&
        this.hospitals !== null &&
        this.hospitals.length > 0
      ) {
        const bedList = {}
        this.hospitals.forEach((hospital) => {
          if (
            bedList[hospital.District.Name] !== undefined &&
            bedList[hospital.District.Name] !== null
          ) {
            bedList[hospital.District.Name].oxygen_beds =
              bedList[hospital.District.Name].oxygen_beds +
              hospital.CovidBedDetails.VaccantO2Beds
            bedList[hospital.District.Name].non_oxygen_beds =
              bedList[hospital.District.Name].non_oxygen_beds +
              hospital.CovidBedDetails.VaccantNonO2Beds
            bedList[hospital.District.Name].icu_beds =
              bedList[hospital.District.Name].icu_beds +
              hospital.CovidBedDetails.VaccantICUBeds
          } else {
            bedList[hospital.District.Name] = {
              id: hospital.District._id,
              oxygen_beds: hospital.CovidBedDetails.VaccantO2Beds,
              non_oxygen_beds: hospital.CovidBedDetails.VaccantNonO2Beds,
              icu_beds: hospital.CovidBedDetails.VaccantICUBeds,
            }
          }
        })
        const returnList = []
        Object.keys(bedList)
          .sort()
          .forEach((hospitalName) => {
            returnList.push({
              name: hospitalName,
              id: bedList[hospitalName].id,
              oxygen_beds: bedList[hospitalName].oxygen_beds,
              non_oxygen_beds: bedList[hospitalName].non_oxygen_beds,
              icu_beds: bedList[hospitalName].icu_beds,
            })
          })
        return returnList
      }
      return null
    },
  },
}
</script>
