<template>
  <header class="col-span-12 mt-8 border-b border-accent-light">
    <nuxt-link :to="'/'">
      <div class="text-6xl text-center sitename">Tamaki</div>
    </nuxt-link>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.sitename {
  font-family: 'Ruthie', cursive;
}
</style>
