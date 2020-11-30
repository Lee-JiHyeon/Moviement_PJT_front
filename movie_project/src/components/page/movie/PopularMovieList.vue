<template>
  <v-sheet class="mx-auto movie-container" elevation="8" color="blue-grey darken-3">
    <v-slide-group v-model="model" class="pa-4" mandatory show-arrows>
      <v-slide-item v-for="movie in popularMovieList" :key="movie.id" v-slot="{ active, toggle }">
        <v-card
          :style="{ 'background-image': `url(https://image.tmdb.org/t/p/w154${movie.poster_path})`}"
          class="ma-6" height="230" width="153" @mouseover="toggle" @mouseout="toggle">
          <router-link :to="`movie/${movie.id}`">
          <!-- <img :src="`https://image.tmdb.org/t/p/w154${movie.poster_path}`" class="card-img-top poster" :alt="movie.title"> -->
          <v-row class="fill-height" align="center" justify="center">
            <v-fade-transition>
              <v-overlay v-if="active" absolute color="#212121">
              <p style="text-align: center; font-size: large;">{{ movie.title }}</p>
              </v-overlay>
            </v-fade-transition>
          </v-row>
          </router-link>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>

export default {
  name: 'PopularMovieList',
  props: {
    popularMovieList: Array,
  },
  data() {
    return {
      model: null,
      isMousOver: false
    }
  },
}
</script>

<style>
</style>
