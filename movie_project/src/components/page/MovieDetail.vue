<template>
  <div class="py-15">
    <router-view />
    <MovieDetailInfo />
  </div>
</template>

<script>
import MovieDetailInfo from './detail/MovieDetailInfo'

export default {
  name: 'MovieDetail',
  components: {
    MovieDetailInfo,
  },
}
</script>

<style>
</style>
