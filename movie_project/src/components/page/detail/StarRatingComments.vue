<template>
  <div>
    <StarRatingEvaluate :isEvaluated="computedIsEvaluated" @evaluateMovie="reloadComments" />

    <v-simple-table class="mt-3" dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">ID</th>
            <th class="text-center">별점</th>
            <th class="text-center">한줄평</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="rating in commentList" :key="rating.id">
            <td class="text-left">
              <router-link v-if="rating.username!=$cookies.get('username')" :to="`/profile/${rating.rated_user}`" class="text-white">{{ rating.username }}</router-link>
              <div v-else>{{ rating.username }}</div>
            </td>
            
            <td class="text-center">
              <v-rating 
                v-model="rating.rating" :readonly="updatedRatingId!=rating.id"
                background-color="teal lighten-3" color="teal" medium dense
              ></v-rating>
            </td>
            
            <td v-if="updatedRatingId==rating.id" class="d-flex align-items-center justify-content-between">
              <v-col class="mt-1">
                <v-text-field 
                  v-model="rating.comment" required
                  @keypress.enter="ratingUpdate(rating.id, rating.rating, rating.comment)"
                ></v-text-field>
              </v-col>
              <v-btn color="darken-1" text 
                @click="ratingUpdate(rating.id, rating.rating, rating.comment)">수정완료</v-btn>
            </td>   
            <td v-else class="d-flex align-items-center justify-content-between">
              <v-col>{{ rating.comment }}</v-col>
              <v-menu v-if="rating.username!=$cookies.get('username')" right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list dark>
                  <v-list-item>
                    <v-btn color="darken-1" text 
                      @click="updateMode(rating)">Update</v-btn>
                    <v-btn color="red darken-1" text @click="ratingDelete(rating.id, rating.username)">Delete</v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>    
  </div>
</template>

<script>
import StarRatingEvaluate from './StarRatingEvaluate'

export default {
  name: 'StarRatingComments',
  components: {
    StarRatingEvaluate,
  },
  props: {
    commentList: Array,
  },
  data() {
    return {
      updatingRatingId: -1,
      updatingRatingStar: -1,
      updatingRatingComment: '',
      isEvaluated: false,
    }
  },
  created() {
    this.getStarRatingComments()
  },
  computed: {
    updatedRatingId() {
      return this.updatingRatingId
    },
    computedIsEvaluated() {
      return this.isEvaluated
    }
  },
  methods: {
    updateMode(rating) {
      if (rating.username!=this.$cookies.get('username')) {
        console.log('자신의 글만 수정할 수 있습니다.')
        return
      }
      this.updatingRatingId = rating.id
      this.updatingRatingStar = rating.star
      this.updatingComment = rating.comment
    },
    getStarRatingComments() {
      this.axios.get(`movie/${this.$route.params.no}/star/`)
        .then(res => {
          this.updatingRatingId = -1
          this.updatingRatingStar = -1
          this.updatingRatingComment = ''
          this.isEvaluated = res.data.isEvaluated
          this.$emit('loadComments', res.data)
          if (res.data.star_average!=null) {
            this.starAvg = res.data.star_average.rating__avg
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    ratingUpdate(id, star, comment) {
      if (comment==this.updatingComment) {
        console.log('변동사항이 없습니다.')
        this.updatingRatingId = -1
        this.updatingRatingStar = -1
        this.updatingComment = ''
        return
      } else {
        const params = {
          'rating': star,
          'comment': comment,
        }
        const config = {
          hearders: {
            'X-CRSFToken': sessionStorage.getItem('access_token')
          }
        }
        this.updatingCommentId = -1
        this.updatingRatingStar = -1
        this.updatingCommentContent = ''
        this.axios.put(`movie/${this.$route.params.no}/star/${id}/`, params, config)
          .then(res => {
            if (res.data.success) {
              console.log(res.data.success)
              this.reloadComments()
            } else {
              console.log(res.data.fail)
            }
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    ratingDelete(id, username) {
      if (username!=this.$cookies.get('username')) {
        console.log('자신의 글만 삭제할 수 있습니다.')
        return
      }
      const config = {
        hearders: {
          'X-CRSFToken': sessionStorage.getItem('access_token')
        }
      }
      this.axios.delete(`movie/${this.$route.params.no}/star/${id}/`, config)
        .then(res => {
          if (res.data.success) {
            console.log(res.data.success)
            this.reloadComments()
          } else {
            console.log(res.data.fail)
          }
        })
        .catch(err => {
          console.error(err)
        })
    },
    reloadComments() {
      this.getStarRatingComments()
    }
  }
}
</script>

<style>

</style>
