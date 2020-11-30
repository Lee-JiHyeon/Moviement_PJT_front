<template>
  <div class="p-5">
    <PopularMovieList :popularMovieList='popularMovieList' />
  </div>
</template>

<script>
import PopularMovieList from '@/components/page/movie/PopularMovieList'

export default {
  name: 'Popular',
  components: {
    PopularMovieList,
  },
  data() {
    return {
      popularMovieList: [],
    }
  },
  created() {
    this.getPopularMovieList()
  },
  methods: {
    getPopularMovieList() {
      this.axios.get('movie/popular/')
        .then(res => {
          this.popularMovieList = res.data
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>

</style>
