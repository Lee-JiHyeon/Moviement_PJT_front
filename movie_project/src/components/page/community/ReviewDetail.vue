<template>
  <v-row>
    <v-col align="center" cols="11" class="mx-auto my-5 col-md-10 col-lg-9 col-xl-8">
      <v-card dark class="p-3" max-width="870">
        <v-card-text>
          <p style="font-size: 32px">{{ reviewInfo.title }}</p>
          <v-row>

            <v-col class="pl-3 text-left">
              <img :src="`https://image.tmdb.org/t/p/w154${reviewInfo.movie_poster}`" alt="">
            </v-col>

            <v-col class="text-left col-sm-8 col-md-8 col-lg-7 pl-0">
              <v-btn @click="goToMovieDetail(reviewInfo.movie)" class="pa-0 ml-0 pl-0" text color="teal">
                <v-card-text class="pa-0 mt-1" style="font-size: 20px;">영화명: {{ reviewInfo.movie_title }}</v-card-text>
              </v-btn>  
              <v-row>
                <v-card-text class="text-left pb-0">개봉일: {{ reviewInfo.release_date }}</v-card-text>
                <v-card-text v-if="reviewInfo.overview" color="teal" class="text-left hidden-xs-and-down">{{ reviewInfo.overview }}</v-card-text>
                <v-card-text v-else color="teal" class="hidden-xs-and-down">등록된 줄거리가 없습니다.</v-card-text>
              </v-row>
            </v-col>
            <v-col cols="2" class="hidden-md-and-down">
              <v-btn class="pa-0" text>
                <v-icon small>mdi-account</v-icon>
                <v-card-text class="pa-0 mt-1">
                    <router-link
                      v-if="reviewInfo.username!=$cookies.get('username')" 
                      :to="`/profile/${reviewInfo.user}`" style="color: white;">
                      {{ reviewInfo.username }}
                    </router-link>
                    <div v-else>{{ reviewInfo.username }}</div>
                  </v-card-text>
              </v-btn>
            </v-col>
          </v-row>
          <p class="text-left" style="font-size: 16px; padding: 20px 0 0 0; white-space: pre-line;">{{ reviewInfo.content }}</p>

          <v-row v-if="reviewInfo.username==$cookies.get('username')" align="baseline">
            <v-btn class="mx-3" fab dark small color="pink" @click="likeReview">
              <v-icon dark>mdi-heart</v-icon>
            </v-btn>
            <p>이 글을 <b>{{ computedNumOfLikeUsers }}명</b>이 좋아합니다.</p>
              <v-spacer></v-spacer>
              <v-btn text class="hidden-sm-and-down"><ReviewUpdate :review="computedReviewInfo" /></v-btn>
              <v-btn text class="hidden-sm-and-down"><ReviewDelete :review="computedReviewInfo" /></v-btn>
          </v-row>
          <CommentList />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import ReviewUpdate from './review/ReviewUpdate'
import ReviewDelete from './review/ReviewDelete'
import CommentList from './comment/CommentList'

export default {
  name: 'ReviewDetail',
  components: {
    ReviewUpdate,
    ReviewDelete,
    CommentList,
  },
  data() {
    return {
      reviewInfo: {},
      comments: [],
      numOfLikeUsers: 0,
      length: 3,
      window: 0,
      // dialog: false,
    }
  },
  created() {
    this.getReviewDetail()
  },
  computed: {
    computedReviewInfo() {
      return this.reviewInfo
    },
    computedNumOfLikeUsers() {
      return this.numOfLikeUsers
    }
  },
  methods: {
    getReviewDetail() {
      this.axios.get(`reviews/${this.$route.params.no}`)
        .then(res => {
          this.reviewInfo = res.data
          this.reviewInfo.overview = this.reviewInfo.overview.slice(0, 200) + '...'
          this.numOfLikeUsers = this.reviewInfo.like_users.length
        })
        .catch(err => {
          console.error(err)
          console.log('없는 리뷰 페이지임')
          this.$router.push({ name: 'Community'})
        })
    },
    likeReview() {
      const LIKE_API_URL = `reviews/${this.$route.params.no}/like/`
      this.axios.post(LIKE_API_URL)
        .then(res => {
          if (res.data.message=='add') {
            this.numOfLikeUsers++
            console.log(this.computedReviewInfo)
          } else if (res.data.message=='remove') {
            this.numOfLikeUsers--
            console.log(this.computedReviewInfo)
          }
          console.log(res.data.message)
        })
        .catch(err => {
          console.error(err)
        })
      },
      goToMovieDetail(reviewInfo_movie) {
        this.$router.push({ path: `/movie/${reviewInfo_movie}`})
      }
    
  }
}
</script>

<style>
</style>
