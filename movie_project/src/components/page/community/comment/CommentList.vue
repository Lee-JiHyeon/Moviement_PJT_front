<template>
  <v-card class="hidden-xl-and-down">
    <CommentCreate @uploadComment="reloadComments" />

    <v-expansion-panels v-model="panel" :readonly="readonly" :multiple="multiple" @click="multiple = !multiple">
      <v-expansion-panel>
        <v-expansion-panel-header color="grey darken-3">댓글 목록 ({{ this.comments.length }})</v-expansion-panel-header>

        <v-expansion-panel-content v-for="comment in computedComments" :key="comment.id" color="grey darken-4">
          <v-row align="start" justify="space-between" dense>
            <v-col cols="3" class="ml-0 col-lg-2 pt-3">
              <v-col class="m-0 p-0 text-left">
                <router-link :to="`/profile/${comment.user}`" style="color: #009688; font-size: 20px">{{ comment.username }}</router-link>
              </v-col>
                <v-col class="p-0 text-left">
                  <small>작성: {{ $moment(comment.created_at.dateTime).format('YYYY-MM-DD') }}</small>
                </v-col>
                <v-col class="p-0 text-left">
                  <small>수정: {{ $moment(comment.updated_at.dateTime).format('YYYY-MM-DD') }}</small>
                </v-col>
            </v-col>
            <v-col justify="space-between" v-if="updatingCommentId==comment.id" class="d-flex align-items-center justify-content-between col-lg-9" cols="8">
              <v-row>
                <v-col cols="9">
                  <v-text-field v-model="comment.content" required></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-btn color="teal" text @click="commentUpdate(comment.id, comment.content)">수정완료</v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col v-else class="d-flex align-items-center justify-content-between col-lg-9" cols="8">
              <v-col class="text-left" style="vertical-align: start">
                {{ comment.content }}
              </v-col>
              <v-menu v-if="comment.username==$cookies.get('username')" dark right class="mr-0 pr-0">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item>
                    <v-btn color="teal" text @click="updateMode(comment.id, comment.content, comment.username)">수정</v-btn>
                    <CommentDelete :commentId="comment.id" @deleteComment="reloadComments" />
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-col>
            
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

  </v-card>
</template>
<script>
import CommentCreate from './CommentCreate'
import CommentDelete from './CommentDelete'

export default {
  name: 'CommentList',
  components: {
    CommentCreate,
    CommentDelete,
  },
  data() {
    return {
      comments: [],
      panel: [0, 1],
      readonly: false,
      multiple: false,
      updatingCommentId: -1,
      updatingCommentContent: '',
    }
  },
  created() {
    this.getComments()
  },
  computed: {
    computedComments() {
      return this.comments
    },
  },
  methods: {
    getComments() {
      this.axios.get(`reviews/${this.$route.params.no}/comments/`)
        .then(res => {
          this.comments = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateMode(id, content, username) {
      if (username!=this.$cookies.get('username')) {
        this.dialog = false
        return
      }
      this.updatingCommentId = id
      this.updatingCommentContent = content
    },
    commentUpdate(id, content) {
      if (content==this.updatingCommentContent) {
        this.updatingCommentId = -1
        this.updatingCommentContent = ''
        return
      }
      else {
        const params = {
          'content': content,
        }
        const config = {
          hearders: {
            'X-CRSFToken': sessionStorage.getItem('access_token')
          }
        }
        this.dialog = false
        this.axios.put(`reviews/${this.$route.params.no}/comments/${id}/update/`, params, config)
          .then(res => {
            if (res.data.success) {
              console.log(res.data.success)
              this.updatingCommentId = -1
              this.updatingCommentContent = ''
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
    reloadComments() {
      this.getComments()
    },
  }
}
</script>

<style>

</style>
