<template>
  <main class="col-start-2 col-end-12">
    <div class="mb-16 text-2xl Search">
      <div>
        <strong>Results for:</strong>
        {{searchterm}}
      </div>
      <div class="w-1/12 mt-2 border-b-4 border-gray-400"></div>
    </div>

    <div v-if="result.length > 0" class="grid grid-cols-12 row-gap-16 md:col-gap-16">
      <div v-for="post in result" :key="post.id" class="col-span-12 md:col-span-4">
        <GridPost :postdata="post" :imgsize="'(min-width: 768px) 33vw, 90vw'" />
      </div>

      <div class="flex col-span-12 mt-16 loadmore">
        <button
          class="px-8 py-2 mx-auto text-lg text-center border-2 border-black border-solid cursor-pointer dark-mode:border-white hover:border-accent-dark"
          @click="loadMoreResults()"
          v-if="result.length % 9 === 0 && !nonewposts"
        >Load more results</button>
        <button
          v-else
          class="px-8 py-2 mx-auto text-lg text-center border-2 border-black border-solid cursor-pointer dark-mode:border-white"
        >You reached the bottom!</button>
      </div>
    </div>

    <div v-else class="text-xl font-semibold">Sorry, no result</div>

    <div class="w-2/3 mx-auto my-16 md:w-1/2 searchform">
      <div class="mb-4">
        <div class="text-2xl">Change your search</div>
        <div class="w-1/12 mt-2 border-b-4 border-gray-400"></div>
      </div>
      <SearchForm :currentinput="searchterm" />
    </div>
  </main>
</template>

<script>
import GridPost from '~/components/GridPost'
import SearchForm from '~/components/SearchForm'

export default {
  name: 'Search',
  components: {
    GridPost,
    SearchForm
  },
  data() {
    return {
      currentpage: 1,
      nonewposts: false
    }
  },
  async asyncData({ $prismic, error, query }) {
    try {
      // Query for keyword
      const searchresult = await $prismic.api.query(
        [
          $prismic.predicates.at('document.type', 'post'),
          $prismic.predicates.fulltext('document', query.search)
        ],
        { orderings: '[document.first_publication_date desc]', pageSize: 9 }
      )

      // Returns data to be used in template
      return {
        result: searchresult.results,
        searchterm: query.search
      }
    } catch (e) {
      // Returns error page
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  methods: {
    async loadMoreResults() {
      try {
        // Query other page for search
        const searchresult = await this.$prismic.api.query(
          [
            this.$prismic.predicates.at('document.type', 'post'),
            this.$prismic.predicates.fulltext('document', this.searchterm)
          ],
          {
            orderings: '[document.first_publication_date desc]',
            pageSize: 9,
            page: this.currentpage + 1
          }
        )

        if (searchresult.results.length > 0) {
          // Merge with the other posts
          this.result = this.result.concat(searchresult.results)
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
