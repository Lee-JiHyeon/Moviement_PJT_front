<template>
  <div>
    <v-overlay :value="true" class="login-box">  
    <v-form v-model="valid">
      <v-container>
        <h1>로그인</h1>
        <v-row class="justify-content-center py-5">
          <v-col cols="12" sm="8" class="p-0">
            <v-text-field v-model="credentials.username" label="회원 아이디" required outlined filled></v-text-field>
          </v-col>
          <v-col cols="12" sm="8" class="px-0">
            <v-text-field v-model="credentials.password" :counter="8" label="비밀번호" type="password" required outlined filled></v-text-field>
          </v-col>
          <v-btn @click="login" depressed color="teal lighten-1" class="col-12 col-sm-8" style="height: 50px">로그인</v-btn>
        </v-row>
        <v-row>
          <v-col>
            <router-link :to="'/signup'" style="color: #00BFA5">회원이 아니신가요?</router-link>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    </v-overlay>  
      <v-dialog v-model="fail" max-width="300">
        <v-card>
          <v-card-title class="text-danger">로그인 실패!</v-card-title>
          <v-card-text class="pb-2" style="font-size: 15px">
            <b>로그인 정보가 올바르지 않습니다 :(</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="fail = false">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
      },
      valid: false,
      fail: false
    }
  },
  methods: {
    login() {
      if (this.credentials.username=='' || this.credentials.password=='') {
        this.fail = true
        return
      }
      this.axios.post('token/', this.credentials)
      .then(res => {
        const access_token = res.data.access
        this.$emit('login')
        sessionStorage.setItem('access_token', access_token)
        this.$cookies.set('username', this.credentials.username)
        this.$cookies.set('isLogined', 1 )
        this.$router.push({ name: 'Main' })
      })
      .catch(err => {
        this.fail = true
        console.error(err)
      })
    },
  }
}
</script>

<style>

</style>
