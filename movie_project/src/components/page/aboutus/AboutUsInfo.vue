<template>
  <div style="color: white; vertical-align: middle" class="mx-auto text-center py-15">
    <h1>9000개가 넘는 영화DB</h1>
    <div style="margin: 0 0 80px 0">
      찾고싶은 영화, Moviement에 모두 담았습니다.
    </div>
    <h1>사용자 맞춤 추천 영화서비스 </h1>
    <div style="margin: 0 0 80px 0">
      Moviement에서 제공하는 영화추천 서비스, 메인페이지에서 서비스를 이용할 수 있습니다.
    </div>
    <h1>Moviement회원을 위한 리뷰커뮤니티 서비스</h1>
    <div style="margin: 0 0 80px 0">
      자유롭게 리뷰를 올리며 회원들과 생각을 공유하세요
    </div>
    <h1>맘에드는 리뷰어를 팔로우</h1>
    <div style="margin: 0 0 80px 0">
      Moviement는 팔로우 기능을 제공합니다.
      맘에드는 리뷰어를 팔로우하여 리뷰를 확인하세요
    </div>  
  </div>
</template>

<script>
export default {
  name: 'AboutUsInfo',
  created() {
    this.effect()
  },
  data() {
    return {
      show: false,
    }  
  },
  methods: {
    effect() {
      this.show = true
    }
  }  
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
#title {
  color: #009688;
  font-weight: 700;
}
</style>
