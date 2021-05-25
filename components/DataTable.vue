<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      v-if="hospitals"
      :headers="headers"
      :items="hospitals"
      :search="search"
    >
      <!-- eslint-disable-next-line -->
      <template #item.Name="{ item }">
        <v-btn
          text
          class="blue--text text--lighten-1 text-decoration-underline"
          nuxt
          depressed
          tile
          active-class=""
          :to="'/hospital/' + item._id"
        >
          {{ item.Name }}
        </v-btn>
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.CovidBedDetails.VaccantO2Beds="{ item }">
        <span
          :class="
            item.CovidBedDetails.VaccantO2Beds > 0 ? 'green--text' : 'red--text'
          "
        >
          {{ item.CovidBedDetails.VaccantO2Beds }}
        </span>
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.CovidBedDetails.VaccantNonO2Beds="{ item }">
        <span
          :class="
            item.CovidBedDetails.VaccantNonO2Beds > 0
              ? 'green--text'
              : 'red--text'
          "
        >
          {{ item.CovidBedDetails.VaccantNonO2Beds }}
        </span>
      </template>
      <!-- eslint-disable-next-line -->
      <template #item.CovidBedDetails.VaccantICUBeds="{ item }">
        <span
          :class="
            item.CovidBedDetails.VaccantICUBeds > 0
              ? 'green--text'
              : 'red--text'
          "
        >
          {{ item.CovidBedDetails.VaccantICUBeds }}
        </span>
      </template>
    </v-data-table>
  </v-card>
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
      search: '',
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'Name',
        },
        {
          text: 'District',
          align: 'start',
          value: 'District.Name',
        },
        {
          text: 'Hospital Type',
          align: 'start',
          value: 'Type.Name',
        },
        {
          text: 'Oxygen Supported Beds',
          align: 'start',
          value: 'CovidBedDetails.VaccantO2Beds',
          filterable: false,
        },
        {
          text: 'Normal Beds',
          align: 'start',
          value: 'CovidBedDetails.VaccantNonO2Beds',
          filterable: false,
        },
        {
          text: 'ICU Beds',
          align: 'start',
          value: 'CovidBedDetails.VaccantICUBeds',
          filterable: false,
        },
      ],
    }
  },
}
</script>
