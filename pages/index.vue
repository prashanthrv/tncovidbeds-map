<template>
  <v-container class="px-6">
    <v-row class="mt-2 d-flex flex-nowrap">
      <v-text-field
        v-model="searchText"
        placeholder="Search hospitals.."
        solo
        flat
        outlined
        dense
      ></v-text-field>
      <v-btn class="ml-2" color="blue lighten-1" @click="searchQuery">
        <v-icon color="white">mdi-magnify</v-icon>
      </v-btn>
      <v-btn
        v-if="searchBox"
        class="ml-2"
        color="red darken-1"
        @click="closeSearch"
      >
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
    </v-row>
    <v-row v-if="!searchBox" class="d-flex flex-column flex-sm-row">
      <v-card
        class="ma-sm-2 mb-2 d-flex flex-row align-center"
        min-width="300"
        height="80"
        color="blue lighten-1 white--text"
        flat
        nuxt
        to="table"
      >
        <v-col cols="2">
          <v-icon color="white">mdi-table-of-contents</v-icon>
        </v-col>
        <v-col cols="8">Table view</v-col>
        <v-col cols="2"><v-icon color="white">mdi-arrow-right</v-icon></v-col>
      </v-card>
      <v-card
        class="ma-sm-2 mb-2 d-flex flex-row align-center"
        min-width="300"
        height="80"
        color="orange darken-3 white--text"
        flat
        nuxt
        to="map"
      >
        <v-col cols="2">
          <v-icon color="white">mdi-map</v-icon>
        </v-col>
        <v-col cols="8">Map view</v-col>
        <v-col cols="2"><v-icon color="white">mdi-arrow-right</v-icon></v-col>
      </v-card>
      <v-card
        class="ma-sm-2 mb-2 d-flex flex-row align-center"
        min-width="300"
        height="80"
        color="yellow darken-3 white--text"
        flat
        nuxt
        to="recents"
      >
        <v-col cols="2">
          <v-icon color="white">mdi-clock-outline</v-icon>
        </v-col>
        <v-col cols="8">Recent List</v-col>
        <v-col cols="2"><v-icon color="white">mdi-arrow-right</v-icon></v-col>
      </v-card>
    </v-row>
    <v-row v-if="searchBox">
      <hospital-card-list
        v-if="
          searchHospitals !== undefined &&
          searchHospitals !== null &&
          searchHospitals.length > 0
        "
        :hospitals="searchHospitals"
        type="general"
      />
      <div v-else-if="searchHospitals.length === 0">No results found</div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      searchBox: false,
      searchText: '',
      searchHospitals: null,
    }
  },
  fetch() {
    this.$store.dispatch('setBackLink', null)
  },
  head: {
    title: 'TN Covid Beds',
  },
  methods: {
    searchQuery() {
      if (
        this.searchText !== undefined &&
        this.searchText !== null &&
        this.searchText !== '' &&
        this.searchText !== ' '
      ) {
        this.searchHospitals = []
        this.searchBox = true
        const hospitals = []
        const hospitalsAdded = {}
        this.$store.state.hospitalList.forEach((hospital) => {
          if (
            hospital.Name.toLowerCase().includes(this.searchText.toLowerCase())
          ) {
            if (hospitalsAdded[hospital._id] === undefined) {
              hospitalsAdded[hospital._id] = true
              hospitals.push(hospital)
            }
          }
        })
        this.searchHospitals = hospitals
      } else {
        alert('Search query cannot be empty')
      }
    },
    closeSearch() {
      this.searchBox = false
      this.searchHospitals = null
      this.searchText = ''
    },
  },
}
</script>
