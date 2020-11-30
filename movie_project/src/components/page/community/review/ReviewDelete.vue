<template>
    <v-row justify="space-around">
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="red" dark v-bind="attrs" v-on="on">게시글삭제</v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">정말로 삭제하시겠습니까?</v-card-title>
        <v-card-text>리뷰를 삭제할 경우 다시 되돌릴 수 없습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black darken-1" text @click="dialog = false">취소</v-btn>
          <v-btn color="red darken-1" text @click="reviewDelete">삭제</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
      <v-dialog v-model="fail" max-width="300">
        <v-card>
          <v-card-title class="text-danger">글삭제 실패!</v-card-title>
          <v-card-text class="pb-2" style="font-size: 15px">
            <b>자신의 글만 삭제할 수 있어요 :(</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="fail = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'ReviewDelete',
  props: {
    review: Object
  },
  data () {
    return {
      dialog: false,
      fail: false,
    }
  },
  methods: {
    reviewDelete() {
      if (this.review.username!=this.$cookies.get('username')) {
        console.log('자신의 글만 삭제할 수 있습니다.')
        this.fail = true
        this.dialog = false
        return
      }
      const params = {
        'form_data': {
          'title': this.review.title,
          'content': this.review.content,
        },
        'movie_id': this.review.movie,
        'username': this.$cookies.get('username'),
      }
      const config = {
        hearders: {
          'X-CRSFToken': sessionStorage.getItem('access_token')
        }
      }
      this.dialog = false
      this.axios.delete(`reviews/${this.review.id}/delete/`, params, config)
        .then(res => {
          if (res.data.success) {
            this.$router.push({ name: 'Community'})
            console.log(res.data.success)
          } else {
            console.log(res.data.fail)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style>

</style>
