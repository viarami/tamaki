<template>
  <form
    action="/search"
    class="relative flex items-center justify-between w-full h-10 pl-3 pr-2 text-black bg-white border-2 border-gray-400"
  >
    <input
      type="search"
      name="search"
      id="search"
      placeholder="Search"
      v-model="searchinput"
      class="w-full outline-none appearance-none focus:outline-none active:outline-none"
    />
    <button
      type="submit"
      class="ml-1 text-gray-400 outline-none hover:text-black focus:outline-none active:outline-none"
    >
      <svg
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        class="w-6 h-6"
      >
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </button>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  data() {
    return {
      searchinput: null
    }
  },
  props: {
    currentinput: {
      type: String,
      default: null
    }
  },
  created() {
    if (this.currentinput !== null) {
      this.searchinput = this.currentinput
    }
  }
}
</script>
