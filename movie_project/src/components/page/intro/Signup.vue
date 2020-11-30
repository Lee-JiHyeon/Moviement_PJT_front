<template>
  <div class="pt-15">
  <v-card class="mx-auto mt-15" style="max-width: 500px;">
    <v-system-bar color="teal" dark>
      <v-spacer></v-spacer>
      <v-icon small>
        mdi-square
      </v-icon>
      <v-icon class="ml-1" small>
        mdi-circle
      </v-icon>
      <v-icon class="ml-1" small>
        mdi-triangle
      </v-icon>
    </v-system-bar>
    <v-toolbar color="teal lighten-2" cards dark flat>
      <router-link :to="'/intro'">
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      </router-link>
      <v-card-title class="title font-weight-regular">회원가입</v-card-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-text-field v-model="credentials.username" filled outlined color="black" label="회원 아이디" type="email"></v-text-field>
      <v-text-field v-model="credentials.password" :rules="[rules.password, rules.length(8)]" filled outlined color="black" counter="8"
        label="비밀번호" style="min-height: 96px" type="password"></v-text-field>
      <v-text-field v-model="credentials.passwordConfirmation" :rules="[rules.passwordConfirmation, rules.length(8)]" filled outlined color="black" counter="8"
        label="비밀번호 확인" style="min-height: 96px" type="password"></v-text-field>

      <v-dialog v-model="fail" max-width="300">
        <v-card>
          <v-card-title class="text-danger">회원가입 실패!</v-card-title>
          <v-card-text class="pb-2" style="font-size: 15px">
            <b>이미 존재하는 아이디입니다 :(</b>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="black" text @click="fail = undefined">확인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      </v-form>
      <v-divider></v-divider>
      <v-card-actions>
        <router-link :to="'/intro'">
          <v-btn text>Cancel</v-btn>
        </router-link>
        <v-btn text @click="$refs.form.reset()">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="signup" :disabled="!form" :loading="isLoading" class="white--text" color="teal accent-4" depressed>회원가입</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data() {
    return {
      credentials: {
        username: '',
        password: '',
        passwordConfirmation: '',
      },
      agreement: true,
      dialog: true,
      form: true,
      isLoading: false,
      password: undefined,
      phone: undefined,
      rules: {
        // username: v => !!(v || '').match(/^(?=.*[a-z])(?=.*\d).+$/) || '회원 아이디는 특수문자를 포함할 수 없습니다.',
        length: len => v => (v || '').length >= len || `비밀번호는 ${len}자 이상이어야 합니다.`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*\d).+$/) ||
          '비밀번호는 영어, 숫자를 모두 포함해야합니다.',
        passwordConfirmation: v => (v === this.credentials.password) ||
        // !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          '비밀번호가 일치하지 않습니다.',
        required: v => !!v || '약관에 동의해야합니다.',
      },
      fail: undefined,
    }
  },
  methods: {
    signup() {
      this.axios.post('accounts/signup/', this.credentials)
      .then(res => {
        if (res.data.fail) {
          console.log(res.data.fail)
          this.fail = res.data.fail
          return
        }
        console.log('회원가입 성공!!')
        this.$router.push({ name: 'Login'})
      })
      .catch(err => {
        console.error(err)
      })
    }
  }
}
</script>

<style>

</style>
