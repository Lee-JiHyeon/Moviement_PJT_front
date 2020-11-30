<template>
  <div class="intro">
    <!-- <v-parallax dark height="1200" id='parallax' src="@/assets/intro5.jpg"> -->
      <v-row align="center" justify="center">
        <v-col class="text-center" cols="12">
          <router-view />
        </v-col>
      </v-row>
    <!-- </v-parallax> -->
  </div>
</template>

<script>
export default {
  name: 'Intro',
  created() {
    if (this.$cookies.get('isLogined')==1) {
      this.$router.push({ name: 'Main'})
    }
  }
}
</script>

<style>
.intro {
  background-color: black;
  height: 85%;
  vertical-align: middle;
  color: white;
}

.login-box {
  /* background-color: white; */
  width: 35%;
  height: 50%;
  margin: auto;
  padding: auto;
}

#parallax {
  height: auto;
  width: auto;
}

.input-box {
  background-color: grey;
}

</style>
