<template>
  <div id="Mypage">
    <v-card class="mx-15 mx-md-auto" max-width="800" color="blue-grey lighten-4">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="390px"></v-img>
    <v-row style="display: flex; justify-content: center;">
      <div>
        <v-list-item-avatar color="teal mx-auto mt-5" width="100" height="100" class="d-flex justify-center" flat>
          <v-img class="elevation-66 mx-auto" alt="" src="@/assets/person_image.png">
          </v-img>
        </v-list-item-avatar>
        <v-card-title class="mx-auto pt-1 mb-4 text-h3">
          {{ userName }}
        </v-card-title>
      </div>
    </v-row>
    <div style="display: flex; justify-content: space-around;">
      <p style="font-weight: 700; font-size: 25px;">{{ reviewCount }}</p>
      <p style="font-weight: 700; font-size: 25px">{{ follower }}</p>
      <p style="font-weight: 700; font-size: 25px">{{ following }}</p>
    </div>
    <div style="display:flex; justify-content: space-around;">
      <p style="font-weight: 700; font-size: 20px;">게시글</p>
      <p style="font-weight: 700; font-size: 20px;">팔로워</p>
      <p style="font-weight: 700; font-size: 20px;">팔로잉</p>
    </div>
    <v-card-actions>
      <v-btn color="teal" class="text-h5" text @click="show = !show">
        My Review List
      </v-btn>
      <v-spacer></v-spacer>
      <hr>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      </v-card-actions>
      <div v-show="show" v-for=" (review, idx) in reviewList" :key="idx">
        <v-btn color="blue-grey darken-4" text class="text-h6 py-0" @click="goToReviewDetail(review.id)">
          {{ review.title }}
        </v-btn>
        <v-card-text class="text-subtitle-2 py-0 mb-3">
          {{ review.movie }}
        </v-card-text>
        <v-card-text class="text-justify text-truncate text-subtitle-1 py-0">
          {{ review.content }}
        </v-card-text>
        <v-divider></v-divider>
      </div>
  </v-card>
</div>
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    return {
      show: false,
      userName: '',
      userId: 0,
      reviewList: [],
      movieTitle: '',
      reviewCount: 0,
      follower: 0,
      following: 0,
    }
  },
  created() {
    this.getUserInfo()
    this.getUserReview()
  },
  methods: {
    getUserInfo() {
      this.axios.get('accounts/mypage/')
      .then(res => {
        this.userName = res.data.data.username
        this.follower = res.data.follower
        this.following = res.data.following
      })
      .catch(err => {
        console.error(err)
      })
    },
    getUserReview() {
      this.axios.get('reviews/mypage_review/')
      .then(res => {
        this.reviewList = res.data
        this.reviewCount = this.reviewList.length
      })
      .catch(err=> {
        console.error(err)
      })
    },
    getMovie(movie_id) {
      this.axios.get(`movie/${movie_id}/`)
      .then(res => {
        this.movieTitle = res.data.title
      })
      .catch(err=> {
        console.error(err)
      })
    },
    goToReviewDetail(review_id) {
      this.$router.push({ path: `/community/${review_id}`})
    }

  }
}
</script>

<style>
#Mypage {
  background-color: black;
  padding: 90px 0;
}
</style>
