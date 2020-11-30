<template>
  <v-app>
    <v-main color="black" id="app">
      <v-img v-if="$cookies.get('isLogined')==0" contain 
        width="300" class="shrink p-4 ml-4 position-sticky sticky-top" min-width="100" 
        src="@/assets/logo.png" alt="SiteLogo" id="intro-logo"
      />
      <router-view />
    </v-main>
  </v-app>

</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      userId: '',
    }
  },
  created() {
    if (!this.$cookies.isKey('isLogined')) {
      this.$cookies.set('isLogined', 0)
    }
  }
}
</script>

<style lang="scss">
// @import url('https://fonts.googleapis.com/css?family=Nanum+Gothic+Coding:400');
#app {
  background-color: black;
}
#intro-logo {
  z-index: 2
}
</style>
