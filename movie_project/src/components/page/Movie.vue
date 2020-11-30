<template>
  <div id="movie">
    <CardSection />
    <v-card color="teal">
      <v-tabs v-model="tab" background-color="blue-grey darken-3" color="teal accent-1" grow>
        <v-tab v-for="item in items" :key="item" style="font-size: 20px">
          <b>{{ item }}</b>
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card color="grey darken-4" flat>
          <Popular />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="grey darken-4" flat>
          <Recent />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card color="grey darken-4" flat>
          <Recommend />
          </v-card>
        </v-tab-item>

      </v-tabs-items>
    </v-card>
    
  </div>
</template>

<script>
import CardSection from './movie/CardSection'
import Popular from './movie/Popular'
import Recent from './movie/Recent'
import Recommend from './movie/Recommend'


export default {
  name: 'Movie',
  components: {
    CardSection,
    Popular,
    Recent,
    Recommend
  },
  data () {
    return {
      tab: null,
      items: [
        'Popular Movies', 'Recent Movies', 'Recommendations'
      ],
    }
  },  
}
</script>

<style>
h2 {
  text-align: center;
  margin-top: 20px;
}
.movie-container {
  background-color: black;
  width: 80%;
}
#tab {
  height: 100px;
}
</style>
