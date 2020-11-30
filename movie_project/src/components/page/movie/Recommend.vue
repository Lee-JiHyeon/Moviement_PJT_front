<template>
  <div class="p-5">
    <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="!isChoice" color="teal" dark v-bind="attrs" v-on="on">
          <b>좋아하는 장르가 뭐예요?</b>
        </v-btn>
      </template>
      <v-card dark>
        <v-card-title class="mt-3">장르를 선택하세요</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group v-model="dialogm1" column dense>
            <v-checkbox
              v-model="selected"
              label="모험"
              value="12"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="판타지"
              value="14"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="애니메이션"
              value="16"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="드라마"
              value="18"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="공포"
              value="27"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="액션"
              value="28"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="코미디"
              value="35"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="역사"
              value="36"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="서부"
              value="37"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="스릴러"
              value="53"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="범죄"
              value="80"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="다큐멘터리"
              value="99"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="SF"
              value="878"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="미스터리"
              value="9648"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="음악"
              value="10402"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="로맨스"
              value="10749"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="가족"
              value="10751"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="전쟁"
              value="10752"
            ></v-checkbox>
            <v-checkbox
              v-model="selected"
              label="TV 영화"
              value="10770"
            ></v-checkbox>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="teal"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="teal"
            text
            @click="getRecommedMovieList()"
            
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    <RecommendMovieList :recommendMovieList="recommendMovieList"
                        :isChoice="isChoice" />
  </div>
</template>

<script>
import RecommendMovieList from '@/components/page/movie/RecommendMovieList'


export default {
  name: 'Recommned',
  components: {
    RecommendMovieList,
  },
  data () {
    return {
      dialogm1: '',
      dialog: false,
      selected: [],
      recommendMovieList: [],
      isChoice: false,
    }
  },
  methods: {
    getRecommedMovieList() {
      this.dialog = false
      const genreList = this.selected
      genreList.forEach(id => {
        this.axios.get(`movie/${id}/recommend`)
        .then(res => {
          // console.log(res.data)
          res.data.forEach(movie => {
            this.recommendMovieList.push(movie)
          })
          this.isChoice = true
        })
        .catch(err => {
          console.error(err)
        })
      });
      // console.log(this.recommendMovieList)
    }
  }
}
</script>

<style>

</style>
