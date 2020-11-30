<template>
<div id="card-section">
  <v-carousel cycle v-model="model" hide-delimiters width="100vw" height="35vw">
    <!--  cycle -->
    <v-carousel-item>
      <img src="@/assets/poster/poster1.jpeg" alt="poster1" id="img">
    </v-carousel-item>
    <v-carousel-item>
      <img src="@/assets/poster/poster2.jpeg" alt="poster2" id="img">
    </v-carousel-item>
    <v-carousel-item>
      <img src="@/assets/poster/poster3.jpg" alt="poster3" id="img">
    </v-carousel-item>
    <v-carousel-item>
      <img src="@/assets/poster/poster4.jpg" alt="poster4" id="img">
    </v-carousel-item>
  </v-carousel>
</div>
</template>

<script>
export default {
  name: 'CardSection',
  data() {
    return {
      model: 0,
    }
  },
}
</script>

<style>
#card-section {
  width: 100vw;
  height: 35vw;
  text-align: center;
}
#img {
  height: 100%;
  width: auto;
  vertical-align: middle;
  box-shadow: 0px 0px 100px #000;
  background-position: -100% 10% !important;
}

element.style {
  height: auto;
}
</style>
