<template>
  <div class="my-16">
    <div
      class="pl-4 mb-8 text-3xl text-center title dark-mode:text-white md:pl-0"
      v-if="slice.primary.title.length > 0"
    >
      <h2>{{ $prismic.asText(slice.primary.title) }}</h2>
      <div class="w-1/12 mx-auto mt-4 border-b-2 border-accent-dark"></div>
    </div>

    <div v-if="slice.primary.column_number === '2'" class="two">
      <div v-for="item in slice.items" :key="item.id" class="mb-8">
        <ResponsiveImg :imgobject="item.image" :sizes="'(min-width: 768px) 50vw, 98vw'" />
      </div>
    </div>

    <div v-else-if="slice.primary.column_number === '3'" class="three">
      <div v-for="item in slice.items" :key="item.id" class="mb-8">
        <ResponsiveImg :imgobject="item.image" :sizes="'(min-width: 768px) 33vw, 98vw'" />
      </div>
    </div>

    <div v-else-if="slice.primary.column_number === '4'" class="four">
      <div v-for="item in slice.items" :key="item.id" class="mb-8">
        <ResponsiveImg :imgobject="item.image" :sizes="'(min-width: 768px) 25vw, 98vw'" />
      </div>
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

<style scoped>
.two,
.three {
  column-count: 1;
  column-gap: 2rem;
}

.four {
  column-count: 2;
  column-gap: 2rem;
}

@screen md {
  .two {
    column-count: 2;
  }

  .three {
    column-count: 3;
  }

  .four {
    column-count: 4;
  }
}
</style>
