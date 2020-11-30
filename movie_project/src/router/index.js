import Vue from 'vue'
import VueRouter from 'vue-router'

import Intro from '@/components/layout/Intro'
import Start from '@/components/page/intro/Start'
import Signup from '@/components/page/intro/Signup'
import Login from '@/components/page/intro/Login'

import Main from '@/components/layout/Main'
// import MainNavbar from '@/components/layout/MainNavbar'
// import MainFooter from '@/components/layout/MainFooter'

import Movie from '@/components/page/Movie'
import MovieDetail from '@/components/page/MovieDetail'
// import MovieDetailInfo from '@/components/page/movie/MovieDetailInfo'

import Community from '@/components/page/Community'
import ReviewList from '@/components/page/community/ReviewList'
import ReviewDetail from '@/components/page/community/ReviewDetail'
// import ReviewCreate from '@/components/page/community/list/ReviewCreate'

import AboutUs from '@/components/page/AboutUs.vue'

import MyPage from '@/components/page/MyPage'
import Profile from '@/components/page/Profile'

Vue.use(VueRouter)

const routes = [
  {
    path: '/intro',
    name: 'Intro',
    component: Intro,
    redirect: '/intro',
    children: [
      {
        path: '/start',
        name: 'Start',
        component: Start,
      },
      {
        path: '/signup',
        name: 'Signup',
        component: Signup,
      },
      {
        path: '',
        name: 'Login',
        component: Login,
      },
    ]
  },
  {
    path: '/',
    name: 'Main',
    components: {
      default: Main,
      // header: MainNavbar,
      // footer: MainFooter,
    },
    redirect: '/movie',
    children: [
      {
        path: '/movie',
        name: 'Movie',
        component: Movie,
        childeren: [
        ]
      },
      {
        path: '/movie/:no',
        name: 'MovieDetail',
        component: MovieDetail,
      },
      {
        path: '/community',
        name: 'Community',
        component: Community,
        redirect: '/community',
        children: [
          {
            path: '',
            name: 'ReviewList',
            component: ReviewList,
          },
          {
            path: ':no',
            name: 'ReviewDetail',
            component: ReviewDetail,
          },
        ]
      },
      {
        path: '/aboutus',
        name: 'AboutUs',
        component: AboutUs,
      },
      {
        path: '/mypage',
        name: 'MyPage',
        component: MyPage,
      },
      {
        path: '/profile/:no',
        name: 'Profile',
        component: Profile,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      // Keep scroll position when using browser buttons
      return savedPosition
    }
    else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
