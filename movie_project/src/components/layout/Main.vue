<template>
  <div id="main">
    <NavBar />
    <router-view :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
import NavBar from './MainNavbar'
import Footer from './MainFooter'

export default {
  name: 'Main',
  components: {
    NavBar,
    Footer,
  },
  created() {
    if (this.$cookies.get('isLogined')==0) {
      this.$router.push({ name: 'Intro'})
    }
  },
}
</script>

<style>
#main {
  background-color: black;
}
</style>
