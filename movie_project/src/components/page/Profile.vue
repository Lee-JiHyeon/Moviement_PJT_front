<template>
<div id="Mypage">
  <v-card
    class="mx-auto mt-15 mb-15"
    max-width="800"
    dark
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="300px"
    ></v-img>
    <div style="display: flex; justify-content: center;">
      <div>
        <v-list-item-avatar color="grey darken-3 mx-auto mt-5" width="100" height="100" class="d-flex justify-center" flat>
          <v-img class="elevation-66 mx-auto" alt="" src="@/assets/person_image.png">
          </v-img>
        </v-list-item-avatar>
        <v-card-title class="mx-auto  text-h3">
          {{ username }}
          <v-btn class="ml-5" @click="follow()">
            {{ isfollow ? '언팔로우' : '팔로우' }}
          </v-btn>
        </v-card-title>

      </div>
    </div>
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
      <v-btn
        color="teal"
        class="text-h5"
        text
        @click="show = !show"
      >
        {{ userId }} Review List
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      </v-card-actions>
      <div v-show="show" v-for=" (review, idx) in reviewList" :key="idx">
        <v-btn color="teal accent-4" text class="text-h6 py-0" @click="goToReviewDetail(review.id)">
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
  name: 'Profile',
  created() {
    this.getUserInfo()
    this.getUserReview()
    this.getfollowInfo()
  },
  data() {
    return {
      show: false,
      userId: '',
      username: '',
      reviewList: [],
      movieTitle: '',
      reviewCount: 0,
      follower: 0,
      following: 0,
      isfollow: false,
    }
  },
  methods: {
    getUserInfo() {
      this.axios.get(`accounts/profile/${this.$route.params.no}/`)
      .then(res => {
        this.username = res.data.username
      })
      .catch(err => {
        console.error(err)
      })
    },
    getUserReview() {
      this.axios.get(`reviews/profile_review/${this.$route.params.no}/`)
      .then(res => {
        this.reviewList = res.data
        this.reviewCount = this.reviewList.length
      })
      .catch(err=> {
        console.error(err)
      })
    },
    goToReviewDetail(review_id) {
      this.$router.push({ path: `/community/${review_id}`})
    },
    follow() {
      const userId = window.location.href.slice(30)
      this.axios.post(`accounts/follow/${userId}/`)
      .then(res => {
        if (res.data.success === '팔로우') {
          this.isfollow = true
        }
        else if (res.data.success === '언팔로우') {
          this.isfollow = false
        }
      })
      .catch(err => {
        console.error(err)
      })
    },
    getfollowInfo() {
      this.axios.get(`accounts/follow/${this.$route.params.no}/`)
      .then(res => {
        this.follower = res.data.follower
        this.following = res.data.following
        if (res.data.isfollow === 'true') {
          this.isfollow = true
        }
      })
      .catch(err => {
        console.error(err)
      })
    },
    getIsfollow() {
      this.axios.get()
    }
  },
  watch: {
    isfollow: function() {
      this.getfollowInfo()
    }
  }
}
</script>

<style>

</style>
