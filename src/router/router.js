import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { useAuthStore } from '../stores/authStore'


function guardMyroute (to, from, next) {
  // var isLoggedIn = false
  // if (useAuthStore.isLoggedIn) { isLoggedIn = true } else { isLoggedIn = false }
  // if (isLoggedIn) {
  //     next() // allow to enter route
  //     if(!useAuthStore.user.verified) {
  //        next({ name: 'home' }) // go to '/verify';
  //     }
  // } else  {
  //     next({ name: 'Login' }) // go to '/login';
  //  }
  let user = JSON.parse(window.localStorage.user);
  if (user) {
    next();
  }else{
    next("/");
  }
}


const routes = [
  {
    path: '/',
    beforeEnter: guardMyroute,
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  // {
  //   path: '*',
  //   redirect: '/login'
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router