<template>
  <main class="col-start-2 col-end-12">
    <div>
      <h1
        class="text-4xl tracking-wider text-center uppercase text-bold"
      >{{ $prismic.asText(title) }}</h1>
      <div class="w-1/12 mx-auto mt-2 border-b-4 border-gray-400"></div>
    </div>

    <div
      class="w-10/12 mx-auto mt-8 mb-16 text-sm italic description"
      v-if="description.length > 0"
    >
      <prismic-rich-text :field="description" />

      <div class="w-1/2 mx-auto mt-4 border-b-2 border-gray-400"></div>
    </div>

    <div v-if="posts.length > 0" class="grid grid-cols-12 row-gap-16 md:col-gap-16">
      <div v-for="post in posts" :key="post.id" class="col-span-12 md:col-span-4">
        <GridPost :postdata="post" :imgsize="'(min-width: 768px) 33vw, 90vw'" />
      </div>
    </div>
  </main>
</template>

<script>
import GridPost from '~/components/GridPost'

export default {
  name: 'Tag',
  components: {
    GridPost
  },
  async asyncData({ $prismic, params, error }) {
    try {
      // Query tag
      const tag = await $prismic.api.getByUID('tag', params.uid)

      // Query all posts with this tag
      const posts = await $prismic.api.query(
        [
          $prismic.predicates.at('document.type', 'post'),
          $prismic.predicates.at('my.post.tags.tag', tag.id)
        ],
        { orderings: '[document.first_publication_date desc]' }
      )

      // Returns data to be used in template
      return {
        title: tag.data.title,
        description: tag.data.description,
        posts: posts.results
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  }
}
</script>
