<template>
  <v-footer dark padless class="mt-1633">
    <v-card flat tile class="teal darken-1 white--text text-center" style="width: 100%">
      <v-card-text>
        <img src="@/assets/ssafy.png" alt="SSAFY" style="width: 100px">
      </v-card-text>

      <v-card-text class="white--text pt-0">
       개발자 : 김동욱, 이지현 ｜ 소속 : SSAFY 4기 광주 1반 ｜ 고객센터 : 010-2604-5723
      </v-card-text>  
      <v-card-text class="white--text pt-0">
       Copyright © 주식회사 Moviement All right reserved.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>SSAFY 4기 1학기 최종프로젝트</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }
  }
}
</script>

<style>

</style>
