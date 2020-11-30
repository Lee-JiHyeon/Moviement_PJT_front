<template>
  <v-row class="mx-auto pl-2">
    <div v-if="videoId" id="video" class="hidden-sm-and-down">
      <youtube :video-id="videoId" :player-vars="playerVars"></youtube>
    </div>
    <div v-else>
      <p class="text-white">영상이 없습니다 :(</p>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'MovieTrailer',
  data() {
    return {
      videoId: '',
      playerVars: {
        autoplay: 1,
        origin:'http://localhost:8080',
      }
    }
  },
  created() {
    this.getMovieTrailer()
  },
  methods: {
    getMovieTrailer() {
      const API_KEY = '8f83a2602ba89b8cf90a8ea56cfee566'
      const API_URI = `https://api.themoviedb.org/3/movie/${this.$route.params.no}/videos?api_key=${API_KEY}`
      this.axios.get(API_URI+'&language=ko-KR')
        .then(res => {
          if (res.data.results.length) {
            this.videoId = res.data.results[0].key
          } else {
            // console.log('한국어자막 티저영상이 없습니다.')
            this.axios.get(API_URI)
              .then(res => {
                if (res.data.results.length) {
                  this.videoId = res.data.results[0].key
                } else {
                  console.log('티저영상이 없습니다.')
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
}
</script>

<style>
#video {
  display: flex;
  justify-content: center;
}
</style>
