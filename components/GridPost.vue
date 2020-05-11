<template>
  <section class="bg-gray-200 shadow dark-mode:bg-gray-800">
    <nuxt-link :to="LinkGetter(postdata)">
      <div class="main_image" v-if="postdata.data.main_image.url !== undefined">
        <ResponsiveImg :imgobject="postdata.data.main_image" :sizes="imgsize" />
      </div>

      <div class="px-8 py-4 text">
        <div class="text-sm italic date">
          {{
          Intl.DateTimeFormat('en-US').format(
          new Date(postdata.first_publication_date)
          )
          }}
        </div>

        <div class="mt-1 mb-4 text-xl font-bold title">
          {{ $prismic.asText(postdata.data.title) }}
          <div class="w-8 border-b-2 border-accent-dark"></div>
        </div>

        <div class="text-xs summary" v-if="postdata.data.summary.length > 0">
          <prismic-rich-text :field="postdata.data.summary" />
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
import ResponsiveImg from '~/components/ResponsiveImg'
import LinkResolver from '~/plugins/link-resolver.js'

export default {
  name: 'GridPost',
  components: {
    ResponsiveImg
  },
  props: {
    postdata: {
      type: Object,
      default: null
    },
    imgsize: {
      type: String,
      default: '100vw'
    }
  },
  methods: {
    LinkGetter(post) {
      return LinkResolver(post)
    }
  }
}
</script>
