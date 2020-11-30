<template>
  <div class="p-5">
    <RecentMovieList :recentMovieList='recentMovieList' />
  </div>
</template>

<script>
import RecentMovieList from '@/components/page/movie/RecentMovieList'

export default {
  name: 'Recent',
  components: {
    RecentMovieList,
  },
  data() {
    return {
      recentMovieList: [],
    }
  },
  created() {
    this.getRecentMovieList()
  },
  methods: {
    getRecentMovieList() {
      this.axios.get('movie/recent/')
        .then(res => {
          this.recentMovieList = res.data
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
