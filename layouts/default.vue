<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      elevation="1"
      dense
      color="white"
      class=""
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-btn v-if="showBackIcon" icon nuxt :to="backToLink">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container style="max-width: none; height: 100%" class="pa-0">
        <nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span class="text-caption">
        Data Sourced from
        <a href="https://tncovidbeds.tnega.org/" target="_blank">TNEGA</a>
      </span>
    </v-footer>
  </v-app>
</template>

<script>
// import Cookies from 'js-cookies'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: true,
      miniVariant: false,
      title: 'TN Covid Beds',
    }
  },
  async fetch() {
    // const lastUpdate = parseInt(Cookies.get('lastUpdate'))
    // const currentTime = new Date().getTime()
    // if(lastUpdate!==undefined && lastUpdate!==null && ){

    // }
    await this.$store.dispatch('fetchHospitals')
  },
  computed: {
    showBackIcon() {
      return this.$store.state.showBackIcon
    },
    backToLink() {
      return this.$store.state.backToLink
    },
  },
}
</script>
