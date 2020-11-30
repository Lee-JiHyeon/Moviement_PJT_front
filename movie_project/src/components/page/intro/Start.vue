<template>
  <v-row id="intro-container">
    <v-col class="mt-15 pt-15">
      <router-link :to="'/signup'">
        <v-btn elevation="2" color="teal lighten-1">회원가입</v-btn>
      </router-link>
    </v-col>
    <v-col class="mt-15 pt-15">
      <router-link :to="'/login'">
        <v-btn elevation="2" color="teal lighten-1">로그인</v-btn>   
      </router-link>
    </v-col>
  </v-row>
</template>
  
<script>
export default {
  name: 'Start',
  components: {
  },
}
</script>

<style>
#intro-container {
  margin: 0 auto;
  vertical-align: middle;
  width: 1000px;
}
</style>
