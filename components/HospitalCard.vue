<template>
  <v-card
    flat
    outlined
    class="mb-2 pa-4"
    nuxt
    :to="'/hospital/' + hospital._id"
  >
    <v-row class="pa-2 d-flex flex-nowrap">
      <div class="d-flex flex-column justify-start">
        <div class="blue--text text--lighten-1 font-weight-medium text-body-2">
          {{ hospital.Name }}
        </div>
        <div v-if="type === 'general'" class="mt-auto text-body-2">
          {{ hospital.District.Name }}
        </div>
        <div class="mt-auto text-caption grey--text">
          Last Update: <time-ago :datetime="lastUpdated" long></time-ago>
        </div>
        <!-- <v-row>
          <v-col v-if="landline" cols="3">
            <v-btn
              color="blue lighten-1"
              small
              outlined
              :href="'tel://' + landline"
            >
              <v-icon color="blue lighten-1" small>mdi-phone</v-icon>
              <span
                v-if="!$vuetify.breakpoint.xsOnly"
                class="blue--text text--lighten-1"
              >
                Landline
              </span>
            </v-btn>
          </v-col>
          <v-col v-if="mobile" cols="3">
            <v-btn
              color="blue lighten-1"
              small
              outlined
              :href="'tel://' + mobile"
            >
              <v-icon color="blue lighten-1" small>mdi-cellphone-basic</v-icon>
              <span
                v-if="!$vuetify.breakpoint.xsOnly"
                class="blue--text text--lighten-1"
              >
                Mobile
              </span>
            </v-btn>
          </v-col>
        </v-row> -->
      </div>
      <div
        class="
          d-flex
          flex-row
          justify-center
          align-center
          ml-auto
          flex-shrink-0
        "
      >
        <div
          v-if="type === 'oxygen' || type === 'general'"
          class="
            text-center
            d-flex
            flex-column
            justify-center
            align-center
            mx-2
          "
        >
          <div
            :class="
              hospital.CovidBedDetails.VaccantO2Beds > 0
                ? 'green--text'
                : 'red--text'
            "
          >
            {{ hospital.CovidBedDetails.VaccantO2Beds }}
          </div>
          <div class="text-center text-caption">Oxygen Beds</div>
        </div>
        <div
          v-if="
            type === 'normal' ||
            (type === 'general' && !$vuetify.breakpoint.xsOnly)
          "
          class="
            d-flex
            flex-column
            justify-center
            align-center
            text-center
            mx-2
          "
        >
          <div
            :class="
              hospital.CovidBedDetails.VaccantNonO2Beds > 0
                ? 'green--text'
                : 'red--text'
            "
          >
            {{ hospital.CovidBedDetails.VaccantNonO2Beds }}
          </div>
          <div class="text-center text-caption">Normal Beds</div>
        </div>
        <div
          v-if="
            type === 'icu' ||
            (type === 'general' && !$vuetify.breakpoint.xsOnly)
          "
          class="
            d-flex
            flex-column
            justify-center
            align-center
            text-center
            mx-2
          "
        >
          <div
            :class="
              hospital.CovidBedDetails.VaccantICUBeds > 0
                ? 'green--text'
                : 'red--text'
            "
          >
            {{ hospital.CovidBedDetails.VaccantICUBeds }}
          </div>
          <div class="text-center text-caption">ICU Beds</div>
        </div>
      </div>
    </v-row>
  </v-card>
</template>
<script>
import { TimeAgo } from 'vue2-timeago'

export default {
  components: {
    TimeAgo,
  },
  props: {
    hospital: {
      type: Object,
      default: () => {
        return {}
      },
    },
    type: {
      type: String,
      default: '',
    },
  },
  computed: {
    lastUpdated() {
      if (
        this.hospital.UpdatedDateTime !== undefined &&
        this.hospital.UpdatedDateTime !== null
      ) {
        return new Date(this.hospital.UpdatedDateTime * 1000)
      }
      return null
    },
    landline() {
      if (
        this.hospital.Landline !== undefined &&
        this.hospital.Landline !== null
      ) {
        return this.hospital.Landline
      }
      return null
    },
    mobile() {
      if (
        this.hospital.MobileNumber !== undefined &&
        this.hospital.MobileNumber !== null
      ) {
        return this.hospital.MobileNumber
      }
      return null
    },
  },
}
</script>
