<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="teal" dark v-bind="attrs" v-on="on" class="mt-4">별점주기</v-btn>
        </template>
        <v-card color="grey lighten-2">
          <v-card-title>
            <v-card-text class="headline" color="blue-grey darken-4">별점주기</v-card-text>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-rating v-model="rating" background-color="teal darken-1" color="teal darken-1" medium dense></v-rating>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field label="Main input" :rules="rules" v-model="comment" @keydown.enter="movieRating()" hide-details="auto" :counter="20"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions dark>
            <v-spacer></v-spacer>
            <v-btn color="teal darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="teal darken-1" text @click="movieRating()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="fail" max-width="300">
        <v-card>
          <v-card-title class="text-danger">등록 실패!</v-card-title>
          <v-card-text class="pb-2" style="font-size: 15px">
            <b>{{ message }}:)</b>
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
  name: 'StarRating',
  props: {
    isEvaluated: Boolean
  },
  data() {
    return {
      rating: 0,
      dialog: false,
      rules: [
        value => !!value || '한줄평을 반드시 입력해주세요.',
        value => (value && (value.length <= 20)) || '20자 이하로 작성하세요.',
      ],
      comment: '',
      isRating: false,
      fail: false,
      message: '',
    }
  },
  methods: {
    movieRating() {
      if (this.isEvaluated==true) {
        this.fail = true
        this.rating = 0
        this.comment = ''
        this.dialog = false
        this.message = '해당 영화에 이미 별점을 등록하셨습니다.'
        return
      } else if (this.comment.length>20 || this.comment.length==0) {
        this.fail = true
        this.message = '별점 및 한줄평을 올바르게 등록해주세요.'
        return
      } else {
        this.dialog = false
        const params = {
          'form_data': {
            'rating': this.rating,
            'comment': this.comment,
          }
        }
        const config = {
          hearders: {
            'X-CRSFToken': sessionStorage.getItem('access_token')
          }
        }
        this.rating = 0
        this.comment = ''
        this.axios.post(`movie/${this.$route.params.no}/star/`, params, config)
          .then(() => {
            this.isRating = true
            this.$emit('evaluateMovie')
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
