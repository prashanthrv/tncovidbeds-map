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
        <a href="/terms" target="_blank">Read our terms</a>
      </span>
      <span
        v-if="$store.state.hospitalList && upTime"
        class="text-caption ml-auto"
        >Last Updated:<time-ago :datetime="upTime" long></time-ago
      ></span>
    </v-footer>
  </v-app>
</template>

<script>
import { TimeAgo } from 'vue2-timeago'

export default {
  components: {
    TimeAgo,
  },
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
    upTime() {
      if (
        this.$store.state.upTime !== undefined &&
        this.$store.state.upTime !== null
      ) {
        return this.$store.state.upTime
      }
      return null
    },
  },
}
</script>
