<template>
  <div>
    <section v-for="(slice, index) in slicedata" :key="'slice-' + index">
      <div v-if="slice.slice_type === 'text'">
        <TextSlice :slice="slice" />
      </div>

      <div v-else-if="slice.slice_type === 'image'">
        <ImageSlice :slice="slice" />
      </div>

      <div v-else-if="slice.slice_type === 'gallery'">
        <Gallery :slice="slice" />
      </div>
    </section>
  </div>
</template>

<script>
import Gallery from '~/components/slice/Gallery'
import ImageSlice from '~/components/slice/ImageSlice'
import TextSlice from '~/components/slice/TextSlice'

export default {
  components: {
    Gallery,
    ImageSlice,
    TextSlice
  },
  props: {
    slicedata: {
      type: Array,
      default: null
    }
  }
}
</script>
