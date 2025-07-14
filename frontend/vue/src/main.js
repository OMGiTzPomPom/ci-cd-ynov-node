import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Admin from './views/Admin.vue'
import Users from "./views/Users.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/admin', component: Admin },
  { path: '/users', component: Users },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
