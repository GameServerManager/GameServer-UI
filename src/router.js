import {
 createWebHistory,
 createRouter
} from "vue-router";

import HelloWorld from './views/HelloWorld.vue'
import ServerView from './views/ServerView.vue'
import AddServer from './views/AddServer.vue'


const history = createWebHistory();
const routes = [
    { path: '/', component: HelloWorld },
    { path: '/Server/:id', component: ServerView },
    { path: '/AddServer', component: AddServer },
];
const router = createRouter({
  history,
  routes
});
export default router;