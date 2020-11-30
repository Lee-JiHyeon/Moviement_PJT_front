<template>
  <v-card class="mx-auto px-15 pb-15" min-width="600" max-width="780" max-height="2000" color="grey darken-4"> 
    <v-row class="ml-4 mt-10 pt-10">
      <v-col cols="5" class="col-sm-4">
        <img :src="`https://image.tmdb.org/t/p/w154${movieInfo.poster_path}`" alt="img">
      </v-col>
      <v-col class="pl-0">
        <v-card-text class="text-white pt-0">
          <h1>{{ movieInfo.title }}</h1>
          <v-rating v-model="computedStarAvg" background-color="teal lighten-3" color="teal" medium half-increments dense readonly class="pb-3"></v-rating>
          <p style="font-size: 16px;">유저 평점: {{ starAvgForShow }}점</p>
          <p>개봉일: {{ movieInfo.release_date }}</p>
          <v-row class="pl-3">
            <span class="mr-3" v-for="genre in movieGenres" :key="genre.id">{{ genre.name }}</span>
          </v-row>
        </v-card-text>
      </v-col>
    </v-row>
    <v-row class="hidden-xl-and-down px-2">
      <v-col v-for="(person, idx) in moviePeople" :key="person.id" col="3" class="px-0 mx-0" align="center">
        <img v-if="peopleImage[idx]" :src="peopleImage[idx]" :alt="`배우 이미지-${idx}`" class="people-image">
        <img v-else src="@/assets/person_image.png" alt="이미지 없음" class="people-image">
        <v-card-text id="actortext">{{ person.name }}</v-card-text>
      </v-col>
    </v-row>

    <v-card-actions class="pb-0">
      <v-btn color="teal lighten-2" text @click="show = !show" style="font-size: 18px;">OVERVIEW</v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-card-text v-if="movieInfo.overview" class="white--text text-body-1 text-justify">
          {{ movieInfo.overview }}  
        </v-card-text>
        <v-card-text v-else class="white--text text-body-1">
          등록된 줄거리가 없습니다.
        </v-card-text>
      </div>
    </v-expand-transition>
    <v-card-text style="color: #4DB6AC; font-size: 18px;">TRAILER</v-card-text>
    <MovieTrailer />
    <v-col justify="center">
      <StarRatingComments :commentList="commentList" @loadComments="loadComments"/>
    </v-col>
  </v-card>
</template>

<script>
import MovieTrailer from './MovieTrailer'
import StarRatingComments from './StarRatingComments'

export default {
  name: 'MovieDetailInfo',
  components: {
    MovieTrailer,
    StarRatingComments
  },
  data() {
    return {
      starAvg: 0,
      dialog: false,
      movieInfo: {},
      movieGenres: [],
      moviePeople: [],
      peopleImage: [],
      commentList: [],
      show: true,
    }
  },
  computed: {
    computedCommentList() {
      return this.commentList
    },
    computedStarAvg() {
      return this.starAvg
    },
    starAvgForShow() {
      if (this.starAvg==null) {
        return 0
      } else {
        return this.starAvg.toFixed(2)
      }
    },
  },
  created() {
    this.getMovieInfo()
  },
  methods: {
    getMovieInfo() {
      this.axios.get(`movie/${this.$route.params.no}/`)
        .then(res => {
          this.movieInfo = res.data.movie
          this.movieGenres = res.data.genres
          this.moviePeople = res.data.people
          res.data.people.forEach(person => {
            return this.getPersonImage(person.id)
          })
        })
        .catch(err => {
          console.error(err)
        })
    },
    getPersonImage(personId) {
      const API_KEY = '8f83a2602ba89b8cf90a8ea56cfee566'
      const API_URI = `https://api.themoviedb.org/3/person/${personId}/images?api_key=${API_KEY}`
      this.axios.get(API_URI)
        .then(res => {
          if (res.data.profiles[0]==undefined) {
            this.peopleImage.push('')
          } else {
            this.peopleImage.push(`https://image.tmdb.org/t/p/w500${res.data.profiles[0].file_path}`)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    loadComments(data) {
      this.commentList = data.ratings
      this.starAvg = data.star_average.rating__avg
    },
  }
}
</script>

<style>
.people-image {
  width: 100px;
  height: 120px;
}
#infotext {
  color: white;
  font-size: 18px;
  margin: 10px 0 0 6px;
}
#movietitletext {
  color: white;
  font-size: 35px;
  margin: 0 0 50px 5px;
}
#actortext {
  color: white;
  font-size: 18px;
}
#overviewtext {
  color: white;
  font-size: 17px;
  margin: 0 180px 50px 180px;
}
</style>
