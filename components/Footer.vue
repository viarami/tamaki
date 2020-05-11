<template>
  <footer class="col-span-12 bg-gray-200 border-t dark-mode:bg-gray-800 border-accent-light">
    <div class="grid items-center justify-between w-10/12 grid-cols-12 gap-8 py-16 mx-auto">
      <div class="col-span-12 md:col-span-4 search">
        <div class="mb-4 title">
          <div class="text-xl tracking-wider uppercase text-bold">Search</div>
          <div class="w-4/12 mt-1 border-b-4 border-accent-dark"></div>
        </div>
        <SearchForm />
      </div>
      <div class="hidden text-4xl text-center md:block md:col-span-4 sitename">Tamaki</div>
      <div class="col-span-12 md:col-span-4 links">
        <div class="mb-4 title">
          <div class="text-xl tracking-wider uppercase text-bold">Links</div>
          <div class="w-4/12 mt-1 border-b-4 border-accent-dark"></div>
        </div>
        <ul class="flex flex-wrap justify-left">
          <li class="mr-2">
            <a href="#">Facebook</a>
          </li>
          <li class="mr-2">
            <a href="#">Twitter</a>
          </li>
          <li class="mr-2">
            <a href="#">Instagram</a>
          </li>
          <li class="mr-2">
            <a href="#">Pinterest</a>
          </li>
          <li class="mr-2">
            <a href="https://viarami.com/contact">Contact</a>
          </li>
          <li class="mr-2">
            <a href="https://viarami.com">VIARAMI</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
import SearchForm from '~/components/SearchForm'

export default {
  name: 'Footer',
  components: {
    SearchForm
  }
}
</script>

<style scoped>
.sitename {
  font-family: 'Ruthie', cursive;
}
a:hover {
  @apply underline text-gray-800;
}
</style>