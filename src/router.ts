import {
 createWebHistory,
 createRouter
} from "vue-router";

import Home from './views/Home.vue'
import store from './store'
import Login from './views/Login.vue'
import ServerView from './views/ServerView.vue'
import Details from './views/ServerViews/Details.vue'
import Ressources from './views/ServerViews/Ressources.vue'
import Logs from './views/ServerViews/Logs.vue'
import Advanced from './views/ServerViews/Advanced.vue'
import Export from './views/ServerViews/Export.vue'
import AddServer from './views/AddServer.vue'


const history = createWebHistory();
const routes = [
    { name: 'Home',path: '/', component: Home,
          meta: {
            requiresAuth: true
          } },
    { name: 'Login',path: '/login', component: Login,
          meta: {
            requiresAuth: false
          } },
    { name: 'Server',path: '/Server/:id', component: ServerView, children: [
        {
          name: 'Details', path: 'Details', component: Details,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Ressources', path: 'Ressources', component: Ressources,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Logs', path: 'Logs', component: Logs,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Advanced', path: 'Advanced', component: Advanced,
          meta: {
            requiresAuth: true
          }
        },
        {
          name: 'Export', path: 'Export', component: Export,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    { name: 'AddServer',path: '/AddServer', component: AddServer,
          meta: {
            requiresAuth: true
          } },
];

const router = createRouter({
  history,
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isLoggedIn) {
      next({ name: 'Login' })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})
export default router;