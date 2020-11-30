<template>
  <div>
    <v-row>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text justify="end" color="teal" dark v-bind="attrs" v-on="on">
            게시글수정
          </v-btn>

        </template>
        <v-card>
          <v-toolbar dark color="teal">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>리뷰 쓰기</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="reviewUpdate">저장</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" lg="7">
                  <small>영화명</small>
                  <v-text-field label="영화명*" v-text="review.movie_title" required></v-text-field>
                </v-col>
                <v-col cols="12" lg="7" class="h-100">
                  <v-text-field label="리뷰 제목*" v-model="review.title" required></v-text-field>
                </v-col>
                <v-container fluid>
                  <v-row>
                    <v-col cols="12" lg="7">
                      <v-textarea solo name="input-7-4" label="리뷰 내용" v-model="review.content">
                      </v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="fail" max-width="300">
        <v-card>
          <v-card-title class="text-danger">글수정 실패!</v-card-title>
          <v-card-text class="pb-2" style="font-size: 15px">
            <b>{{ errorMessage }}</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="errorMessage = '', fail = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'ReviewCreate',
  props: {
    review: Object
  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      fail: false,
      errorMessage: '',
    }
  },
  methods: {
    reviewUpdate() {
      if (this.review.username!=this.$cookies.get('username')) {
        console.log('자신의 글만 수정할 수 있습니다.')
        this.dialog = false
        this.fail = true
        this.errorMessage = '자신의 글만 수정할 수 있어요 :('
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
      this.axios.put(`reviews/${this.review.id}/update/`, params, config)
        .then(res => {
          if (res.data.fail) {
            console.log(res.data.fail)
          }
          this.review.title = res.data.title
          this.review.content = res.data.content
        })
        .catch(err => {
          // this.fail = true
          // this.errorMessage = '변경사항이 없습니다 :)'
          console.error(err)
        })
    }
  }
}
</script>

<style>

</style>
