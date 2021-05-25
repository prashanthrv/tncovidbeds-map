<template>
  <div id="mapContainer">
    <div id="map"></div>
    <v-btn
      id="filterIcon"
      x-small
      height="30"
      width="20"
      class="white"
      @click="showFilter = !showFilter"
    >
      <v-icon color="blue lighten-1">mdi-filter</v-icon>
    </v-btn>
    <v-card
      v-if="showFilter"
      id="filterCard"
      class="pa-4 d-flex flex-column"
      :width="cardWidth - 100"
    >
      <div class="d-flex">
        <span class="flex-grow-1">Filter By</span>
        <v-btn
          color="red darken-1"
          small
          right
          max-width="20"
          class="align-self-end"
          @click="showFilter = !showFilter"
          ><v-icon color="white" small>mdi-close</v-icon></v-btn
        >
      </div>
      <div>
        <v-switch
          v-model="filterData.oxygen_supported"
          :hide-details="true"
          label="Show Oxygen Supported Beds"
        ></v-switch>
      </div>
      <div>
        <v-switch
          v-model="filterData.non_oxygen_supported"
          :hide-details="true"
          label="Show Normal Beds"
        ></v-switch>
      </div>
      <div>
        <v-switch
          v-model="filterData.icu_beds"
          :hide-details="true"
          label="Show ICU Beds"
        ></v-switch>
      </div>
      <div>
        <v-switch
          v-model="filterData.show_only_vacant"
          :hide-details="true"
          label="Show only vacant beds"
        ></v-switch>
      </div>
    </v-card>
    <v-btn
      v-if="showHospital"
      id="hospitalCloseIcon"
      color="red darken-1"
      small
      right
      max-width="20"
      @click="showHospital = !showHospital"
      ><v-icon color="white" small>mdi-close</v-icon></v-btn
    >
    <v-card
      v-if="showHospital"
      id="hospitalCard"
      class="pa-2"
      :width="cardWidth"
    >
      <hospital-page :hospital="hospitalData" />
    </v-card>
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
      map: this.map || {},
      layerGrp: this.layerGrp || {},
      filterData: {
        oxygen_supported: true,
        non_oxygen_supported: false,
        icu_beds: false,
        show_only_vacant: true,
      },
      hospitalData: {},
      showHospital: false,
      showFilter: false,
    }
  },
  computed: {
    cardWidth() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return 300
      }
      return 480
    },
  },
  watch: {
    hospitals: {
      immediate: false,
      handler(val) {
        if (val.length > 0) {
          this.showHospitalData()
        }
      },
    },
    'filterData.oxygen_supported': {
      immediate: false,
      handler() {
        this.showHospitalData()
      },
    },
    'filterData.non_oxygen_supported': {
      immediate: false,
      handler() {
        this.showHospitalData()
      },
    },
    'filterData.icu_beds': {
      immediate: false,
      handler() {
        this.showHospitalData()
      },
    },
    'filterData.show_only_vacant': {
      immediate: false,
      handler() {
        this.showHospitalData()
      },
    },
  },
  mounted() {
    // eslint-disable-next-line nuxt/no-globals-in-created
    this.map = window.L.map('map', {
      center: [11.388, 80.75],
      zoom: 7,
    })
    this.layerGrp = window.L.layerGroup().addTo(this.map)
    window.L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1IjoicHJhc2hhbnRocnYiLCJhIjoiY2twMm9lMmoxMDdqNzJvbWtjaG5ydms5MSJ9.m0X1pCD07cMqr9G_4ieaAw',
      }
    ).addTo(this.map)
    this.showHospitalData()
  },
  methods: {
    showHospitalData() {
      const self = this
      this.layerGrp.clearLayers()
      this.hospitals.forEach((hospital) => {
        if (
          hospital.Latitude !== undefined &&
          hospital.Latitude !== null &&
          hospital.Longitude !== undefined &&
          hospital.Longitude !== null
        ) {
          const greenIcon = window.L.divIcon({ className: 'green-icon' })
          const redIcon = window.L.divIcon({ className: 'red-icon' })
          let myIcon = null

          if (this.filterData.show_only_vacant) {
            if (
              (this.filterData.oxygen_supported &&
                parseInt(hospital.CovidBedDetails.VaccantO2Beds) > 0) ||
              (this.filterData.non_oxygen_supported &&
                parseInt(hospital.CovidBedDetails.VaccantNonO2Beds) > 0) ||
              (this.filterData.icu_beds &&
                parseInt(hospital.CovidBedDetails.VaccantICUBeds) > 0)
            ) {
              myIcon = greenIcon
              if (
                (this.filterData.oxygen_supported &&
                  parseInt(hospital.CovidBedDetails.AllotedO2Beds) > 0) ||
                (this.filterData.non_oxygen_supported &&
                  parseInt(hospital.CovidBedDetails.AllotedNonO2Beds) > 0) ||
                (this.filterData.icu_beds &&
                  parseInt(hospital.CovidBedDetails.AllotedICUBeds) > 0)
              ) {
                const hospitalMarker = window.L.marker(
                  [hospital.Latitude, hospital.Longitude],
                  { icon: myIcon }
                ).addTo(this.layerGrp)
                hospitalMarker.on('click', function (data) {
                  self.hospitalData = hospital
                  self.showHospital = true
                })
              }
            }
          } else {
            if (
              (this.filterData.oxygen_supported &&
                parseInt(hospital.CovidBedDetails.VaccantO2Beds) > 0) ||
              (this.filterData.non_oxygen_supported &&
                parseInt(hospital.CovidBedDetails.VaccantNonO2Beds) > 0) ||
              (this.filterData.icu_beds &&
                parseInt(hospital.CovidBedDetails.VaccantICUBeds) > 0)
            ) {
              myIcon = greenIcon
            } else {
              myIcon = redIcon
            }
            if (
              (this.filterData.oxygen_supported &&
                parseInt(hospital.CovidBedDetails.AllotedO2Beds) > 0) ||
              (this.filterData.non_oxygen_supported &&
                parseInt(hospital.CovidBedDetails.AllotedNonO2Beds) > 0) ||
              (this.filterData.icu_beds &&
                parseInt(hospital.CovidBedDetails.AllotedICUBeds) > 0)
            ) {
              const hospitalMarker = window.L.marker(
                [hospital.Latitude, hospital.Longitude],
                { icon: myIcon }
              ).addTo(this.layerGrp)
              hospitalMarker.on('click', function (data) {
                self.hospitalData = hospital
                self.showHospital = true
              })
            }
          }
        }
      })
    },
  },
}
</script>
<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
#hospitalCard {
  z-index: 999;
  position: absolute;
  top: 45px;
  right: 10px;
}
#hospitalCloseIcon {
  z-index: 999;
  position: absolute;
  top: 10px;
  right: 10px;
}
#filterCard {
  z-index: 999;
  position: absolute;
  top: 80px;
  left: 50px;
}
#filterIcon {
  position: absolute;
  top: 80px;
  left: 10px;
  z-index: 999;
}
</style>
<style>
.green-icon {
  height: 17px !important;
  width: 17px !important;
  border-radius: 50%;
  background-color: green;
}
.red-icon {
  height: 17px !important;
  width: 17px !important;
  border-radius: 50%;
  background-color: red;
}
</style>
