<template>
  <div
    class="grid grid-cols-12 row-gap-16 text-black bg-gray-100 dark-mode:bg-gray-900 md:col-gap-8 dark-mode:text-white"
  >
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Footer from '~/components/Footer'
import Header from '~/components/Header'
export default {
  components: {
    Footer,
    Header
  }
}
</script>
