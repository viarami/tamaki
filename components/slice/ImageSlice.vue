<template>
  <div class="grid grid-cols-12 my-16">
    <div v-if="slice.primary.whitespace === 'None'" class="col-span-12">
      <ResponsiveImg :imgobject="slice.primary.image" :sizes="'100vw'" />
    </div>

    <div v-else-if="slice.primary.whitespace === 'Left'" class="col-start-3 col-end-13">
      <ResponsiveImg :imgobject="slice.primary.image" :sizes="'90vw'" />
    </div>

    <div v-else-if="slice.primary.whitespace === 'Right'" class="col-span-10">
      <ResponsiveImg :imgobject="slice.primary.image" :sizes="'90vw'" />
    </div>

    <div v-else-if="slice.primary.whitespace === 'Center'" class="col-start-2 col-end-12">
      <ResponsiveImg :imgobject="slice.primary.image" :sizes="'90vw'" />
    </div>
  </div>
</template>

<script>
import ResponsiveImg from '~/components/ResponsiveImg'

export default {
  components: {
    ResponsiveImg
  },
  props: {
    slice: {
      type: Object,
      default: null
    }
  }
}
</script>
