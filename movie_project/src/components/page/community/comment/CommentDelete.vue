<template>
  <v-btn color="red darken-1" text @click="commentDelete()">삭제</v-btn>
</template>

<script>
export default {
  name: 'CommentDelete',
  props: {
    commentId: Number,
  },
  methods: {
    commentDelete() {
      const config = {
        hearders: {
          'X-CRSFToken': sessionStorage.getItem('access_token')
        }
      }
      this.dialog = false
      this.axios.delete(`reviews/${this.$route.params.no}/comments/${this.commentId}/delete/`, config)
        .then(res => {
          if (res.data.success) {
            console.log(res.data.success)
            this.$emit('deleteComment')
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
