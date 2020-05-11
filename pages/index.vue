<template>
  <main class="col-start-2 col-end-12">
    <div class="grid grid-cols-12 row-gap-16 md:col-gap-16" v-if="posts.length > 0">
      <div class="col-span-12">
        <h2 class="text-2xl tracking-wider text-center uppercase text-bold">Latest posts</h2>
        <div class="w-1/12 mx-auto mt-2 border-b-4 border-gray-400"></div>
      </div>
      <div v-for="post in posts" :key="post.id" class="col-span-12 md:col-span-4">
        <GridPost :postdata="post" :imgsize="'(min-width: 768px) 33vw, 90vw'" />
      </div>
    </div>

    <div class="flex col-span-12 mt-16 loadmore">
      <button
        class="px-8 py-2 mx-auto text-lg text-center border-2 border-black border-solid cursor-pointer dark-mode:border-white hover:border-accent-dark"
        @click="loadMorePosts()"
        v-if="posts.length % 9 === 0 && !nonewposts"
      >Load more</button>
      <button
        v-else
        class="px-8 py-2 mx-auto text-lg text-center border-2 border-black border-solid cursor-pointer dark-mode:border-white"
      >You reached the bottom!</button>
    </div>
  </main>
</template>

<script>
import ResponsiveImg from '~/components/ResponsiveImg'
import GridPost from '~/components/GridPost'

export default {
  name: 'Homepage',
  components: {
    ResponsiveImg,
    GridPost
  },
  data() {
    return {
      currentpage: 1,
      nonewposts: false
    }
  },
  async asyncData({ $prismic, error }) {
    try {
      // Query last posts
      const posts = await $prismic.api.query(
        $prismic.predicates.at('document.type', 'post'),
        {
          orderings: '[document.first_publication_date desc]',
          pageSize: 9
        }
      )
      // Returns data to be used in template
      return {
        posts: posts.results
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    async loadMorePosts() {
      try {
        // Query Posts
        const posts = await this.$prismic.api.query(
          this.$prismic.predicates.at('document.type', 'post'),
          {
            orderings: '[document.first_publication_date desc]',
            pageSize: 9,
            page: this.currentpage + 1
          }
        )

        if (posts.results.length > 0) {
          // Merge with the other posts
          this.posts = this.posts.concat(posts.results)
        } else {
          // No more new posts
          this.nonewposts = true
        }

        // Save current page
        this.currentpage++
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
