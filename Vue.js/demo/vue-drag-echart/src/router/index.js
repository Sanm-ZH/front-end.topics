import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import VIf from '@/components/If'
import Dragg from '@/components/Dragg'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/if',
      name:'登陆',
      component:VIf
    },
    {
      path:'/dragg',
      name:'登陆',
      component:Dragg
    }
  ]
})
