<template>
  <div class="d-flex flex-column">
    <div>Contact Name: {{ contactDetails.ContactName }}</div>
    <div>
      Contact Number:
      <a :href="'tel://' + contactDetails.ContactNumber">{{
        contactDetails.ContactNumber
      }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    contactDetails: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
}
</script>
