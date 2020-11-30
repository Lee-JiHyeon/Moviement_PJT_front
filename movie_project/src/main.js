import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies'
import axios from 'axios'
import VueYoutube from 'vue-youtube'
import VueMoment from 'vue-moment'

Vue.use(VueMoment);

Vue.use(VueYoutube)

axios.defaults.baseURL = 'http://localhost:8000/api/v1/'
Vue.prototype.axios = axios
axios.interceptors.request.use(config => {
  const access_token = sessionStorage.getItem('access_token')
  config.headers.common['Authorization'] = access_token ? `Bearer ${access_token}` : ''
  
  return config
})

Vue.use(VueCookies)
Vue.$cookies.config('1h')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
