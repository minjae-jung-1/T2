import Vue from 'vue'
import VueRouter from 'vue-router'
import loginScreen from "../components/loginScreen"
import homeScreen from "../components/homeScreen"

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
  }
]

const router = new VueRouter({
  routes
})

export default router
