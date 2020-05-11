<template>
  <main class="col-start-2 col-end-12">
    <div class="text-6xl font-bold text-center">404</div>
    <div class="mt-4">
      <nuxt-link :to="'/'">Go back home</nuxt-link>
    </div>
  </main>
</template>

<script>
export default {
  props: ['error'],
  head() {
    return {
      title: '404'
    }
  }
}
</script>
