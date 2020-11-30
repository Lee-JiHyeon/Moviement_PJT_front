<template>
  <v-app-bar app color="grey darken-4" dark align="center" justify="space-between">
      <v-col class="mr-5">
        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-xs-and-down" contain
          src="@/assets/logo.png" width="200"
        />
      </v-col>

      <v-spacer></v-spacer>
        <v-col class="hidden-md-and-down mt-7 p-0 shrink" cols="3">
          <v-autocomplete
            clearable :items="movies" item-text="title" item-value="id" v-model="movieId" color="grey lighten-4"
            label="영화제목을 입력하세요" outlined dense auto-select-first
            :click="goToMovieDetailPage(movieId)" @keypress.enter="goToMovieDetailPage(movieId)"
          >
          </v-autocomplete>
        </v-col>

      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn :to="{ name: 'Movie' }" text color="grey lighten-4">
          <span>HOME</span>
        </v-btn>
        <v-btn :to="{ name: 'AboutUs' }" text color="grey lighten-4">
          <span>ABOUTUS</span>
        </v-btn>
        <v-btn :to="{ name: 'Community' }" text color="grey lighten-4">
          <span>COMMUNITY</span>
        </v-btn>
        <v-btn :to="{ name: 'MyPage' }" text color="grey lighten-4">
          <span>MYPAGE</span>
        </v-btn>
        <v-btn @click="logout" text color="grey lighten-4">
          <span>LOGOUT</span>
        </v-btn>
      </div>

      <div class="hidden-md-and-up">
        <v-menu offset-y dark>
          <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon color="teal lighten-5" v-bind="attrs" v-on="on"></v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-btn depressed text dark :to="{ name: 'Movie' }">
                <v-list-item-title>HOME</v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn depressed text :to="{ name: 'AboutUs' }">
                <v-list-item-title>ABOUTUS</v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn depressed text :to="{ name: 'Community' }">
                <v-list-item-title>COMMUNITY</v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn depressed text :to="{ name: 'MyPage' }">
                <v-list-item-title>MYPAGE</v-list-item-title>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn depressed text @click="logout">
                <v-list-item-title>LOGOUT</v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

  </v-app-bar>
</template>

<script>
export default {
  name: 'MainNavbar',
  data() {
    return {
      movies: [],
      movieId: '',
    }
  },
  created() {
    this.searchMovie()
  },
  methods: {
    logout() {
      sessionStorage.removeItem('access_token')
      this.$cookies.remove('username')
      this.$cookies.set('isLogined', 0)
      this.$router.push({ name: 'Intro'})
    },
    searchMovie() {
      this.movies = []
      this.axios.get('movie/search/')
      .then(res => {
        this.movies = res.data
      })
      .catch(err => {
        console.error(err)
      })
    },
    goToMovieDetailPage(movieId) {
      if (movieId) {
        this.axios.get(`movie/search/${movieId}/`)
        .then(() => {
          // console.log(res.data)
          this.$router.push(`/movie/${movieId}`)
          this.movieId = ''
        })
        .catch(err => {
          console.error(err)
        })
      }
    },
  }
}
</script>

<style>

</style>
