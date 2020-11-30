<template>
  <div id="review-container" class="container">

    <ReviewCreate @uploadReview="reloadReviewList"/>
    <v-row v-for="review in paginatedReviewList" :key="review.id">
      <v-card dark width="100%" height="150" class="mx-auto my-5 p-2">
        <v-row>
          <v-col class="py-1">
            <v-btn text @click="goToReviewDetail(review.id)" class="pa-0 ml-3 font-weight-bold text-h6">제목: {{ review.title }}</v-btn>
            <div style="display: flex">
            <v-card-subtitle class="pl-4 pt-2">
              <router-link
                v-if="review.username!=$cookies.get('username')" :to="`profile/${review.user}`"
                style="color: #009688; font-size: 20px">{{ review.username }}</router-link>
              <div v-else style="color: #009688; font-size: 20px">{{ review.username }}</div>
              </v-card-subtitle>
            </div>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="4" class="col-md-3 text-right mr-4">
            <v-card-text class="p-0">작성일: {{ $moment(review.created_at.dateTime).format('YYYY-MM-DD') }}</v-card-text>
            <v-card-text class="p-0">수정일: {{ $moment(review.updated_at.dateTime).format('YYYY-MM-DD') }}</v-card-text>
          </v-col>
        </v-row>
        <v-card-text id="review_text" class="d-inline-block text-truncate text-h7">
          {{ review.content }}
        </v-card-text>
        
      </v-card>
    </v-row>

    <div class="text-center p-3">
      <v-pagination v-model="page" :length="pageLength" :total-visible="7" color="teal"></v-pagination>
    </div>

  </div>
</template>

<script>
import ReviewCreate from './review/ReviewCreate'

export default {
  name: 'ReviewList',
  components: {
    ReviewCreate,
  },
  data() {
    return {
      reviewList: [],
      loading: false,
      selection: 1,
      newReviewId: 0,
      show: false,

      pageSize: 5,
      pageLength: 0,
      page: 1,

      isActive: false,
    }
  },
  created() {
    this.getReviewList()
  },
  computed: {
    computedReviewList() {
      return this.reviewList
    },
    computedPageLength() {
      return this.pageLength
    },
    paginatedReviewList() {
        const start = (this.page-1) * this.pageSize,
              end = start + this.pageSize;
      return this.reviewList.slice(start, end);
    },
  },
  methods: {
    getReviewList() {
      this.axios.get('reviews/')
        .then(res => {
          this.reviewList = res.data
          this.pageLength = this.reviewList.length / this.pageSize
          if (Math.round(this.pageLength)==this.pageLength) {
            this.pageLength = parseInt(this.pageLength)
          } else {
            this.pageLength = parseInt(this.pageLength) + 1
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    reloadReviewList() {
      this.getReviewList()
    },
    goToReviewDetail(review_id) {
      this.$router.push(`/community/${review_id}`)
    },
    goToProfile(userId) {
      if (this.username==this.$cookies.username) {
        this.$router.push('/mypage')
      } else {
        this.$router.push(`/profile/${userId}`)
      }
    }
  }
}
</script>

<style>
#review-container {
  background-color: black;
  width: 900px;
  margin: 0 auto;
}
#review_text {
  white-space: pre-;
}
</style>
