import Vue from 'vue'
import VueRouter from 'vue-router';
import loginScreen from "../components/loginScreen";
import homeScreen from "../components/homeScreen";
import lobby from "../components/lobby";
import profile from "../components/profile";
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: 'Login',
    component: loginScreen
  },
  {
    path: "/home",
    name: "Home",
    component: homeScreen
  },
  {
    path: '/lobby/:lobbyId',
    name: 'lobby',
    props: true,
    component: lobby
  },
  {
    path: "/profile/:userId",
    name: "profile",
    props: true,
    component: profile
  }
]

const router = new VueRouter({
  routes
})

export default router
