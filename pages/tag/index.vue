<template>
  <main class="col-start-2 col-end-12">
    <div>
      <h1 class="text-4xl tracking-wider text-center uppercase text-bold">Tags</h1>
      <div class="w-1/12 mx-auto mt-2 border-b-4 border-gray-400"></div>
    </div>

    <div v-if="tags.length > 0" class="grid grid-cols-6 gap-8 row-gap-16 my-16 md:grid-cols-12">
      <section v-for="tag in tags" :key="tag.id" class="col-span-6">
        <div class="mb-4">
          <nuxt-link :to="(LinkGetter(tag))">
            <h2
              class="text-2xl tracking-wider uppercase text-bold"
            >#{{ $prismic.asText(tag.data.title) }}</h2>
            <div class="w-16 border-b-2 border-accent-dark"></div>
          </nuxt-link>
        </div>

        <div class="text-sm italic description" v-if="tag.data.description.length > 0">
          <prismic-rich-text :field="tag.data.description" />
        </div>

        <div class="mt-4 font-semibold text-right more">
          <nuxt-link :to="(LinkGetter(tag))">All posts</nuxt-link>
          <div class="w-8 mt-1 ml-auto border-b-2 border-accent-dark"></div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import LinkResolver from '~/plugins/link-resolver.js'

export default {
  name: 'OverviewTag',
  async asyncData({ $prismic, error }) {
    try {
      // Query all tags
      const tags = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'tag'),
        {
          orderings: '[my.tag.title]'
        }
      )

      // Returns data to be used in template
      return {
        tags: tags.results
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    LinkGetter(post) {
      return LinkResolver(post)
    }
  }
}
</script>

<style scoped>
</style>