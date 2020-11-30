<template>
  <v-row class="mr-1 mt-2" justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn text color="white" dark v-bind="attrs" v-on="on">댓글 쓰기</v-btn>
      </template>
      <v-card color="grey lighten-2">
        <v-card-title>
          <span class="headline">댓글 쓰기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="content" label="댓글 내용*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" text @click="dialog = false">Close</v-btn>
          <v-btn color="teal" text @click="commentCreate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="fail" max-width="300">
      <v-card>
        <v-card-title class="text-danger">ERROR!</v-card-title>
        <v-card-text class="pb-2" style="font-size: 15px">
          <b>댓글 작성에 실패했습니다 :(</b>
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
  name: 'CommentCreate',
  data() {
    return {
      content: '',
      dialog: false,
      fail: false,
    }
  },
  methods: {
    commentCreate() {
      const params = {
        'content': this.content,
      }
      this.content = ''
      const config = {
        hearders: {
          'X-CRSFToken': sessionStorage.getItem('access_token')
        }
      }
      this.dialog = false
      this.axios.post(`reviews/${this.$route.params.no}/comments/create/`, params, config)
        .then(() => {
          this.$emit('uploadComment')
        })
        .catch(err => {
          this.fail = true
          console.error(err)
        })
    }
  }
}
</script>

<style>

</style>
