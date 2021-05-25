<template>
  <div class="pa-4" style="max-width: 700px">
    <v-row>
      <span class="blue--text lighten-1 text-h6">{{ hospital.Name }}</span>
    </v-row>
    <v-row v-if="address">
      <span class="blue--text lighten-1">{{ address }}</span>
    </v-row>
    <v-row>
      <span class="blue--text lighten-1">{{ hospital.District.Name }}</span>
    </v-row>
    <v-row>
      <span class="grey--text text--darken-1 text-caption">
        {{ lastUpdated }}
      </span>
    </v-row>
    <v-row class="mt-4">
      <v-col v-if="landline" cols="3">
        <v-btn color="blue lighten-1" small :href="'tel://' + landline">
          <v-icon color="white" small>mdi-phone</v-icon>
          <span v-if="!$vuetify.breakpoint.xsOnly" class="white--text">
            Landline
          </span>
        </v-btn>
      </v-col>
      <v-col v-if="mobile" cols="3">
        <v-btn color="blue lighten-1" small :href="'tel://' + mobile">
          <v-icon color="white" small>mdi-cellphone-basic</v-icon>
          <span v-if="!$vuetify.breakpoint.xsOnly" class="white--text">
            Mobile
          </span>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="blue lighten-1"
          outlined
          small
          :href="
            'https://www.google.com/maps/dir/?api=1&destination=' +
            hospital.Latitude +
            ',' +
            hospital.Longitude
          "
          target="_blank"
        >
          <v-icon color="blue lighten-1" small>mdi-directions-fork</v-icon>
          <span v-if="!$vuetify.breakpoint.xsOnly">Location</span>
        </v-btn>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="blue lighten-1"
          outlined
          small
          :href="'https://wa.me/?text=' + shareMessage"
          target="_blank"
        >
          <v-icon color="blue lighten-1" small>mdi-whatsapp</v-icon>
          <span v-if="!$vuetify.breakpoint.xsOnly">Share</span>
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column">
      <div class="font-weight-bold">Beds Availability</div>
      <div class="d-flex justify-space-between font-weight-bold">
        <v-col class="text-center d-flex flex-column">
          <div :class="oxygenClass">
            {{ hospital.CovidBedDetails.VaccantO2Beds }}
          </div>
          <div class="text-caption">
            Oxygen Beds({{ hospital.CovidBedDetails.AllotedO2Beds }})
          </div>
        </v-col>
        <v-col class="text-center d-flex flex-column">
          <div :class="icuClass">
            {{ hospital.CovidBedDetails.VaccantICUBeds }}
          </div>
          <div class="text-caption">
            ICU Beds({{ hospital.CovidBedDetails.AllotedICUBeds }})
          </div>
        </v-col>
        <v-col class="text-center d-flex flex-column">
          <div :class="nonOxygenClass">
            {{ hospital.CovidBedDetails.VaccantNonO2Beds }}
          </div>
          <div class="text-caption">
            Normal Beds({{ hospital.CovidBedDetails.AllotedNonO2Beds }})
          </div>
        </v-col>
      </div>
    </v-row>
    <v-row class="d-flex flex-column">
      <div class="font-weight-bold">Contact Details</div>
      <contact-details
        v-for="contact in hospital.ContactDetails"
        :key="contact._id"
        :contact-details="contact"
        class="mt-2"
      />
    </v-row>
  </div>
</template>
<script>
import ContactDetails from './ContactDetails.vue'
export default {
  component: {
    ContactDetails,
  },
  props: {
    hospital: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    shareMessage() {
      const taluk =
        this.hospital.Taluk !== undefined ? this.hospital.Taluk.Name : ''
      const district =
        this.hospital.District !== undefined ? this.hospital.District.Name : ''
      return window.encodeURIComponent(
        '*Hospital Name: ' +
          this.hospital.Name +
          '*\n' +
          'Address: ' +
          this.hospital.AddressDetail.Line1 +
          ',' +
          taluk +
          ',' +
          district +
          '\n' +
          'Landline Number: ' +
          this.hospital.Landline +
          '\n' +
          'Mobile Number: ' +
          this.hospital.MobileNumber +
          '\n\n' +
          'https://tncovidbeds.netlify.app/hospital/' +
          this.hospital._id
      )
    },
    oxygenClass() {
      const allotmentRatio =
        this.hospital.CovidBedDetails.VaccantO2Beds /
        this.hospital.CovidBedDetails.AllotedO2Beds
      if (allotmentRatio >= 0.8) {
        return 'green--text text--darken-2'
      } else if (allotmentRatio >= 0.4) {
        return 'yellow--text text--darken-1'
      } else if (allotmentRatio > 0) {
        return 'orange--text text--darken-2'
      } else if (allotmentRatio === 0) {
        return 'red--text text--darken-1'
      }
      return null
    },
    icuClass() {
      const allotmentRatio =
        this.hospital.CovidBedDetails.VaccantICUBeds /
        this.hospital.CovidBedDetails.AllotedICUBeds
      if (allotmentRatio >= 0.8) {
        return 'green--text text--darken-2'
      } else if (allotmentRatio >= 0.4) {
        return 'yellow--text text--darken-1'
      } else if (allotmentRatio > 0) {
        return 'orange--text text--darken-2'
      } else if (allotmentRatio === 0) {
        return 'red--text text--darken-1'
      }
      return null
    },
    nonOxygenClass() {
      const allotmentRatio =
        this.hospital.CovidBedDetails.VaccantNonO2Beds /
        this.hospital.CovidBedDetails.AllotedNonO2Beds
      if (allotmentRatio >= 0.8) {
        return 'green--text text--darken-2'
      } else if (allotmentRatio >= 0.4) {
        return 'yellow--text text--darken-1'
      } else if (allotmentRatio > 0) {
        return 'orange--text text--darken-2'
      } else if (allotmentRatio === 0) {
        return 'red--text text--darken-1'
      }
      return null
    },
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
    address() {
      const taluk =
        this.hospital.Taluk !== undefined ? this.hospital.Taluk.Name : ''
      if (
        this.hospital.AddressDetail.Line1 !== undefined &&
        this.hospital.AddressDetail.Line1 !== null
      ) {
        return this.hospital.AddressDetail.Line1 + ',' + taluk
      }
      return null
    },
  },
}
</script>
