<template>
  <div class="w-10/12 mx-auto my-16 dark-mode:text-white text-slice">
    <prismic-rich-text :field="slice.primary.text" v-if="slice.primary.text.length > 0" />
  </div>
</template>

<script>
export default {
  props: {
    slice: {
      type: Object,
      default: null
    }
  }
}
</script>

<style >
.text-slice img {
  @apply my-8;
}
.text-slice p {
  @apply mb-4;
}

.text-slice p:empty {
  @apply mb-0;
}

.text-slice ol {
  @apply list-decimal;
}

.text-slice ul {
  @apply list-disc;
}

.text-slice a:hover {
  @apply underline text-gray-800;
}

.text-slice h1,
.text-slice h2,
.text-slice h3,
.text-slice h4,
.text-slice h5,
.text-slice h6 {
  @apply font-bold mt-8 mb-4;
}
.text-slice h1 {
  @apply text-6xl;
}
.text-slice h2 {
  @apply text-5xl;
}
.text-slice h3 {
  @apply text-4xl;
}
.text-slice h4 {
  @apply text-3xl;
}
.text-slice h5 {
  @apply text-2xl;
}
.text-slice h6 {
  @apply text-xl;
}
</style>