<template>
  <div>
    <h1 class="text-white text-center">영화 리뷰 모아보기 :)</h1>
    <v-row justify="end">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mt-2" color="teal darken-3" v-bind="attrs" v-on="on" dark>
            리뷰 작성하기
          </v-btn>
        </template>

        <v-card color="grey lighten-2">
          <v-toolbar dark color="teal">
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Review Write</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn text @click="reviewCreate">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text class="mt-15">
            <v-container fluid>
              <v-row justify="center">
                <v-col cols="12" lg="8">
                  <v-autocomplete
                    clearable :items="movies" item-text="title" item-value="id" v-model="review.movieId"
                    label="영화제목을 입력하세요*" outlined dense auto-select-first filled
                  >
                  </v-autocomplete>
                </v-col>                
                <v-col cols="12" lg="8" class="h-100">
                  <v-text-field label="리뷰 제목*" v-model="review.title" required></v-text-field>
                </v-col>
                <v-col cols="12" lg="8">
                  <v-textarea filled name="input-7-4" label="리뷰 내용*" v-model="review.content" height="400px">
                  </v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="fail" max-width="300">
        <v-card>
          <v-card-title class="text-danger">ERROR!</v-card-title>
          <v-card-text class="pb-2" style="font-size: 15px">
            <b>글 작성에 실패했습니다 :(</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="fail = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'ReviewCreate',
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      movies: [],
      review: {
        movieId: 0,
        title: '',
        content: '',
      },
      fail: false,
    }
  },
  created() {
    this.searchMovie()
  },
  methods: {
    reviewCreate() {
      const params = {
        'form_data': {
          'title': this.review.title,
          'content': this.review.content,
        },
        'movie_id': this.review.movieId,
      }
      this.review.title = ''
      this.review.content = ''
      this.review.movieTitle = ''
      const config = {
        hearders: {
          'X-CRSFToken': sessionStorage.getItem('access_token')
        }
      }
      this.dialog = false
      this.axios.post('reviews/create/', params, config)
        .then(() => {
          this.$emit('uploadReview')
        })
        .catch(err => {
          this.fail = true
          console.error(err)
        })
    },
    searchMovie() {
      this.searchMovieTitle = []
      this.axios.get('movie/search/')
      .then(res => {
        this.movies = res.data
      })
      .catch(err => {
        console.error(err)
      })
    },
  }
}
</script>

<style>

</style>
