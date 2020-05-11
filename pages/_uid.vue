<template>
  <main class="col-span-12">
    <article>
      <div class="grid items-center grid-cols-1 md:grid-cols-5 post-header">
        <div class="post-image" v-if="mainimage.url !== undefined">
          <ResponsiveImg :imgobject="mainimage" :sizes="'(min-width: 768px) 60vw, 100vw'" />
        </div>
        <div class="w-10/12 mx-auto mt-4 post-data md:mt-0 md:w-full md:pl-8">
          <h1
            class="text-3xl font-bold tracking-wider uppercase break-words lg:text-5xl"
          >{{ $prismic.asText(title) }}</h1>

          <div class="w-16 mt-2 mb-4 border-b-2 border-accent-dark"></div>

          <ul class="flex justify-start list-none post-meta">
            <li class="italic date">{{date}}</li>

            <li class="tags" v-for="tag in tagdata" :key="tag.id">
              <nuxt-link :to="(LinkGetter(tag))">#{{ $prismic.asText(tag.data.title) }}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="content">
        <Slices :slicedata="slices" />
      </div>
    </article>
    <section
      class="grid w-10/12 grid-cols-12 row-gap-16 mx-auto md:col-gap-16"
      v-if="relatedposts.length > 0"
    >
      <div class="col-span-12">
        <h2 class="text-2xl tracking-wider text-center uppercase text-bold">Related posts</h2>
        <div class="w-1/12 mx-auto mt-2 border-b-4 border-gray-400"></div>
      </div>
      <div v-for="post in relatedposts" :key="post.id" class="col-span-12 md:col-span-4">
        <GridPost :postdata="post" :imgsize="'(min-width: 768px) 25vw, 90vw'" />
      </div>
    </section>
  </main>
</template>

<script>
import Slices from '~/components/Slices'
import CreateMetadata from '~/plugins/metadata.js'
import ResponsiveImg from '~/components/ResponsiveImg'
import LinkResolver from '~/plugins/link-resolver.js'
import GridPost from '~/components/GridPost'

export default {
  name: 'Post',
  components: {
    Slices,
    ResponsiveImg,
    GridPost
  },
  head() {
    return this.metadata
  },
  async asyncData({ $prismic, params, error }) {
    try {
      // Query post
      const post = await $prismic.api.getByUID('post', params.uid)

      // Get Meta Data
      const metadata = CreateMetadata(post)

      // Query tags
      let tagids = []
      post.data.tags.forEach(tag => {
        tagids.push(tag.tag.id)
      })

      const tags = await $prismic.api.getByIDs(tagids)

      // Query related posts
      const relatedposts = await $prismic.api.query(
        [
          $prismic.predicates.similar(post.id, 10),
          $prismic.predicates.at('document.type', 'post')
        ],
        { pageSize: 3 }
      )

      // Returns data to be used in template
      return {
        title: post.data.title,
        date: Intl.DateTimeFormat('en-US').format(
          new Date(post.first_publication_date)
        ),
        mainimage: post.data.main_image,
        slices: post.data.body,
        metadata: metadata,
        tagdata: tags.results,
        relatedposts: relatedposts.results
      }
    } catch (e) {
      console.log(e)
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
.post-header {
  @apply row-gap-4;
  grid-template-areas: 'pi' 'pd';
}

.post-data {
  grid-area: pd;
}

.post-image {
  grid-area: pi;
}

.post-meta li:after {
  @apply mx-2 text-gray-400;
  content: '•';
}
.post-meta li:last-child:after {
  content: '';
}

@screen md {
  .post-header {
    grid-template-areas: 'pd pd pi pi pi';
  }
}
</style>